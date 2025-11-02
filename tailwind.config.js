// This file is used to extend the default Tailwind CSS configuration.
// By defining our custom theme here, we can easily reuse colors, fonts, etc., throughout the app.

tailwind.config = {
  theme: {
    extend: {
      colors: {
        'background': '#FFFFFF',      // Білий фон
        'primary': '#B98A27',         // Трохи темніший золотий для кращого контрасту
        'highlight': '#D4AF37',       // Оригінальний золотий як підсвічування
        'primary-text': '#1F2937',     // Темно-сірий основний текст (gray-800)
        'secondary-text': '#6B7280',   // Cірий другорядний текст (gray-500)
        'error': '#DC2626',           // Яскравіший червоний (red-600)
        'gradient-start': '#C19A34',
        'gradient-end': '#D4AF37',
        'surface': '#F9FAFB',         // Дуже світло-сірий для карток (gray-50)
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Сучасний шрифт без засічок
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.4)',
        'gold-glow-light': '0 0 8px rgba(212, 175, 55, 0.3)',
      },
      keyframes: {
        'gold-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.4), inset 0 0 5px rgba(212, 175, 55, 0.2), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
          '50%': {
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.6), inset 0 0 8px rgba(212, 175, 55, 0.3), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
        'cart-glow-pulse': {
            '0%, 100%': {
                boxShadow: '0 0 18px rgba(212, 175, 55, 0.5), inset 0 0 6px rgba(212, 175, 55, 0.25), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
            '50%': {
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.7), inset 0 0 10px rgba(212, 175, 55, 0.4), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
        },
        'add-to-cart-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-in-from-right': {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
        'slide-out-to-right': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(100%)' },
        },
        'backdrop-fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'backdrop-fade-out': {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
        'modal-fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'modal-spring-in': {
          'from': { opacity: '0', transform: 'scale(0.8)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        'modal-spring-out': {
          'from': { opacity: '1', transform: 'scale(1)' },
          'to': { opacity: '0', transform: 'scale(0.9)' },
        },
      },
      animation: {
        'gold-pulse': 'gold-pulse 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        'cart-glow': 'cart-glow-pulse 2s infinite ease-in-out',
        'add-to-cart-pop': 'add-to-cart-pop 0.4s ease-in-out',
        'cart-open': 'slide-in-from-right 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'cart-close': 'slide-out-to-right 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards',
        'backdrop-fade-in': 'backdrop-fade-in 0.4s ease-out forwards',
        'backdrop-fade-out': 'backdrop-fade-out 0.3s ease-in forwards',
        'modal-fade-in': 'modal-fade-in 0.3s ease-out forwards',
        'modal-spring-in': 'modal-spring-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'modal-spring-out': 'modal-spring-out 0.3s ease-out forwards',
      }
    }
  }
}