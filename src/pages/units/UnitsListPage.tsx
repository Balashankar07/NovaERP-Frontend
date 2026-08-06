import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, LayoutGrid } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import { useCrudTable } from "@/hooks/use-crud-table";
import { toast } from "@/utils/toast";
import { unitsApi } from "@/api/units.api";
import { UnitDto, CreateUnitDto, UpdateUnitDto } from "@/types/units.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingView, ErrorView, EmptyView } from "@/components/ui/state-views";
import { Pagination } from "@/components/ui/pagination";
import { SortableHeader } from "@/components/ui/sortable-header";

import { UnitFormDialog } from "./components/UnitFormDialog";
import { UnitDetailsDialog } from "./components/UnitDetailsDialog";

export function UnitsListPage() {
  const { hasPermission } = usePermissions();
  const canCreate = hasPermission("Permissions.Units.Create");
  const canUpdate = hasPermission("Permissions.Units.Update");
  const canDelete = hasPermission("Permissions.Units.Delete");

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
  } = useCrudTable<UnitDto>({
    fetchFn: unitsApi.getAll,
    defaultSortBy: "Name"
  });

  // Dialogs State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedUnit, setSelectedUnit] = useState<UnitDto | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateOrUpdate = async (formData: CreateUnitDto | UpdateUnitDto) => {
    setIsSubmitting(true);
    
    const operation = selectedUnit
      ? unitsApi.update(selectedUnit.id, formData as UpdateUnitDto)
      : unitsApi.create(formData as CreateUnitDto);

    toast.promise(operation, {
      loading: selectedUnit ? "Updating unit..." : "Creating unit...",
      success: () => {
        setIsFormOpen(false);
        refresh();
        return selectedUnit ? "Unit updated successfully." : "Unit created successfully.";
      },
      error: "Failed to save unit.",
    });

    operation.finally(() => setIsSubmitting(false));
  };

  const handleDelete = async () => {
    if (!selectedUnit) return;
    setIsSubmitting(true);

    const operation = unitsApi.delete(selectedUnit.id);

    toast.promise(operation, {
      loading: "Deleting unit...",
      success: () => {
        setIsDeleteOpen(false);
        refresh();
        return "Unit deleted successfully.";
      },
      error: "Failed to delete unit.",
    });

    operation.finally(() => setIsSubmitting(false));
  };

  const openForm = (unit?: UnitDto) => {
    setSelectedUnit(unit || null);
    setIsFormOpen(true);
  };

  const openDetails = (unit: UnitDto) => {
    setSelectedUnit(unit);
    setIsDetailsOpen(true);
  };

  const openDelete = (unit: UnitDto) => {
    setSelectedUnit(unit);
    setIsDeleteOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Units of Measurement</h1>
          <p className="text-sm text-slate-500 mt-1">Manage standard units used for product quantities and dimensions.</p>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search units..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 h-10 w-full bg-white shadow-sm border-slate-200"
            />
          </form>
          {canCreate && (
            <Button onClick={() => openForm()} className="h-10 bg-indigo-600 hover:bg-indigo-700 shadow-sm shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Unit
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        {viewState === "loading" && <LoadingView title="Loading Units..." />}
        {viewState === "error" && <ErrorView title="Failed to load units" />}
        {viewState === "empty" && (
          <EmptyView 
            title="No units found" 
            description="Get started by adding your first unit of measurement."
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
                      label="Unit Name"
                      currentSortBy={queryParams.sortBy}
                      currentSortOrder={queryParams.sortOrder}
                      onSort={toggleSort}
                    />
                    <SortableHeader
                      field="Abbreviation"
                      label="Abbreviation"
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
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No units match your search query.
                      </td>
                    </tr>
                  ) : (
                    data.items.map((unit) => (
                      <tr key={unit.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{unit.name}</td>
                        <td className="px-6 py-4 font-mono text-slate-600 bg-slate-50/50 rounded-md inline-block mt-2 ml-4 mb-2 mr-2 px-2 py-0.5 border border-slate-100">{unit.abbreviation}</td>
                        <td className="px-6 py-4 text-slate-500 max-w-[300px] truncate">
                          {unit.description || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            unit.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                          }`}>
                            {unit.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                            onClick={() => openDetails(unit)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {canUpdate && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                              onClick={() => openForm(unit)}
                              title="Edit Unit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          {canDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                              onClick={() => openDelete(unit)}
                              title="Delete Unit"
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

      <UnitFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateOrUpdate}
        unit={selectedUnit}
        isLoading={isSubmitting}
      />

      <UnitDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        unit={selectedUnit}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Unit"
        description={`Are you sure you want to delete "${selectedUnit?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        isDestructive
        isLoading={isSubmitting}
      />
    </div>
  );
}
