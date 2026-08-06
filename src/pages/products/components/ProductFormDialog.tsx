import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { ProductDto, CreateProductDto, UpdateProductDto } from "@/types/products.types";
import { BrandDto } from "@/types/brands.types";
import { CategoryDto } from "@/types/categories.types";
import { UnitDto } from "@/types/units.types";

import { brandsApi } from "@/api/brands.api";
import { categoriesApi } from "@/api/categories.api";
import { unitsApi } from "@/api/units.api";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const productSchema = z.object({
  productCode: z.string().min(1, "Product Code is required"),
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
  unitId: z.string().min(1, "Unit is required"),
  costPrice: z.coerce.number().min(0, "Cost Price must be positive"),
  sellingPrice: z.coerce.number().min(0, "Selling Price must be positive"),
  minimumStock: z.coerce.number().min(0, "Must be positive"),
  maximumStock: z.coerce.number().min(0, "Must be positive"),
  reorderLevel: z.coerce.number().min(0, "Must be positive"),
  barcode: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductDto;
  onSubmit: (data: CreateProductDto | UpdateProductDto) => Promise<void>;
  isSubmitting: boolean;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  product,
  onSubmit,
  isSubmitting,
}: ProductFormDialogProps) {
  const isEditing = !!product;
  
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [units, setUnits] = useState<UnitDto[]>([]);
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productCode: "",
      sku: "",
      name: "",
      description: "",
      categoryId: "",
      brandId: "",
      unitId: "",
      costPrice: 0,
      sellingPrice: 0,
      minimumStock: 0,
      maximumStock: 0,
      reorderLevel: 0,
      barcode: "",
      imageUrl: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (product) {
        form.reset({
          productCode: product.productCode,
          sku: product.sku,
          name: product.name,
          description: product.description || "",
          categoryId: product.categoryId,
          brandId: product.brandId,
          unitId: product.unitId,
          costPrice: product.costPrice,
          sellingPrice: product.sellingPrice,
          minimumStock: product.minimumStock,
          maximumStock: product.maximumStock,
          reorderLevel: product.reorderLevel,
          barcode: product.barcode || "",
          imageUrl: product.imageUrl || "",
          isActive: product.isActive,
        });
      } else {
        form.reset({
          productCode: "",
          sku: "",
          name: "",
          description: "",
          categoryId: "",
          brandId: "",
          unitId: "",
          costPrice: 0,
          sellingPrice: 0,
          minimumStock: 0,
          maximumStock: 0,
          reorderLevel: 0,
          barcode: "",
          imageUrl: "",
          isActive: true,
        });
      }
      
      fetchDropdowns();
    }
  }, [isOpen, product, form]);

  const fetchDropdowns = async () => {
    try {
      setIsLoadingDropdowns(true);
      const [brandsRes, categoriesRes, unitsRes] = await Promise.all([
        brandsApi.getAll(1, 100),
        categoriesApi.getAll(1, 100),
        unitsApi.getAll(1, 100)
      ]);
      setBrands(brandsRes.items);
      setCategories(categoriesRes.items);
      setUnits(unitsRes.items);
    } catch (error) {
      console.error("Failed to load dropdowns", error);
    } finally {
      setIsLoadingDropdowns(false);
    }
  };

  const handleSubmit = async (data: ProductFormValues) => {
    await onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Product" : "Add Product"}
      description={isEditing ? "Update the product details below." : "Enter the details for the new product."}
    >
      {isLoadingDropdowns ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Wireless Headphones" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. PRD-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. WH-BLK-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map(b => (
                          <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map(u => (
                          <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="costPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Price *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="minimumStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Stock *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maximumStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Stock *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reorderLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reorder Level *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEditing && (
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active Status</FormLabel>
                      <p className="text-sm text-slate-500">
                        Inactive products will be hidden from new orders.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isEditing ? "Update" : "Save"} Product
              </Button>
            </div>
          </form>
        </Form>
      )}
    </Modal>
  );
}
