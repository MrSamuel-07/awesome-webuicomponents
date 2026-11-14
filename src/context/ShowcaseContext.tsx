import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UseCaseId, STORE_PRODUCTS } from '../data/showcaseData';

export type ThemeMode = 'dark' | 'light';
export type SectionTab = 'layout' | 'interactive';
export type GlobalUseCasePreset = 'custom' | UseCaseId;
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  finish: string;
  image: string;
  qty: number;
}

interface ShowcaseContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  xrayMode: boolean;
  toggleXrayMode: () => void;
  setXrayMode: (enabled: boolean) => void;
  activeSection: SectionTab;
  setActiveSection: (section: SectionTab) => void;
  globalUseCase: GlobalUseCasePreset;
  setGlobalUseCase: (preset: GlobalUseCasePreset) => void;
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  dismissToast: (id: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
  drawerOpen: boolean;
  drawerTab: 'cart' | 'settings';
  openDrawer: (tab?: 'cart' | 'settings') => void;
  closeDrawer: () => void;
  glassModalOpen: boolean;
  setGlassModalOpen: (open: boolean) => void;
  cookieBannerVisible: boolean;
  setCookieBannerVisible: (visible: boolean) => void;
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'qty'>) => void;
  updateCartQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  jumpToComponent: (section: SectionTab, elementId: string) => void;
}

const ShowcaseContext = createContext<ShowcaseContextValue | null>(null);

export function ShowcaseProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [xrayMode, setXrayMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<SectionTab>('layout');
  const [globalUseCase, setGlobalUseCase] = useState<GlobalUseCasePreset>('custom');
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [drawerTab, setDrawerTab] = useState<'cart' | 'settings'>('cart');
  const [glassModalOpen, setGlassModalOpen] = useState<boolean>(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: STORE_PRODUCTS[0].id,
      name: STORE_PRODUCTS[0].name,
      price: STORE_PRODUCTS[0].price,
      finish: STORE_PRODUCTS[0].finish,
      image: STORE_PRODUCTS[0].image,
      qty: 1,
    },
  ]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleXrayMode = useCallback(() => {
    setXrayMode((prev) => !prev);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-3), { ...toast, id }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    },
    []
  );

  const openDrawer = useCallback((tab: 'cart' | 'settings' = 'cart') => {
    setDrawerTab(tab);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const addToCart = useCallback(
    (product: Omit<CartItem, 'qty'>) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
      addToast({
        title: 'Added to bag',
        description: `${product.name} ($${product.price})`,
        variant: 'success',
      });
    },
    [addToast]
  );

  const updateCartQty = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const jumpToComponent = useCallback((section: SectionTab, elementId: string) => {
    setActiveSection(section);
    window.setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  }, []);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ShowcaseContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        xrayMode,
        toggleXrayMode,
        setXrayMode,
        activeSection,
        setActiveSection,
        globalUseCase,
        setGlobalUseCase,
        toasts,
        addToast,
        dismissToast,
        commandPaletteOpen,
        setCommandPaletteOpen,
        mobileDrawerOpen,
        setMobileDrawerOpen,
        drawerOpen,
        drawerTab,
        openDrawer,
        closeDrawer,
        glassModalOpen,
        setGlassModalOpen,
        cookieBannerVisible,
        setCookieBannerVisible,
        cartItems,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        jumpToComponent,
      }}
    >
      {children}
    </ShowcaseContext.Provider>
  );
}

export function useShowcase() {
  const ctx = useContext(ShowcaseContext);
  if (!ctx) {
    throw new Error('useShowcase must be used within ShowcaseProvider');
  }
  return ctx;
}
