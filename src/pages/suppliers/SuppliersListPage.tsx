import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Building2, Phone, Mail, Globe, MapPin } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import { useCrudTable } from "@/hooks/use-crud-table";
import { toast } from "@/utils/toast";
import { suppliersApi } from "@/api/suppliers.api";
import { SupplierDto } from "@/types/suppliers.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { SortableHeader } from "@/components/ui/sortable-header";
import { LoadingView, EmptyView, ErrorView } from "@/components/ui/state-views";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

import { SupplierFormDialog } from "./components/SupplierFormDialog";
import { SupplierDetailsDialog } from "./components/SupplierDetailsDialog";

export default function SuppliersListPage() {
  const { hasPermission } = usePermissions();
  const canView = hasPermission("Permissions.Suppliers.View");
  const canCreate = hasPermission("Permissions.Suppliers.Create");
  const canUpdate = hasPermission("Permissions.Suppliers.Update");
  const canDelete = hasPermission("Permissions.Suppliers.Delete");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierDto | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data,
    loading,
    error,
    pageNumber,
    pageSize,
    search,
    sortBy,
    sortOrder,
    totalRecords,
    totalPages,
    handleSort,
    handleSearch,
    setPageNumber,
    refresh
  } = useCrudTable<SupplierDto>({
    fetchData: suppliersApi.getAll
  });

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleCreateOrUpdate = async (formData: any) => {
    setIsSubmitting(true);
    
    const operation = selectedSupplier
      ? suppliersApi.update(selectedSupplier.id, formData)
      : suppliersApi.create(formData);

    toast.promise(operation, {
      loading: selectedSupplier ? "Updating supplier..." : "Creating supplier...",
      success: () => {
        setIsFormOpen(false);
        refresh();
        return selectedSupplier ? "Supplier updated successfully." : "Supplier created successfully.";
      },
      error: "Failed to save supplier.",
    });

    operation.finally(() => setIsSubmitting(false));
  };

  const handleDelete = async () => {
    if (!selectedSupplier) return;
    setIsSubmitting(true);

    const operation = suppliersApi.delete(selectedSupplier.id);

    toast.promise(operation, {
      loading: "Deleting supplier...",
      success: () => {
        setIsDeleteOpen(false);
        refresh();
        return "Supplier deleted successfully.";
      },
      error: (err: any) => {
        setIsDeleteOpen(false);
        return err?.response?.data?.message || err?.message || "Failed to delete supplier. It may be referenced in other records.";
      }
    });

    operation.finally(() => setIsSubmitting(false));
  };

  const openForm = (supplier?: SupplierDto) => {
    setSelectedSupplier(supplier);
    setIsFormOpen(true);
  };

  const openDetails = (supplier: SupplierDto) => {
    setSelectedSupplier(supplier);
    setIsDetailsOpen(true);
  };

  const openDelete = (supplier: SupplierDto) => {
    setSelectedSupplier(supplier);
    setIsDeleteOpen(true);
  };

  if (!canView) {
    return <ErrorView title="Access Denied" message="You don't have permission to view suppliers." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Suppliers Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage vendor information, contacts, and business profiles.</p>
        </div>
        
        {canCreate && (
          <Button 
            onClick={() => openForm()} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <form onSubmit={onSearchSubmit} className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Code, Name, Company, Contact, Email, Phone, City, Country..."
              className="pl-9 bg-white border-slate-200 focus-visible:ring-indigo-500/20"
            />
          </form>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                <SortableHeader label="Supplier" column="SupplierName" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <SortableHeader label="Contact Person" column="ContactPerson" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <TableHead>Contact Info</TableHead>
                <TableHead>Tax / GST</TableHead>
                <SortableHeader label="Location" column="City" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <SortableHeader label="Status" column="Status" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64">
                    <LoadingView />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64">
                    <ErrorView message={error} onRetry={refresh} />
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64">
                    <EmptyView 
                      icon={Building2}
                      title="No suppliers found" 
                      description={search ? "Try adjusting your search query." : "Add your first supplier to get started."}
                      action={canCreate ? { label: "Add Supplier", onClick: () => openForm() } : undefined}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((supplier) => (
                  <TableRow key={supplier.id} className="group hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{supplier.supplierName}</span>
                          <span className="text-xs text-slate-500">{supplier.supplierCode}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {supplier.contactPerson || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {supplier.email ? (
                          <a href={`mailto:${supplier.email}`} className="text-sm text-indigo-600 hover:underline flex items-center gap-1.5">
                            <Mail className="h-3 w-3" />
                            {supplier.email}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400 flex items-center gap-1.5"><Mail className="h-3 w-3" />—</span>
                        )}
                        {supplier.phone ? (
                          <a href={`tel:${supplier.phone}`} className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1.5">
                            <Phone className="h-3 w-3" />
                            {supplier.phone}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400 flex items-center gap-1.5"><Phone className="h-3 w-3" />—</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-700">{supplier.taxRegistrationNumber || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-900">{supplier.city || "-"}</span>
                        <span className="text-xs text-slate-500">{supplier.country || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {supplier.isActive ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex w-fit items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 flex w-fit items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600" onClick={() => openDetails(supplier)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {canUpdate && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => openForm(supplier)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-600" onClick={() => openDelete(supplier)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100">
            <Pagination
              currentPage={pageNumber}
              totalPages={totalPages}
              onPageChange={setPageNumber}
            />
          </div>
        )}
      </div>

      <SupplierFormDialog 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        supplier={selectedSupplier}
        onSubmit={handleCreateOrUpdate}
        isSubmitting={isSubmitting}
      />

      {selectedSupplier && (
        <SupplierDetailsDialog
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          supplier={selectedSupplier}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Supplier"
        description={`Are you sure you want to delete "${selectedSupplier?.supplierName}"? This action cannot be undone.`}
        confirmText="Delete Supplier"
        isDestructive
        isLoading={isSubmitting}
      />
    </div>
  );
}
