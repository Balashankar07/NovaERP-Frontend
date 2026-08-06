// Application route path constants
// Centralized to avoid hardcoded strings across the codebase

export const ROUTES = {
  // Public
  LOGIN: "/login",

  // Dashboard
  DASHBOARD: "/",

  // Error
  FORBIDDEN: "/403",

  // Settings & Administration
  SETTINGS: "/settings",
  USERS: "/settings/users",
  ROLES: "/settings/roles",
  COMPANY: "/settings/company",

  // Product Management
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CATEGORIES: "/products/categories",

  // Bill of Materials
  BOM: "/bom",
  BOM_DETAIL: (id: string) => `/bom/${id}`,

  // Supplier Management
  SUPPLIERS: "/suppliers",
  SUPPLIER_DETAIL: (id: string) => `/suppliers/${id}`,

  // Procurement
  PURCHASE_REQUESTS: "/procurement/requests",
  PURCHASE_ORDERS: "/procurement/orders",
  GOODS_RECEIPTS: "/procurement/goods-receipts",

  // Inventory
  INVENTORY: "/inventory",

  // Warehouse
  WAREHOUSES: "/warehouse",
  WAREHOUSE_LOCATIONS: "/warehouse/locations",
  STOCK_MOVEMENTS: "/warehouse/stock-movements",

  // Production
  PRODUCTION_ORDERS: "/production",
  PRODUCTION_DETAIL: (id: string) => `/production/${id}`,

  // Quality Control
  QUALITY: "/quality",

  // Sales
  DISTRIBUTORS: "/sales/distributors",
  SALES_ORDERS: "/sales/orders",

  // Distribution
  SHIPMENTS: "/distribution",

  // Warranty
  WARRANTY: "/warranty",
  SERVICE_REQUESTS: "/warranty/service-requests",

  // Reports
  REPORTS: "/reports",
} as const;
