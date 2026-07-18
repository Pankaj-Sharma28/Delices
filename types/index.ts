export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  weight: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  benefits: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  variants: ProductVariant[];
}

export interface CartItem {
  id: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  weight: string;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: string;
  isGuest: boolean;
  orderNumber: string | null;
  isCompleted: boolean;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface WishlistState {
  items: string[]; // List of variant IDs or product IDs
}

export interface RootState {
  cart: CartState;
  wishlist: WishlistState;
  checkout: CheckoutState;
}
