import React from 'react';
import { HomeIcon, BurgerIcon, DrinkIcon, DessertIcon, SettingsIcon, StoreIcon, XIcon, ShawarmaIcon, SauceIcon, HeartIcon } from './icons/IconComponents';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, active = false, onClick, count }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick?.();
    }}
    className={`
      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 group relative
      transform-gpu hover:scale-105
      ${
        active
          ? 'text-primary font-semibold drop-shadow-[0_0_5px_theme(colors.primary)]'
          : 'text-secondary-text hover:text-highlight hover:drop-shadow-[0_0_5px_theme(colors.highlight)]'
      }
    `}
  >
    {icon}
    <span className="ml-3">{label}</span>
    {count > 0 && (
      <span className="ml-auto bg-primary text-background text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        {count}
      </span>
    )}
    
    {/* Underline for active state */}
    {active && (
      <span className="absolute bottom-1.5 left-4 h-0.5 w-[calc(100%-2rem)] bg-gradient-to-r from-gradient-start to-gradient-end rounded-full"></span>
    )}
    
    {/* Underline animation for hover state on non-active links */}
    {!active && (
      <span className="
        absolute bottom-1.5 left-4 h-0.5 w-[calc(100%-2rem)] bg-highlight
        transform scale-x-0 group-hover:scale-x-100
        transition-transform duration-300 ease-in-out origin-left
      "></span>
    )}
  </a>
);

interface NavigationProps {
  onClose?: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  wishlistCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ onClose, selectedCategory, onSelectCategory, wishlistCount }) => {
  const categories = [
    { name: 'Головна', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'Обране', icon: <HeartIcon className="h-5 w-5 fill-none" /> },
    { name: 'Бургери', icon: <BurgerIcon className="h-5 w-5" /> },
    { name: 'Напої', icon: <DrinkIcon className="h-5 w-5" /> },
    { name: 'Десерти', icon: <DessertIcon className="h-5 w-5" /> },
    { name: 'Шаурма', icon: <ShawarmaIcon className="h-5 w-5" /> },
    { name: 'Соуси', icon: <SauceIcon className="h-5 w-5" /> },
  ];

  return (
    <aside className="w-full h-full bg-background border-r border-primary/10 flex flex-col">
      <div className="p-4 md:p-6 flex items-center justify-between border-b border-primary/10">
        <div className="flex items-center">
          <StoreIcon className="h-8 w-8 text-primary" />
          <h1 className="ml-3 text-xl font-bold text-primary-text">ШВИДКА ХАВКА</h1>
        </div>
        {onClose && (
            <button onClick={onClose} className="md:hidden p-2 text-secondary-text hover:text-highlight">
                <XIcon className="h-6 w-6" />
            </button>
        )}
      </div>
      <div className="p-4 md:p-6 flex-grow">
        <nav className="space-y-2">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              icon={category.icon}
              label={category.name}
              active={selectedCategory === category.name}
              onClick={() => onSelectCategory(category.name)}
              count={category.name === 'Обране' ? wishlistCount : undefined}
            />
          ))}
        </nav>
      </div>
       <div className="p-4 md:p-6 border-t border-primary/10">
          <NavLink icon={<SettingsIcon className="h-5 w-5" />} label="Налаштування" />
       </div>
    </aside>
  );
};

export default Navigation;