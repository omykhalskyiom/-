import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { XIcon, StarIcon, PlusIcon, MinusIcon, HeartIcon } from './icons/IconComponents';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, imageRect: DOMRect, quantity: number) => void;
  wishlist: number[];
  onToggleWishlist: (productId: number) => void;
  isClosing: boolean;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-400" />);
        } else if (i - 0.5 <= rating) {
            stars.push(
                <div key={i} className="relative">
                    <StarIcon className="h-5 w-5 text-gray-300" />
                    <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                </div>
            );
        } else {
            stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-300" />);
        }
    }
    return <div className="flex items-center">{stars}</div>;
};

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, wishlist, onToggleWishlist, isClosing }) => {
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const isFavorite = wishlist.includes(product.id);

  const handleAddToCartClick = () => {
    if (!imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    onAddToCart(product, imageRect, quantity);
    onClose();
  };

  const handleToggleWishlistClick = () => {
    onToggleWishlist(product.id);
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm ${isClosing ? 'animate-backdrop-fade-out' : 'animate-backdrop-fade-in'}`}
        aria-hidden="true"
      />

      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden ${isClosing ? 'animate-modal-spring-out' : 'animate-modal-spring-in'}`}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/50 transition-colors"
          aria-label="Закрити"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="w-full md:w-1/2 flex-shrink-0">
          <img 
            ref={imageRef}
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-64 md:h-full object-cover" 
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col p-6 md:p-8 overflow-y-auto">
          <div className="flex-grow">
            <h2 className="text-3xl font-extrabold text-primary-text mb-2">{product.name}</h2>
            
            <div className="flex items-center space-x-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-secondary-text text-sm font-medium">{product.rating.toFixed(1)}</span>
            </div>

            <p className="text-secondary-text mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="font-bold text-primary-text mb-2">Склад:</h3>
              <p className="text-secondary-text text-sm">{product.ingredients.join(', ')}.</p>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-primary-text mb-2">Харчова цінність:</h3>
                <span className="text-sm bg-surface text-secondary-text font-medium px-3 py-1 rounded-full">
                    🔥 ~{product.calories} ккал
                </span>
            </div>
          </div>
          
          <div className="mt-auto pt-6 bg-white sticky bottom-0 -m-6 p-6 md:static md:m-0 md:p-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-3xl font-extrabold text-primary-text">{totalPrice} грн</p>
              <div className="flex items-center border border-primary/20 rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-secondary-text hover:bg-primary/10 rounded-l-md transition-colors"><MinusIcon className="h-5 w-5" /></button>
                <span className="px-4 text-lg font-bold w-16 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-3 text-secondary-text hover:bg-primary/10 rounded-r-md transition-colors"><PlusIcon className="h-5 w-5" /></button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={handleAddToCartClick}
                className="w-full py-3 bg-gradient-to-r from-gradient-start to-gradient-end text-background font-bold rounded-lg shadow-lg hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-transform duration-300 hover:scale-105 hover:animate-gold-pulse"
              >
                Додати в кошик
              </button>
              <button 
                onClick={handleToggleWishlistClick}
                className={`p-3 rounded-lg border transition-colors ${isFavorite ? 'border-red-500 bg-red-100 text-red-500' : 'border-primary/20 text-secondary-text hover:border-primary hover:text-primary'}`} 
                aria-label="Додати у вибране"
              >
                <HeartIcon className={`h-6 w-6 ${isFavorite ? 'fill-current' : 'fill-none'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;