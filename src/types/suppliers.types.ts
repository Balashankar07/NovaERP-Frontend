export interface SupplierDto {
  id: string;
  supplierCode: string;
  supplierName: string;
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  taxRegistrationNumber?: string;
  paymentTerms?: string;
  currency?: string;
  creditLimit?: number;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSupplierDto {
  supplierCode: string;
  supplierName: string;
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  taxRegistrationNumber?: string;
  paymentTerms?: string;
  currency?: string;
  creditLimit?: number;
  notes?: string;
  isActive: boolean;
}

export interface UpdateSupplierDto extends CreateSupplierDto {}
