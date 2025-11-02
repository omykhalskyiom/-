import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { PlusCircleIcon, CheckIcon, HeartIcon } from './icons/IconComponents';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, imageRect: DOMRect, quantity: number) => void;
  onShowDetails: (product: Product) => void;
  isInCart: boolean;
  searchQuery: string;
  wishlist: number[];
  onToggleWishlist: (productId: number) => void;
}

const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }
  const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-primary/20 text-primary-text rounded-sm p-0 m-0">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onShowDetails, isInCart, searchQuery, wishlist, onToggleWishlist }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const isFavorite = wishlist.includes(product.id);

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent modal from opening
    if (isInCart || !imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    onAddToCart(product, imageRect, 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };
  
  const handleCardClick = () => {
    onShowDetails(product);
  };

  const handleToggleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  const shortDescription = product.description.split('.')[0] + '.';

  return (
    <div
      onClick={handleCardClick}
      className={`
        relative group w-full bg-surface rounded-xl overflow-hidden shadow-md border border-primary/10 flex flex-col
        transition-all duration-300 cursor-pointer hover:shadow-lg
      `}
    >
      <button 
          onClick={handleToggleWishlistClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${isFavorite ? 'text-red-500 bg-red-100/80' : 'text-secondary-text bg-white/80 backdrop-blur-sm hover:text-red-500 hover:bg-red-100/80'}`}
          aria-label="Додати у вибране"
      >
          <HeartIcon className={`h-6 w-6 ${isFavorite ? 'fill-current' : 'fill-none'}`} />
      </button>

      <div className="relative h-48 w-full overflow-hidden">
        <img ref={imageRef} className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary-text line-clamp-2 min-h-[3.5rem]">
          <HighlightedText text={product.name} highlight={searchQuery} />
        </h3>
        <div className="flex-grow">
          <p className="mt-2 text-secondary-text text-sm truncate">
            <HighlightedText text={shortDescription} highlight={searchQuery} />
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-2xl font-extrabold text-primary-text">{product.price.toFixed(2)} грн</p>
          <button
            onClick={handleAddToCartClick}
            disabled={isInCart}
            className={`flex items-center justify-center px-5 py-2 font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 ease-in-out
                ${
                  isInCart
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-gradient-start to-gradient-end text-background hover:shadow-gold-glow focus:ring-primary group-hover:scale-105'
                }
                ${isAnimating ? 'animate-add-to-cart-pop' : ''}
                `}
          >
            {isInCart ? (
              <>
                <CheckIcon className="h-5 w-5 mr-2" />
                Додано
              </>
            ) : (
              <>
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Додати
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
