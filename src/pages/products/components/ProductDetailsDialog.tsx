import { ProductDto } from "@/types/products.types";
import { Modal } from "@/components/ui/modal";
import { formatCurrency } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface ProductDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDto;
}

export function ProductDetailsDialog({ isOpen, onClose, product }: ProductDetailsDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Product Details"
      description="Detailed information about the selected product."
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400">
            <ImageWithFallback src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">{product.productCode} • {product.sku}</p>
              </div>
              {product.isActive ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Inactive
                </Badge>
              )}
            </div>
            {product.barcode && (
              <p className="text-sm text-slate-600 mt-2">
                <span className="font-medium">Barcode:</span> {product.barcode}
              </p>
            )}
            {product.description && (
              <p className="text-sm text-slate-700 mt-2 border-t pt-2">{product.description}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Brand</h4>
            <p className="text-sm text-slate-900 font-medium">{product.brand?.name || "-"}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Category</h4>
            <p className="text-sm text-slate-900 font-medium">{product.category?.name || "-"}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Unit</h4>
            <p className="text-sm text-slate-900 font-medium">{product.unit?.name || "-"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Pricing</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Cost Price</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(product.costPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Selling Price</span>
                <span className="text-sm font-semibold text-indigo-600">{formatCurrency(product.sellingPrice)}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Inventory Levels</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Minimum Stock</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{product.minimumStock}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Reorder Level</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{product.reorderLevel}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Maximum Stock</span>
                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">{product.maximumStock}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
