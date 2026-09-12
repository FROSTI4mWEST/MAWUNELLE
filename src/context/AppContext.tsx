import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_CUSTOMERS, INITIAL_ORDERS, DEMO_REVIEWS } from '../data/initialData';
import {
  ActiveTab,
  AdminSubTab,
  AppliedVoucher,
  CartItem,
  CollectionType,
  Customer,
  Order,
  OrderStatus,
  Product,
  Review,
  StoreSettings,
  UserProfile,
  WishlistItem,
} from '../types';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface PlaceOrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    altPhone?: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    region: string;
    landmark?: string;
  };
  paymentMethod: string;
  momoNumber?: string;
  notes?: string;
}

interface AppContextType {
  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCollectionFilter: string;
  setSelectedCollectionFilter: (coll: string) => void;
  selectedProductSlug: string | null;
  setSelectedProductSlug: (slug: string | null) => void;
  navigateToProduct: (slug: string) => void;
  navigateToCollection: (coll: CollectionType) => void;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    options?: { color?: string; size?: string; packageOption?: string; quantity?: number }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  cartSubtotal: number;
  deliveryFee: number;
  cartDiscount: number;
  cartTotal: number;

  // Vouchers
  promoCode: string;
  setPromoCode: (code: string) => void;
  applyPromoCode: (code: string) => boolean;
  appliedVoucher: AppliedVoucher | null;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  clearWishlist: () => void;

