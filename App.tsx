import React, { useState, useRef, useEffect, RefObject } from 'react';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import ShoppingCart from './components/ShoppingCart';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import { Product, CartItem } from './types';
import { MenuIcon, ShoppingCartIcon as HeaderCartIcon, SearchIcon, XIcon } from './components/icons/IconComponents';

const CLOSE_ANIMATION_DURATION = 300;
const MODAL_CLOSE_ANIMATION_DURATION = 300;


interface FlyingImageEffectProps {
  imageUrl: string;
  startRect: DOMRect;
  mobileCartRef: RefObject<HTMLButtonElement>;
  desktopCartRef: RefObject<HTMLButtonElement>;
  onAnimationEnd: () => void;
}

const FlyingImageEffect: React.FC<FlyingImageEffectProps> = ({
  imageUrl,
  startRect,
  mobileCartRef,
  desktopCartRef,
  onAnimationEnd,
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: startRect.top,
    left: startRect.left,
    width: startRect.width,
    height: startRect.height,
    zIndex: 9999,
    borderRadius: '0.75rem',
    transition: 'all 0.8s cubic-bezier(0.5, -0.4, 0.7, 1.5)', // Creates an arc/bounce effect
    objectFit: 'cover',
  });

  useEffect(() => {
    const endRect = (window.innerWidth < 768 ? mobileCartRef.current : desktopCartRef.current)?.getBoundingClientRect();

    if (endRect) {
      const timeoutId = setTimeout(() => {
        setStyle(prevStyle => ({
          ...prevStyle,
          top: endRect.top + endRect.height / 2,
          left: endRect.left + endRect.width / 2,
          width: 0,
          height: 0,
          opacity: 0.5,
        }));
      }, 10);

      return () => clearTimeout(timeoutId);
    } else {
      onAnimationEnd();
    }
  }, [mobileCartRef, desktopCartRef, onAnimationEnd]);

  return (
    <img
      src={imageUrl}
      alt="Flying product"
      style={style}
      onTransitionEnd={onAnimationEnd}
    />
  );
};

const useDebounce = <T,>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};


const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [flyingImage, setFlyingImage] = useState<{ url: string; rect: DOMRect } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Головна');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCheckoutModalClosing, setIsCheckoutModalClosing] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const mobileCartRef = useRef<HTMLButtonElement>(null);
  const desktopCartRef = useRef<HTMLButtonElement>(null);


  const handleAddToCart = (product: Product, startRect: DOMRect, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setFlyingImage({ url: product.imageUrl, rect: startRect });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  const handleShowDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setIsModalClosing(false);
    }, MODAL_CLOSE_ANIMATION_DURATION);
  };
  
  const handleToggleWishlist = (productId: number) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const openCart = () => {
    setIsCartOpen(true);
    setIsAnimatingOut(false);
  };

  const closeCart = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsAnimatingOut(false);
    }, CLOSE_ANIMATION_DURATION);
  };

  const toggleCart = () => {
    if (!isCartOpen && !isAnimatingOut) {
      openCart();
    } else if (isCartOpen && !isAnimatingOut) {
      closeCart();
    }
  };
  
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsAnimatingOut(false);
    setIsCheckoutModalOpen(true);
    setIsCheckoutModalClosing(false);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutModalClosing(true);
    setTimeout(() => {
      setIsCheckoutModalOpen(false);
      setIsCheckoutModalClosing(false);
    }, MODAL_CLOSE_ANIMATION_DURATION);
  };
  
  const handleSubmitOrder = () => {
    setCartItems([]);
  };

  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-background text-primary-text">
       {flyingImage && (
        <FlyingImageEffect
            imageUrl={flyingImage.url}
            startRect={flyingImage.rect}
            mobileCartRef={mobileCartRef}
            desktopCartRef={desktopCartRef}
            onAnimationEnd={() => setFlyingImage(null)}
        />
      )}
      <div className="flex">
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:w-64 md:flex-shrink-0">
          <Navigation 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
            wishlistCount={wishlist.length}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header for Mobile */}
          <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-20 md:hidden border-b border-primary/20">
            <div className="px-4 h-16 flex items-center justify-between">
              <button onClick={toggleNav} className="p-2 -ml-2 text-secondary-text hover:text-highlight">
                <MenuIcon className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-bold text-primary">ШВИДКА ХАВКА</h1>
              <button ref={mobileCartRef} onClick={toggleCart} className="relative p-2 -mr-2 text-secondary-text hover:text-highlight transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_theme(colors.highlight)]">
                <HeaderCartIcon className="h-6 w-6" />
                {totalItemsInCart > 0 && (
                  <span className="absolute top-1 right-1 block w-4 h-4 bg-primary text-background text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItemsInCart}
                  </span>
                )}
              </button>
            </div>
          </header>

          <main className="flex-grow p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
               <div className="relative w-full md:flex-grow md:max-w-lg mb-4 md:mb-0">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-secondary-text" />
                  </span>
                  <input
                    type="text"
                    placeholder="Пошук..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-surface text-primary-text placeholder-secondary-text border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-text hover:text-primary transition-colors duration-200"
                        aria-label="Очистити пошук"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                  )}
              </div>
              <button
                ref={desktopCartRef}
                onClick={toggleCart}
                className="relative hidden md:flex items-center px-4 py-2 bg-surface text-primary-text font-semibold rounded-lg shadow-md border border-primary/20 hover:border-primary transition-all duration-300 ease-in-out hover:scale-105 animate-cart-glow md:ml-4"
              >
                <HeaderCartIcon className="h-5 w-5 mr-2 text-primary" />
                <span>Мій кошик</span>
                {totalItemsInCart > 0 && (
                  <span className="ml-3 bg-primary text-background text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {totalItemsInCart}
                  </span>
                )}
              </button>
            </div>
            <MainContent 
              onAddToCart={handleAddToCart} 
              onShowDetails={handleShowDetails}
              searchQuery={debouncedSearchQuery} 
              cartItems={cartItems} 
              selectedCategory={selectedCategory} 
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          </main>
        </div>
      </div>

      {/* Mobile Navigation Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-primary/20 transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <Navigation 
          onClose={toggleNav} 
          selectedCategory={selectedCategory} 
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            toggleNav();
          }}
          wishlistCount={wishlist.length}
        />
      </div>
      {isNavOpen && <div className="fixed inset-0 bg-black/70 z-30 md:hidden" onClick={toggleNav}></div>}

      {/* Shopping Cart Sidebar & Backdrop */}
      {(isCartOpen || isAnimatingOut) && (
        <>
          <aside className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-primary/20 ${isAnimatingOut ? 'animate-cart-close' : 'animate-cart-open'}`}>
            <ShoppingCart
              items={cartItems}
              onRemoveItem={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onClose={toggleCart}
              onCheckout={handleOpenCheckout}
            />
          </aside>
          <div 
            className={`fixed inset-0 bg-black/70 z-40 ${isAnimatingOut ? 'animate-backdrop-fade-out' : 'animate-backdrop-fade-in'}`} 
            onClick={toggleCart}
          />
        </>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseDetails}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          isClosing={isModalClosing}
        />
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <CheckoutModal
          onClose={handleCloseCheckout}
          onSubmitOrder={handleSubmitOrder}
          isClosing={isCheckoutModalClosing}
        />
      )}
    </div>
  );
};

export default App;