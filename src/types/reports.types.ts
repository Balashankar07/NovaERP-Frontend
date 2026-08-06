export interface DashboardSummaryDto {
  totalProducts: number;
  totalSuppliers: number;
  totalWarehouses: number;
  totalInventoryValue: number;
  openPurchaseOrders: number;
  completedProductionOrders: number;
  pendingQualityInspections: number;
  salesThisMonth: number;
  shipmentsPending: number;
  activeWarranties: number;
  openWarrantyClaims: number;
}

export interface AuditReportDto {
  id: string;
  action: string;
  entityName: string;
  entityId: string;
  ipAddress: string;
  timestamp: string;
  userName?: string;
}

export interface InventoryReportDto {
  productId: string;
  productName: string;
  productCode: string;
  quantityOnHand: number;
  minStockLevel: number;
  maxStockLevel: number;
  costPrice: number;
  totalValue: number;
  lastRestockDate: string;
}

export interface ProductionReportDto {
  orderId: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: string;
}

export interface SalesReportDto {
  orderId: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: string;
}

export interface WarrantyReportDto {
  warrantyId: string;
  serialNumber: string;
  productName: string;
  startDate: string;
  endDate: string;
  status: string;
}
