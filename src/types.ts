export type CollectionType = 'everyday-edit' | 'glow-ritual' | 'monthly-product';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface MonthlyItemBreakdown {
  item: string;
  purpose: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number; // in GH₵
  // PRIVATE internal cost fields - NEVER displayed to customer
  costPrice: number;
  packagingCost: number;
  allocatedCost: number;
  collection: CollectionType;
  collectionName: string;
  category: string;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  packageOptions?: string[];
  stock: number;
  lowStockThreshold: number;
  badge?: 'Bestseller' | 'New' | 'Sold Out';
  rating: number;
  reviewCount: number;
  details: string[];
  materials?: string;
  dimensions?: string;
  howToUse?: string;
  // Special treatments
  glowRoutineStep?: 'hand-care' | 'foot-care' | 'maintenance';
  monthlyPackageItems?: MonthlyItemBreakdown[];
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id (combines product id and variant)
  productId: string;
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  selectedPackage?: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'NEW'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'READY / DISPATCHED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'PAID' | 'PENDING' | 'REFUNDED';

export interface OrderItem {
  id?: string;
  productId: string;
  name?: string;
  image?: string;
  product: Product;
  color?: string;
  selectedColor?: string;
  size?: string;
  selectedSize?: string;
  packageOption?: string;
  selectedPackage?: string;
  price?: number;
  quantity: number;
  costPrice?: number;
  packagingCost?: number;
  allocatedCost?: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. MW-5001 or 5001
  status: string; // 'pending' | 'processing' | 'shipped' | 'delivered'
  customer: {
    name: string;
    email: string;
    phone: string;
    altPhone?: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  shippingAddress: {
    address?: string;
    street?: string;
    landmark?: string;
    city: string;
    region: string;
    country?: string;
    notes?: string;
  };
  deliveryMethod?: string;
  paymentMethod: string;
  momoNumber?: string;
  notes?: string;
  paymentStatus?: PaymentStatus;
  orderStatus?: OrderStatus;
  createdAt: string;
  totalCost?: number;
  estimatedProfit?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent?: number;
  totalSpend?: number;
  lastOrderDate?: string;
  address?: string;
  city?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  defaultAddress: {
    street: string;
    city: string;
    region: string;
  };
}

export interface StoreSettings {
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  expressDeliveryFee: number;
  contactWhatsApp: string;
}

export interface AppliedVoucher {
  code: string;
  discountPercent: number;
  discountAmount?: number;
  label: string;
}

export interface InventoryHistory {
  date: string;
  change: number;
  type: 'RESTOCK' | 'ORDER' | 'ADJUSTMENT';
  note: string;
}

export interface Review {
  id: string;
  productId?: string;
  customerName: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productName?: string;
  avatar?: string;
}

export type ActiveTab =
  | 'home'
  | 'shop'
  | 'collections'
  | 'the-edit'
  | 'about'
  | 'contact'
  | 'delivery'
  | 'returns'
  | 'privacy'
  | 'terms'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'wishlist'
  | 'admin';

export type AdminSubTab =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'inventory'
  | 'customers'
  | 'analytics'
  | 'settings';
