import React from 'react';
import { CartItem } from '../types';
import { ShoppingCartIcon, PlusIcon, MinusIcon, TrashIcon, XIcon } from './icons/IconComponents';

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onRemoveItem, onUpdateQuantity, onClose }) => {
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <aside className="w-full h-full flex flex-col bg-white text-primary-text">
      <div className="p-6 border-b border-primary/20 flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary-text flex items-center">
          <ShoppingCartIcon className="h-6 w-6 mr-3 text-primary" />
          Мій кошик
        </h2>
        <button onClick={onClose} className="p-2 text-secondary-text hover:text-highlight">
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-secondary-text">
            <ShoppingCartIcon className="h-16 w-16 mb-4 text-primary/50" />
            <p className="font-semibold text-primary-text">Ваш кошик порожній</p>
            <p className="text-sm">Час додати щось смачненьке.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map(item => (
              <li key={item.id} className="flex items-start space-x-4 p-2 rounded-lg transition-colors hover:bg-surface">
                <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-md object-cover flex-shrink-0" />
                <div className="flex-grow">
                  <h4 className="font-semibold text-sm text-primary-text">{item.name}</h4>
                  <p className="text-primary font-bold text-sm">{(item.price * item.quantity).toFixed(2)} грн</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full text-secondary-text hover:bg-primary/10 transition-colors"><MinusIcon className="h-4 w-4" /></button>
                    <span className="px-3 text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full text-secondary-text hover:bg-primary/10 transition-colors"><PlusIcon className="h-4 w-4" /></button>
                  </div>
                </div>
                <button onClick={() => onRemoveItem(item.id)} className="text-secondary-text hover:text-error p-1">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {items.length > 0 && (
        <div className="p-6 border-t border-primary/20 mt-auto">
          <div className="flex justify-between items-center mb-4 text-lg font-bold">
            <span className="text-secondary-text">Всього:</span>
            <span className="text-primary-text">{totalPrice.toFixed(2)} грн</span>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-gradient-start to-gradient-end text-background font-bold rounded-lg shadow-lg hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all duration-300">
            Оформити замовлення
          </button>
        </div>
      )}
    </aside>
  );
};

export default ShoppingCart;