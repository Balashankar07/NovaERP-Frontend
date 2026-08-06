import { BrandDto } from "./brands.types";
import { CategoryDto } from "./categories.types";
import { UnitDto } from "./units.types";

export interface ProductDto {
  id: string;
  productCode: string;
  sku: string;
  name: string;
  description?: string;
  
  categoryId: string;
  category?: CategoryDto;
  
  brandId: string;
  brand?: BrandDto;
  
  unitId: string;
  unit?: UnitDto;
  
  costPrice: number;
  sellingPrice: number;
  minimumStock: number;
  maximumStock: number;
  reorderLevel: number;
  barcode?: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface CreateProductDto {
  productCode: string;
  sku: string;
  name: string;
  description?: string;
  categoryId: string;
  brandId: string;
  unitId: string;
  costPrice: number;
  sellingPrice: number;
  minimumStock: number;
  maximumStock: number;
  reorderLevel: number;
  barcode?: string;
  imageUrl?: string;
}

export interface UpdateProductDto extends CreateProductDto {
  isActive: boolean;
}