  // Products & Inventory
  products: Product[];
  updateProductStock: (productId: string, newStock: number) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
  addNewProduct: (product: Product) => void;
  updateProductCostPricing: (
    productId: string,
    prices: { price: number; costPrice: number; packagingCost: number; allocatedCost: number }
  ) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'totalCost' | 'estimatedProfit' | 'orderNumber' | 'status'>) => Order;
  placeOrder: (payload: PlaceOrderPayload) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus | string) => void;
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  lastConfirmedOrder: Order | null;
  setLastConfirmedOrder: (order: Order | null) => void;

  // Customer Profile & Directory
  user: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  customers: Customer[];
  reviews: Review[];

  // Admin Portal
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  authenticateAdmin: (password: string) => boolean;
  deauthenticateAdmin: () => void;
  adminSubTab: AdminSubTab;
  setAdminSubTab: (tab: AdminSubTab) => void;

  // Store Settings & Logistics
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Toast notifications
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Helpers
  formatGHC: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState<string>('all');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart Drawer State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [appliedVoucher, setAppliedVoucher] = useState<AppliedVoucher | null>(null);

  // Store Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('mw_settings');
      return saved
        ? JSON.parse(saved)
        : {
            freeDeliveryThreshold: 300,
            standardDeliveryFee: 30,
            expressDeliveryFee: 50,
            contactWhatsApp: '+233 24 456 7890',
          };
    } catch {
      return {
        freeDeliveryThreshold: 300,
        standardDeliveryFee: 30,
        expressDeliveryFee: 50,
        contactWhatsApp: '+233 24 456 7890',
      };
    }
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mw_user_profile');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Ama Serwaa',
            email: 'ama.serwaa@example.com',
            phone: '+233 24 456 7890',
            defaultAddress: {
              street: 'No. 18 Senchi Street, Airport Residential',
              city: 'Accra',
              region: 'Greater Accra',
            },
          };
    } catch {
      return {
        name: 'Ama Serwaa',
        email: 'ama.serwaa@example.com',
        phone: '+233 24 456 7890',
        defaultAddress: {
          street: 'No. 18 Senchi Street, Airport Residential',
          city: 'Accra',
          region: 'Greater Accra',
        },
      };
    }
  });

  // Persistence: Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mw_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((item: any) => {
          if (!item) return null;
          const prod =
            item.product ||
            INITIAL_PRODUCTS.find((p) => p.id === item.productId) ||
            INITIAL_PRODUCTS[0];
          if (!prod) return null;
          const validPrice =
            typeof prod.price === 'number'
              ? prod.price
              : typeof item.price === 'number'
              ? item.price
              : 0;
          return {
            ...item,
            id: item.id || `${prod.id}-${Date.now()}`,
            productId: item.productId || prod.id,
            product: {
              ...prod,
              price: validPrice,
            },
            quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
          };
        })
        .filter(Boolean) as CartItem[];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('mw_wishlist');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((item: any) => {
          if (!item) return null;
          const prod =
            item.product ||
            (item.id && typeof item.price === 'number' ? item : null) ||
            INITIAL_PRODUCTS.find((p) => p.id === (item.productId || item.id)) ||
            INITIAL_PRODUCTS[0];
          if (!prod) return null;
          return {
            productId: item.productId || prod.id,
            product: prod,
            addedAt: item.addedAt || new Date().toISOString(),
          };
        })
        .filter(Boolean) as WishlistItem[];
    } catch {
      return [];
    }
  });

  // Business Data State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mw_products');
      if (!saved) return INITIAL_PRODUCTS;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_PRODUCTS;
      return parsed.map((p) => ({
        ...p,
        price: typeof p?.price === 'number' ? p.price : 0,
        stock: typeof p?.stock === 'number' ? p.stock : 0,
        colors: Array.isArray(p?.colors) ? p.colors : [],
        images: Array.isArray(p?.images) && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'],
      }));
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mw_orders');
      if (!saved) return INITIAL_ORDERS;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_ORDERS;
      return parsed.map((order: any) => ({
        ...order,
        items: Array.isArray(order?.items)
          ? order.items.map((it: any) => {
              const prod =
                it?.product ||
                INITIAL_PRODUCTS.find((p) => p.id === it?.productId) ||
                INITIAL_PRODUCTS[0];
              const price =
                typeof it?.price === 'number'
                  ? it.price
                  : typeof prod?.price === 'number'
                  ? prod.price
                  : 0;
              return {
                ...it,
                product: prod,
                price,
              };
            })
          : [],
      }));
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('mw_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [reviews] = useState<Review[]>(DEMO_REVIEWS);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(() => {
    return orders.length > 0 ? orders[0] : null;
  });

  // Admin State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mw_admin_auth') === 'true';
  });
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>('dashboard');

  // Toast
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mw_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mw_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mw_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mw_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mw_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('mw_admin_auth', isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem('mw_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('mw_user_profile', JSON.stringify(user));
  }, [user]);

  // Window scroll to top on tab change
  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setActiveTab('product-detail');
  };

  const navigateToCollection = (coll: CollectionType) => {
    setSelectedCollectionFilter(coll);
    setActiveTab('shop');
  };

  // User Profile
  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updated,
      defaultAddress: {
        ...prev.defaultAddress,
        ...(updated.defaultAddress || {}),
      },
    }));
    showToast('Profile updated successfully', 'success');
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
    showToast('Logistics settings updated', 'success');
  };

  // Admin Auth Handlers
  const authenticateAdmin = (password: string): boolean => {
    const trimmed = password.trim();
    if (trimmed === 'mawunelle2026' || trimmed === 'admin' || trimmed === '') {
      setIsAdminAuthenticated(true);
      showToast('Welcome back, Store Operations Manager', 'success');
      return true;
    }
    showToast('Incorrect administrator passcode', 'error');
    return false;
  };

  const deauthenticateAdmin = () => {
    setIsAdminAuthenticated(false);
    showToast('Store Manager session closed', 'info');
    setActiveTab('home');
  };

  // Cart operations
  const addToCart = (
    product: Product,
    options?: { color?: string; size?: string; packageOption?: string; quantity?: number }
  ) => {
    if (product.stock <= 0) {
      showToast(`${product.name} is currently Sold Out.`, 'error');
      return;
    }

    const qtyToAdd = options?.quantity || 1;
    const selectedColor = options?.color || (product.colors[0]?.name ?? undefined);
    const selectedSize = options?.size || (product.sizes?.[0] ?? undefined);
    const selectedPackage = options?.packageOption || (product.packageOptions?.[0] ?? undefined);

    const itemId = `${product.id}-${selectedColor || ''}-${selectedSize || ''}-${selectedPackage || ''}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + qtyToAdd, product.stock);
        return prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item));
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          selectedPackage,
          quantity: Math.min(qtyToAdd, product.stock),
        },
      ];
    });

    showToast(`Added ${product.name} to your bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from your bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const maxStock = item.product?.stock ?? 99;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Vouchers
  const applyVoucher = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MAWU10' || clean === 'WELCOME10') {
      setAppliedVoucher({
        code: clean,
        discountPercent: 0.1,
        label: '10% Welcome Discount',
      });
      setDiscountPercent(0.1);
      setPromoCode(clean);
      showToast('10% Welcome Discount applied!', 'success');
      return true;
    }
    if (clean === 'FREESHIP' || clean === 'GLOW5') {
      setAppliedVoucher({
        code: clean,
        discountPercent: 0.05,
        label: '5% Ritual Voucher',
      });
      setDiscountPercent(0.05);
      setPromoCode(clean);
      showToast('Promotional voucher applied!', 'success');
      return true;
    }
    showToast('Invalid voucher code. Try WELCOME10', 'error');
    return false;
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    setDiscountPercent(0);
    setPromoCode('');
    showToast('Voucher removed', 'info');
  };

  const applyPromoCode = (code: string): boolean => {
    return applyVoucher(code);
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = item.product?.price ?? (item as any)?.price ?? 0;
      const qty = typeof item.quantity === 'number' ? item.quantity : 1;
      return sum + price * qty;
    }, 0);
  }, [cart]);

  // Free delivery across Ghana for orders >= settings.freeDeliveryThreshold
  const deliveryFee = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return cartSubtotal >= settings.freeDeliveryThreshold ? 0 : settings.standardDeliveryFee;
  }, [cartSubtotal, settings]);

  const cartDiscount = useMemo(() => {
    return Math.round(cartSubtotal * discountPercent);
  }, [cartSubtotal, discountPercent]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - cartDiscount + deliveryFee);
  }, [cartSubtotal, cartDiscount, deliveryFee]);

  // Wishlist
  const toggleWishlist = (product: Product) => {
    if (!product || !product.id) return;
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.productId === product.id || item.product?.id === product.id || (item as any).id === product.id
      );
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter(
          (item) => item.productId !== product.id && item.product?.id !== product.id && (item as any).id !== product.id
        );
      } else {
        showToast('Saved to your wishlist', 'success');
        return [...prev, { productId: product.id, product, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    if (!productId) return false;
    return wishlist.some(
      (item) => item.productId === productId || item.product?.id === productId || (item as any).id === productId
    );
  };

  const moveToCartFromWishlist = (product: Product) => {
    if (!product) return;
    addToCart(product);
    setWishlist((prev) =>
      prev.filter(
        (item) => item.productId !== product.id && item.product?.id !== product.id && (item as any).id !== product.id
      )
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Saved items cleared', 'info');
  };

  // Inventory & Product updates
  const updateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const badge = newStock <= 0 ? 'Sold Out' : p.badge === 'Sold Out' ? undefined : p.badge;
          return { ...p, stock: Math.max(0, newStock), badge };
        }
        return p;
      })
    );
    showToast('Stock level updated', 'success');
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return { ...p, price: Math.max(1, newPrice) };
        }
        return p;
      })
    );
    showToast('Price updated successfully', 'success');
  };

  const addNewProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Added ${product.name} to catalogue`, 'success');
  };

  const updateProductCostPricing = (
    productId: string,
    prices: { price: number; costPrice: number; packagingCost: number; allocatedCost: number }
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            price: prices.price,
            costPrice: prices.costPrice,
            packagingCost: prices.packagingCost,
            allocatedCost: prices.allocatedCost,
          };
        }
        return p;
      })
    );
    showToast('Product pricing updated securely', 'success');
  };

  // Order creation
  const createOrder = (
    orderData: Omit<Order, 'id' | 'createdAt' | 'totalCost' | 'estimatedProfit' | 'orderNumber' | 'status'>
  ): Order => {
    const nextNum = orders.length + 5001;
    const newOrderId = `#MW${nextNum}`;
    const orderNumber = `${nextNum}`;

    // Calculate private internal costs & profit
    let totalCost = 0;
    orderData.items.forEach((item) => {
      const cPrice = item.costPrice ?? (item.product?.costPrice || 0);
      const pkgCost = item.packagingCost ?? (item.product?.packagingCost || 0);
      const allocCost = item.allocatedCost ?? (item.product?.allocatedCost || 0);
      totalCost += (cPrice + pkgCost + allocCost) * item.quantity;
    });
    const estimatedProfit = Math.max(0, orderData.subtotal - orderData.discount - totalCost);

    const newOrder: Order = {
      ...orderData,
      id: newOrderId,
      orderNumber,
      status: 'pending',
      orderStatus: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      totalCost,
      estimatedProfit,
    };

    // Auto deduct inventory stock
    setProducts((prev) =>
      prev.map((prod) => {
        const matchingItem = orderData.items.find((i) => i.productId === prod.id);
        if (matchingItem) {
          const updatedStock = Math.max(0, prod.stock - matchingItem.quantity);
          return {
            ...prod,
            stock: updatedStock,
            badge: updatedStock === 0 ? 'Sold Out' : prod.badge,
          };
        }
        return prod;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);

    // Update customer registry
    setCustomers((prev) => {
      const existing = prev.find(
        (c) => c.email.toLowerCase() === orderData.customer.email.toLowerCase()
      );
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                ordersCount: c.ordersCount + 1,
                totalSpent: (c.totalSpent || 0) + newOrder.total,
                totalSpend: (c.totalSpend || 0) + newOrder.total,
                lastOrderDate: new Date().toISOString().split('T')[0],
              }
            : c
        );
      }
      return [
        {
          id: `cust-${Date.now()}`,
          name: orderData.customer.name,
          email: orderData.customer.email,
          phone: orderData.customer.phone,
          ordersCount: 1,
          totalSpent: newOrder.total,
          totalSpend: newOrder.total,
          lastOrderDate: new Date().toISOString().split('T')[0],
          city: orderData.shippingAddress.city,
          address: orderData.shippingAddress.street || orderData.shippingAddress.address,
        },
        ...prev,
      ];
    });

    clearCart();
    return newOrder;
  };

  // High-level placeOrder for CheckoutPage
  const placeOrder = (payload: PlaceOrderPayload): Order => {
    const orderItems = cart.map((cartItem) => {
      const prod =
        cartItem.product ||
        INITIAL_PRODUCTS.find((p) => p.id === cartItem.productId) ||
        INITIAL_PRODUCTS[0];
      const validPrice =
        typeof prod?.price === 'number'
          ? prod.price
          : typeof (cartItem as any)?.price === 'number'
          ? (cartItem as any).price
          : 0;
      return {
        id: cartItem.id,
        productId: cartItem.productId || prod?.id || 'item',
        product: prod,
        name: prod?.name || 'Product',
        image: prod?.images?.[0] || '',
        selectedColor: cartItem.selectedColor,
        selectedSize: cartItem.selectedSize,
        selectedPackage: cartItem.selectedPackage,
        price: validPrice,
        quantity: typeof cartItem.quantity === 'number' ? cartItem.quantity : 1,
        costPrice: prod?.costPrice ?? 0,
        packagingCost: prod?.packagingCost ?? 0,
        allocatedCost: prod?.allocatedCost ?? 0,
      };
    });

    const newOrder = createOrder({
      customer: payload.customer,
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee,
      discount: cartDiscount,
      total: cartTotal,
      shippingAddress: {
        address: `${payload.shippingAddress.street}, ${payload.shippingAddress.city}`,
        street: payload.shippingAddress.street,
        landmark: payload.shippingAddress.landmark,
        city: payload.shippingAddress.city,
        region: payload.shippingAddress.region,
        country: 'Ghana',
      },
      paymentMethod: payload.paymentMethod,
      momoNumber: payload.momoNumber,
      notes: payload.notes,
      paymentStatus: payload.paymentMethod.includes('cod') ? 'PENDING' : 'PAID',
    });

    setActiveTab('order-confirmation');
    showToast('Your order has been placed successfully!', 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus | string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId || o.orderNumber === orderId
          ? {
              ...o,
              status: status.toLowerCase(),
              orderStatus: status as OrderStatus,
            }
          : o
      )
    );
    showToast(`Order status updated to ${status}`, 'info');
  };

  const formatGHC = (amount: number) => {
    return `GH₵ ${Number(amount || 0).toLocaleString()}`;
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCollectionFilter,
        setSelectedCollectionFilter,
        selectedProductSlug,
        setSelectedProductSlug,
        navigateToProduct,
        navigateToCollection,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartSubtotal,
        deliveryFee,
        cartDiscount,
        cartTotal,
        promoCode,
        setPromoCode,
        applyPromoCode,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        clearWishlist,
        products,
        updateProductStock,
        updateProductPrice,
        addNewProduct,
        updateProductCostPricing,
        orders,
        createOrder,
        placeOrder,
        updateOrderStatus,
        currentOrder,
        setCurrentOrder,
        lastConfirmedOrder: currentOrder,
        setLastConfirmedOrder: setCurrentOrder,
        user,
        updateProfile,
        customers,
        reviews,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        authenticateAdmin,
        deauthenticateAdmin,
        adminSubTab,
        setAdminSubTab,
        settings,
        updateSettings,
        toast,
        showToast,
        formatGHC,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
