import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Box, Image as ImageIcon } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import { useCrudTable } from "@/hooks/use-crud-table";
import { toast } from "@/utils/toast";
import { formatCurrency } from "@/utils/formatters";
import { productsApi } from "@/api/products.api";
import { ProductDto } from "@/types/products.types";

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

import { ProductFormDialog } from "./components/ProductFormDialog";
import { ProductDetailsDialog } from "./components/ProductDetailsDialog";

export default function ProductsListPage() {
  const { hasPermission } = usePermissions();
  const canView = hasPermission("Permissions.Products.View");
  const canCreate = hasPermission("Permissions.Products.Create");
  const canUpdate = hasPermission("Permissions.Products.Update");
  const canDelete = hasPermission("Permissions.Products.Delete");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | undefined>();
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
  } = useCrudTable<ProductDto>({
    fetchData: productsApi.getAll
  });

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleCreateOrUpdate = async (formData: any) => {
    setIsSubmitting(true);
    
    const operation = selectedProduct
      ? productsApi.update(selectedProduct.id, formData)
      : productsApi.create(formData);

    toast.promise(operation, {
      loading: selectedProduct ? "Updating product..." : "Creating product...",
      success: () => {
        setIsFormOpen(false);
        refresh();
        return selectedProduct ? "Product updated successfully." : "Product created successfully.";
      },
      error: "Failed to save product.",
    });

    operation.finally(() => setIsSubmitting(false));
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    setIsSubmitting(true);

    const operation = productsApi.delete(selectedProduct.id);

    toast.promise(operation, {
      loading: "Deleting product...",
      success: () => {
        setIsDeleteOpen(false);
        refresh();
        return "Product deleted successfully.";
      },
      error: "Failed to delete product.",
    });

    operation.finally(() => setIsSubmitting(false));
  };

  const openForm = (product?: ProductDto) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const openDetails = (product: ProductDto) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const openDelete = (product: ProductDto) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  if (!canView) {
    return <ErrorView title="Access Denied" message="You don't have permission to view products." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage master products, variants, and pricing.</p>
        </div>
        
        {canCreate && (
          <Button 
            onClick={() => openForm()} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <form onSubmit={onSearchSubmit} className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, code, SKU, or barcode..."
              className="pl-9 bg-white border-slate-200 focus-visible:ring-indigo-500/20"
            />
          </form>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                <TableHead className="w-[80px]">Image</TableHead>
                <SortableHeader label="Product Name" column="Name" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <SortableHeader label="Code / SKU" column="ProductCode" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <SortableHeader label="Brand" column="Brand" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <SortableHeader label="Category" column="Category" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <SortableHeader label="Selling Price" column="SellingPrice" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} className="text-right" />
                <SortableHeader label="Status" column="Status" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-64">
                    <LoadingView />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-64">
                    <ErrorView message={error} onRetry={refresh} />
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-64">
                    <EmptyView 
                      icon={Box}
                      title="No products found" 
                      description={search ? "Try adjusting your search query." : "Add your first product to get started."}
                      action={canCreate ? { label: "Add Product", onClick: () => openForm() } : undefined}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((product) => (
                  <TableRow key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      {product.imageUrl ? (
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700">{product.productCode}</span>
                        <span className="text-xs text-slate-500">{product.sku}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{product.brand?.name || "-"}</TableCell>
                    <TableCell className="text-slate-600">{product.category?.name || "-"}</TableCell>
                    <TableCell className="text-slate-900 font-medium text-right">{formatCurrency(product.sellingPrice)}</TableCell>
                    <TableCell>
                      {product.isActive ? (
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
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600" onClick={() => openDetails(product)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {canUpdate && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => openForm(product)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-600" onClick={() => openDelete(product)}>
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

      <ProductFormDialog 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={selectedProduct}
        onSubmit={handleCreateOrUpdate}
        isSubmitting={isSubmitting}
      />

      {selectedProduct && (
        <ProductDetailsDialog
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          product={selectedProduct}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        isDestructive
        isLoading={isSubmitting}
      />
    </div>
  );
}
