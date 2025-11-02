import React, { useState, useEffect } from 'react';
import { XIcon, CheckCircleIcon } from './icons/IconComponents';

interface CheckoutModalProps {
  onClose: () => void;
  onSubmitOrder: () => void;
  isClosing: boolean;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onSubmitOrder, isClosing }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: '',
    deliveryTime: '',
    comments: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isClosing && isSubmitted) {
      // Allow re-opening modal for a new order
      setIsSubmitted(false);
      setFormData({
        name: '', phone: '', address: '', paymentMethod: '', deliveryTime: '', comments: ''
      });
    }
  }, [isClosing]);


  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    const phoneRegex = /^\+380\d{9}$/;

    if (!formData.phone) {
      newErrors.phone = "Номер телефону є обов'язковим.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Введіть номер у форматі +380xxxxxxxxx.';
    }

    if (!formData.address.trim()) {
      newErrors.address = "Адреса доставки є обов'язковою.";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Будь ласка, оберіть спосіб оплати.";
    }

    if (!formData.deliveryTime) {
      newErrors.deliveryTime = "Будь ласка, оберіть час доставки.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if(errors[name as keyof typeof errors]) {
        setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder();
      setIsSubmitted(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm ${isClosing ? 'animate-backdrop-fade-out' : 'animate-backdrop-fade-in'}`}
        aria-hidden="true"
      />

      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden ${isClosing ? 'animate-modal-spring-out' : 'animate-modal-spring-in'}`}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/50 transition-colors"
          aria-label="Закрити"
        >
          <XIcon className="h-6 w-6" />
        </button>

        {isSubmitted ? (
          <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center">
            <CheckCircleIcon className="h-20 w-20 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold text-primary-text mb-2">Дякуємо за замовлення!</h2>
            <p className="text-secondary-text mb-8">Наш менеджер скоро зв'яжеться з вами для підтвердження деталей.</p>
            <button
              onClick={onClose}
              className="w-full max-w-xs py-3 bg-gradient-to-r from-gradient-start to-gradient-end text-background font-bold rounded-lg shadow-lg hover:shadow-gold-glow transition-all duration-300"
            >
              Чудово!
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 md:p-8 border-b border-primary/20 flex-shrink-0">
              <h2 className="text-2xl font-bold text-primary-text">Оформлення замовлення</h2>
            </div>

            <form onSubmit={handleSubmit} noValidate className="p-6 md:p-8 flex-grow overflow-y-auto space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-text mb-1.5">Ім'я</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 bg-surface text-primary-text placeholder-secondary-text border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary-text mb-1.5">Номер телефону <span className="text-error">*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+380xxxxxxxxx" required className={`w-full px-3 py-2 bg-surface text-primary-text placeholder-secondary-text border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.phone ? 'border-error ring-error/50' : 'border-primary/20'}`} />
                {errors.phone && <p className="text-error text-xs mt-1.5">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-primary-text mb-1.5">Адреса доставки <span className="text-error">*</span></label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="м. Київ, вул. Хрещатик, 24" required className={`w-full px-3 py-2 bg-surface text-primary-text placeholder-secondary-text border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.address ? 'border-error ring-error/50' : 'border-primary/20'}`} />
                {errors.address && <p className="text-error text-xs mt-1.5">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-primary-text mb-1.5">Спосіб оплати <span className="text-error">*</span></label>
                <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className={`w-full px-3 py-2 bg-surface text-primary-text border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.paymentMethod ? 'border-error ring-error/50' : 'border-primary/20'}`}>
                  <option value="" disabled>Оберіть...</option>
                  <option value="cash">Готівкою при отриманні</option>
                  <option value="card_online">Карткою онлайн</option>
                  <option value="card_terminal">Карткою кур'єру</option>
                </select>
                {errors.paymentMethod && <p className="text-error text-xs mt-1.5">{errors.paymentMethod}</p>}
              </div>
              
              <div>
                <label htmlFor="deliveryTime" className="block text-sm font-medium text-primary-text mb-1.5">Час доставки <span className="text-error">*</span></label>
                <select id="deliveryTime" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required className={`w-full px-3 py-2 bg-surface text-primary-text border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors.deliveryTime ? 'border-error ring-error/50' : 'border-primary/20'}`}>
                  <option value="" disabled>Оберіть...</option>
                  <option value="asap">Якнайшвидше</option>
                  <option value="1h">Протягом 1 години</option>
                  <option value="2h">Протягом 2 годин</option>
                  <option value="custom">Вказати час</option>
                </select>
                {errors.deliveryTime && <p className="text-error text-xs mt-1.5">{errors.deliveryTime}</p>}
              </div>

              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-primary-text mb-1.5">Коментар до замовлення</label>
                <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={3} placeholder="Наприклад: 'без цибулі, будь ласка'" className="w-full px-3 py-2 bg-surface text-primary-text placeholder-secondary-text border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"></textarea>
              </div>
            </form>
            
            <div className="p-6 md:p-8 border-t border-primary/20 mt-auto flex-shrink-0">
              <button 
                type="submit"
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-gradient-start to-gradient-end text-background font-bold rounded-lg shadow-lg hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all duration-300"
              >
                Підтвердити замовлення
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
