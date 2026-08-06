// API endpoint constants
// Routes match the backend controller routes: api/[controller]

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/Auth/login",
    ME: "/Auth/me",
  },

  // Company Management
  COMPANY: {
    BASE: "/Company",
    BY_ID: (id: string) => `/Company/${id}`,
  },

  // User Management
  USER: {
    BASE: "/User",
    BY_ID: (id: string) => `/User/${id}`,
  },

  // Role Management
  ROLE: {
    BASE: "/Role",
    BY_ID: (id: string) => `/Role/${id}`,
  },

  // Brands Management
  BRANDS: {
    BASE: "/Brands",
    BY_ID: (id: string) => `/Brands/${id}`,
  },

  // Categories Management
  CATEGORIES: {
    BASE: "/ProductCategories",
    BY_ID: (id: string) => `/ProductCategories/${id}`,
  },

  // Units Management
  UNITS: {
    BASE: "/Units",
    BY_ID: (id: string) => `/Units/${id}`,
  },
  PRODUCTS: {
    BASE: "/Products",
    BY_ID: (id: string) => `/Products/${id}`,
  },
  // Future modules — uncomment as backend APIs are completed
  // PRODUCT: {
  //   BASE: "/Product",
  //   BY_ID: (id: string) => `/Product/${id}`,
  // },
  // COMPONENT: {
  //   BASE: "/Component",
  //   BY_ID: (id: string) => `/Component/${id}`,
  // },
  // BOM: {
  //   BASE: "/Bom",
  //   BY_ID: (id: string) => `/Bom/${id}`,
  // },
  // SUPPLIER: {
  //   BASE: "/Supplier",
  //   BY_ID: (id: string) => `/Supplier/${id}`,
  // },
  // PURCHASE_REQUEST: {
  //   BASE: "/PurchaseRequest",
  //   BY_ID: (id: string) => `/PurchaseRequest/${id}`,
  // },
  // PURCHASE_ORDER: {
  //   BASE: "/PurchaseOrder",
  //   BY_ID: (id: string) => `/PurchaseOrder/${id}`,
  // },
  // GOODS_RECEIPT: {
  //   BASE: "/GoodsReceipt",
  //   BY_ID: (id: string) => `/GoodsReceipt/${id}`,
  // },
  // INVENTORY: {
  //   BASE: "/Inventory",
  //   BY_ID: (id: string) => `/Inventory/${id}`,
  // },
  // WAREHOUSE: {
  //   BASE: "/Warehouse",
  //   BY_ID: (id: string) => `/Warehouse/${id}`,
  // },
  // PRODUCTION_ORDER: {
  //   BASE: "/ProductionOrder",
  //   BY_ID: (id: string) => `/ProductionOrder/${id}`,
  // },
  // QUALITY: {
  //   BASE: "/Quality",
  //   BY_ID: (id: string) => `/Quality/${id}`,
  // },
  // DISTRIBUTOR: {
  //   BASE: "/Distributor",
  //   BY_ID: (id: string) => `/Distributor/${id}`,
  // },
  // SALES_ORDER: {
  //   BASE: "/SalesOrder",
  //   BY_ID: (id: string) => `/SalesOrder/${id}`,
  // },
  // SHIPMENT: {
  //   BASE: "/Shipment",
  //   BY_ID: (id: string) => `/Shipment/${id}`,
  // },
  // WARRANTY: {
  //   BASE: "/Warranty",
  //   BY_ID: (id: string) => `/Warranty/${id}`,
  // },
  REPORTS: {
    DASHBOARD: "/Reports/dashboard",
    INVENTORY: "/Reports/inventory",
    PRODUCTION: "/Reports/production",
    SALES: "/Reports/sales",
    WARRANTY: "/Reports/warranty",
    AUDIT: "/Reports/audit",
  },
} as const;
