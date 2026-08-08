import { useState, useMemo } from "react";
import { Plus, Edit2, Trash2, Eye, Building2, Phone, Mail, RefreshCw } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import { useCrudTable } from "@/hooks/use-crud-table";
import { toast } from "@/utils/toast";
import { suppliersApi } from "@/api/suppliers.api";
import { SupplierDto } from "@/types/suppliers.types";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { SortableHeader } from "@/components/ui/sortable-header";
import { LoadingView, ErrorView } from "@/components/ui/state-views";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { PermissionButton } from "@/components/common/permission-button";

import { SupplierFormDialog } from "./components/SupplierFormDialog";
import { SupplierDetailsDialog } from "./components/SupplierDetailsDialog";

export default function SuppliersListPage() {
  const { hasPermission } = usePermissions();
  const canView = hasPermission("Permissions.Suppliers.View");
  const canCreate = hasPermission("Permissions.Suppliers.Create");
  const canUpdate = hasPermission("Permissions.Suppliers.Update");
  const canDelete = hasPermission("Permissions.Suppliers.Delete");

  const [selectedSupplier, setSelectedSupplier] = useState<SupplierDto | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

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
  } = useCrudTable<SupplierDto>({
    fetchFn: suppliersApi.getAll,
    defaultSortBy: "Name",
    defaultSortOrder: "asc"
  });

  const handleCreateOrUpdate = async (formData: any) => {
    if (selectedSupplier) {
      await suppliersApi.update(selectedSupplier.id, formData);
      toast.success(`Supplier "${formData.supplierName}" updated successfully.`);
    } else {
      await suppliersApi.create(formData);
      toast.success(`Supplier "${formData.supplierName}" created successfully.`);
    }
    setIsFormOpen(false);
    refresh();
  };

  const handleDelete = async () => {
    if (!selectedSupplier) return;
    setIsDeleting(true);

    try {
      await suppliersApi.delete(selectedSupplier.id);
      toast.success("Supplier deleted successfully.");
      setIsDeleteOpen(false);
      refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete supplier.");
    } finally {
      setIsDeleting(false);
    }
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

  const handleSelectAll = (checked: boolean) => {
    if (checked && data) {
      setSelectedRowIds(new Set(data.items.map(i => i.id)));
    } else {
      setSelectedRowIds(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSet = new Set(selectedRowIds);
    if (checked) newSet.add(id);
    else newSet.delete(id);
    setSelectedRowIds(newSet);
  };

  const hasSelections = selectedRowIds.size > 0;

  const renderedRows = useMemo(() => {
    if (viewState === "loading") {
      return (
        <TableRow>
          <TableCell colSpan={8} className="h-64">
            <LoadingView title="Loading Suppliers..." />
          </TableCell>
        </TableRow>
      );
    }
    
    if (viewState === "error") {
      return (
        <TableRow>
          <TableCell colSpan={8} className="h-64">
            <ErrorView title="Failed to load suppliers" onRetry={refresh} />
          </TableCell>
        </TableRow>
      );
    }

    if (viewState === "empty" || (viewState === "success" && data?.items.length === 0)) {
      return (
        <TableRow>
          <TableCell colSpan={8} className="h-64">
            <EmptyState 
              title="No suppliers found" 
              description={queryParams.search ? "Try adjusting your search query." : "Get started by adding your first supplier."}
              icon={<Building2 className="w-8 h-8 text-slate-400" />}
              action={canCreate ? { label: "Add Supplier", onClick: () => openForm() } : undefined}
            />
          </TableCell>
        </TableRow>
      );
    }

    if (viewState === "success" && data) {
      return data.items.map((supplier) => (
        <TableRow 
          key={supplier.id} 
          className={`group transition-colors ${selectedRowIds.has(supplier.id) ? 'bg-indigo-50/40 hover:bg-indigo-50/60' : 'hover:bg-slate-50/50'}`}
        >
          <TableCell className="pl-4">
            <Checkbox 
              checked={selectedRowIds.has(supplier.id)}
              onCheckedChange={(checked) => handleSelectRow(supplier.id, checked === true)}
              aria-label={`Select ${supplier.supplierName}`}
            />
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-medium text-slate-900 truncate" title={supplier.supplierName}>{supplier.supplierName}</span>
                <span className="text-xs text-slate-500 truncate" title={supplier.supplierCode}>{supplier.supplierCode}</span>
              </div>
            </div>
          </TableCell>
          <TableCell className="text-slate-700 truncate" title={supplier.contactPerson || ""}>
            {supplier.contactPerson || "—"}
          </TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              {supplier.email ? (
                <a href={`mailto:${supplier.email}`} className="text-sm text-indigo-600 hover:underline flex items-center gap-1.5 truncate" title={supplier.email}>
                  <Mail className="h-3 w-3 shrink-0" />
                  <span className="truncate">{supplier.email}</span>
                </a>
              ) : (
                <span className="text-sm text-slate-400 flex items-center gap-1.5"><Mail className="h-3 w-3 shrink-0" />—</span>
              )}
              {supplier.phone ? (
                <a href={`tel:${supplier.phone}`} className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1.5 truncate" title={supplier.phone}>
                  <Phone className="h-3 w-3 shrink-0" />
                  <span className="truncate">{supplier.phone}</span>
                </a>
              ) : (
                <span className="text-sm text-slate-400 flex items-center gap-1.5"><Phone className="h-3 w-3 shrink-0" />—</span>
              )}
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <span className="text-sm text-slate-700 truncate" title={supplier.taxRegistrationNumber || ""}>{supplier.taxRegistrationNumber || "—"}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <span className="text-sm text-slate-700 truncate" title={supplier.city || ""}>{supplier.city || "—"}</span>
              <span className="text-xs text-slate-500 truncate" title={supplier.country || ""}>{supplier.country || "—"}</span>
            </div>
          </TableCell>
          <TableCell>
            <StatusBadge isActive={supplier.isActive} />
          </TableCell>
          <TableCell className="text-right pr-6">
            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-indigo-600"
                onClick={() => openDetails(supplier)}
                title="View Details"
                aria-label={`View Details for ${supplier.supplierName}`}
              >
                <Eye className="h-4 w-4" />
              </Button>
              {canUpdate && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-blue-600"
                  onClick={() => openForm(supplier)}
                  title="Edit Supplier"
                  aria-label={`Edit ${supplier.supplierName}`}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
              {canDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-rose-600"
                  onClick={() => openDelete(supplier)}
                  title="Delete Supplier"
                  aria-label={`Delete ${supplier.supplierName}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </TableCell>
        </TableRow>
      ));
    }
    return null;
  }, [viewState, data, queryParams.search, selectedRowIds, canCreate, canUpdate, canDelete, handleSelectRow]);

  if (!canView) {
    return <ErrorView title="Access Denied" description="You don't have permission to view suppliers." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Suppliers Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage vendor information, contacts, and business profiles.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9" onClick={refresh} title="Refresh Data">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <PermissionButton 
            permission="Permissions.Suppliers.Create"
            onClick={() => openForm()} 
            aria-label="Add Supplier"
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm h-9 shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </PermissionButton>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col relative">
        <DataTableToolbar 
          searchQuery={searchInput}
          onSearchChange={setSearchInput}
          onSearchSubmit={handleSearch}
          searchPlaceholder="Search by Code, Name, Company, Contact, Email..."
          hasSelections={hasSelections}
          selectedCount={selectedRowIds.size}
          onDeleteSelected={() => setIsDeleteOpen(true)}
          onCancelSelection={() => setSelectedRowIds(new Set())}
          itemTypeName="suppliers"
          deletePermission="Permissions.Suppliers.Delete"
        />

        <div className="overflow-x-auto">
          <Table className="min-w-[1100px] w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                <TableHead className="w-[50px] pl-4">
                  <Checkbox 
                    checked={!!(data && data.items.length > 0 && selectedRowIds.size === data.items.length)}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <SortableHeader label="Supplier" field="SupplierName" currentSortBy={queryParams.sortBy} currentSortOrder={queryParams.sortOrder} onSort={toggleSort} className="w-[250px]" />
                <SortableHeader label="Contact Person" field="ContactPerson" currentSortBy={queryParams.sortBy} currentSortOrder={queryParams.sortOrder} onSort={toggleSort} className="w-[180px]" />
                <TableHead className="w-[200px]">Contact Info</TableHead>
                <TableHead className="w-[150px]">Tax / GST</TableHead>
                <SortableHeader label="Location" field="City" currentSortBy={queryParams.sortBy} currentSortOrder={queryParams.sortOrder} onSort={toggleSort} className="w-[150px]" />
                <SortableHeader label="Status" field="IsActive" currentSortBy={queryParams.sortBy} currentSortOrder={queryParams.sortOrder} onSort={toggleSort} className="w-[120px]" />
                <TableHead className="text-right pr-6 w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderedRows}
            </TableBody>
          </Table>
        </div>
        
        {data && data.totalPages > 1 && (
          <div className="p-4 border-t border-slate-100">
            <Pagination
              data={data}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      <SupplierFormDialog 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        supplier={selectedSupplier}
        onSubmit={handleCreateOrUpdate}
      />

      {selectedSupplier && (
        <SupplierDetailsDialog
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          supplier={selectedSupplier!}
        />
      )}

      <ConfirmDeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName="Supplier"
        isLoading={isDeleting}
      />
    </div>
  );
}
