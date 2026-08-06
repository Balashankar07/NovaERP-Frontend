import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, LayoutGrid } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import { useCrudTable } from "@/hooks/use-crud-table";
import { toast } from "@/utils/toast";
import { brandsApi } from "@/api/brands.api";
import { BrandDto, CreateBrandDto, UpdateBrandDto } from "@/types/brands.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingView, ErrorView, EmptyView } from "@/components/ui/state-views";
import { Pagination } from "@/components/ui/pagination";
import { SortableHeader } from "@/components/ui/sortable-header";

import { BrandFormDialog } from "./components/BrandFormDialog";
import { BrandDetailsDialog } from "./components/BrandDetailsDialog";

export function BrandsListPage() {
  const { hasPermission } = usePermissions();
  const canCreate = hasPermission("Permissions.Brands.Create");
  const canUpdate = hasPermission("Permissions.Brands.Update");
  const canDelete = hasPermission("Permissions.Brands.Delete");

  const {
    viewState,
    data,
    queryParams,
    searchInput,
    setSearchInput,
    handleSearch,
    toggleSort,
    setPage,
    refresh
  } = useCrudTable<BrandDto>({
    fetchFn: brandsApi.getAll,
    defaultSortBy: "Name"
  });

  // Dialogs State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedBrand, setSelectedBrand] = useState<BrandDto | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateOrUpdate = async (formData: CreateBrandDto | UpdateBrandDto) => {
    setIsSubmitting(true);
    
    const operation = selectedBrand
      ? brandsApi.update(selectedBrand.id, formData as UpdateBrandDto)
      : brandsApi.create(formData as CreateBrandDto);

    toast.promise(operation, {
      loading: selectedBrand ? "Updating brand..." : "Creating brand...",
      success: () => {
        setIsFormOpen(false);
        refresh();
        return selectedBrand ? "Brand updated successfully." : "Brand created successfully.";
      },
      error: "Failed to save brand.",
    });

    operation.finally(() => setIsSubmitting(false));
  };

  const handleDelete = async () => {
    if (!selectedBrand) return;
    setIsSubmitting(true);

    const operation = brandsApi.delete(selectedBrand.id);

    toast.promise(operation, {
      loading: "Deleting brand...",
      success: () => {
        setIsDeleteOpen(false);
        refresh();
        return "Brand deleted successfully.";
      },
      error: "Failed to delete brand.",
    });

    operation.finally(() => setIsSubmitting(false));
  };

  const openForm = (brand?: BrandDto) => {
    setSelectedBrand(brand || null);
    setIsFormOpen(true);
  };

  const openDetails = (brand: BrandDto) => {
    setSelectedBrand(brand);
    setIsDetailsOpen(true);
  };

  const openDelete = (brand: BrandDto) => {
    setSelectedBrand(brand);
    setIsDeleteOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Brands Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage product brands and their configurations.</p>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search brands..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 h-10 w-full bg-white shadow-sm border-slate-200"
            />
          </form>
          {canCreate && (
            <Button onClick={() => openForm()} className="h-10 bg-indigo-600 hover:bg-indigo-700 shadow-sm shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Brand
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        {viewState === "loading" && <LoadingView title="Loading Brands..." />}
        {viewState === "error" && <ErrorView title="Failed to load brands" />}
        {viewState === "empty" && (
          <EmptyView 
            title="No brands found" 
            description="Get started by adding your first brand."
            icon={<LayoutGrid className="w-6 h-6 text-slate-400" />}
          />
        )}

        {viewState === "success" && data && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <tr>
                    <SortableHeader
                      field="Name"
                      label="Brand Name"
                      currentSortBy={queryParams.sortBy}
                      currentSortOrder={queryParams.sortOrder}
                      onSort={toggleSort}
                    />
                    <th className="px-6 py-4">Description</th>
                    <SortableHeader
                      field="IsActive"
                      label="Status"
                      currentSortBy={queryParams.sortBy}
                      currentSortOrder={queryParams.sortOrder}
                      onSort={toggleSort}
                    />
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        No brands match your search query.
                      </td>
                    </tr>
                  ) : (
                    data.items.map((brand) => (
                      <tr key={brand.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{brand.name}</td>
                        <td className="px-6 py-4 text-slate-500 max-w-[300px] truncate">
                          {brand.description || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            brand.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                          }`}>
                            {brand.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                            onClick={() => openDetails(brand)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {canUpdate && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                              onClick={() => openForm(brand)}
                              title="Edit Brand"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          {canDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                              onClick={() => openDelete(brand)}
                              title="Delete Brand"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination 
              data={data} 
              onPageChange={setPage} 
            />
          </>
        )}
      </div>

      {/* Reusable Dialogs */}
      <BrandFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateOrUpdate}
        brand={selectedBrand}
        isLoading={isSubmitting}
      />

      <BrandDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        brand={selectedBrand}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Brand"
        description={`Are you sure you want to delete "${selectedBrand?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        isDestructive
        isLoading={isSubmitting}
      />
    </div>
  );
}
