import React from 'react';
import { Product, CartItem } from '../types';
import ProductCard from './ProductCard';
import { SearchIcon, HeartIcon } from './icons/IconComponents';

const mockProducts: Product[] = [
  // Шаурма
  { id: 1, name: 'Класична шаурма з куркою', category: 'Шаурма', price: 155.00, imageUrl: '/images/Класична шаурма з куркою-min.png', description: 'Лаваш, куряче філе, свіжі овочі, часниковий соус, кетчуп, сир. Обсмажується до золотистої скоринки.', rating: 4.8, ingredients: ['Лаваш', 'Куряче філе', 'Капуста', 'Помідори', 'Огірки', 'Часниковий соус'], calories: 450 },
  { id: 2, name: 'Шаурма по-лівантськи', category: 'Шаурма', price: 175.00, imageUrl: 'https://picsum.photos/seed/shawarma-lebanese/400/400', description: 'Лаваш, маринована яловичина, маринована цибуля, соус тахіні, овочі гриль.', rating: 4.9, ingredients: ['Лаваш', 'Яловичина', 'Маринована цибуля', 'Соус тахіні', 'Баклажан гриль', 'Перець гриль'], calories: 520 },
  { id: 3, name: 'Гостра шаурма “Техаська”', category: 'Шаурма', price: 165.00, imageUrl: 'https://picsum.photos/seed/shawarma-texas/400/400', description: 'Лаваш, свинина BBQ, соус чилі, сир чеддер, карамелізована цибуля.', rating: 4.7, ingredients: ['Лаваш', 'Свинина BBQ', 'Соус чилі', 'Сир чеддер', 'Карамелізована цибуля', 'Халапеньйо'], calories: 550 },
  { id: 4, name: 'Веганська шаурма', category: 'Шаурма', price: 150.00, imageUrl: 'https://picsum.photos/seed/shawarma-vegan/400/400', description: 'Лаваш, фалафель, хумус, овочі, йогуртово-лимонний соус.', rating: 4.6, ingredients: ['Лаваш', 'Фалафель', 'Хумус', 'Табуле', 'Свіжі овочі', 'Лимонний соус'], calories: 380 },
  { id: 5, name: 'Шаурма “Мікс”', category: 'Шаурма', price: 185.00, imageUrl: 'https://picsum.photos/seed/shawarma-mix/400/400', description: 'Подвійний лаваш, курятина та яловичина, сир моцарела, фірмовий соус. Запікається на грилі.', rating: 5.0, ingredients: ['Подвійний лаваш', 'Курятина', 'Яловичина', 'Сир моцарела', 'Фірмовий соус', 'Картопля фрі'], calories: 620 },
  // Бургери
  { id: 6, name: 'Чізбургер Класичний', category: 'Бургери', price: 160.00, imageUrl: 'https://picsum.photos/seed/burger-classic/400/400', description: 'Булка бриош, біфштекс, 2 слайси сиру чеддер, бургерний соус, овочі.', rating: 4.7, ingredients: ['Булка бриош', 'Яловича котлета', 'Сир чеддер', 'Солоний огірок', 'Цибуля', 'Кетчуп', 'Гірчиця'], calories: 580 },
  { id: 7, name: 'Бургер “Техас BBQ”', category: 'Бургери', price: 180.00, imageUrl: 'https://picsum.photos/seed/burger-texas-bbq/400/400', description: 'Чорна булка, свинячий біфштекс, соус BBQ, карамелізована цибуля.', rating: 4.8, ingredients: ['Чорна булка', 'Свиняча котлета', 'Соус BBQ', 'Карамелізована цибуля', 'Бекон', 'Сир чеддер'], calories: 680 },
  { id: 8, name: 'Бургер “Дабл Чіз”', category: 'Бургери', price: 195.00, imageUrl: 'https://picsum.photos/seed/burger-double-cheese/400/400', description: 'Булка бриош, 2 котлети, сир чеддер, соус. Гаряча подача.', rating: 4.9, ingredients: ['Булка бриош', 'Дві яловичі котлети', 'Подвійний сир чеддер', 'Соус', 'Цибуля', 'Огірок'], calories: 750 },
  { id: 9, name: 'Курячий бургер', category: 'Бургери', price: 155.00, imageUrl: 'https://picsum.photos/seed/burger-chicken/400/400', description: 'Панірована куряча котлета, кунжутна булка, сир, часниковий майонез.', rating: 4.6, ingredients: ['Кунжутна булка', 'Куряча котлета в паніровці', 'Сир', 'Салат Айсберг', 'Часниковий майонез'], calories: 530 },
  { id: 10, name: 'Веггі бургер', category: 'Бургери', price: 150.00, imageUrl: 'https://picsum.photos/seed/burger-veggie/400/400', description: 'Котлета з нуту, цільнозернова булка, соус авокадо, овочі гриль.', rating: 4.5, ingredients: ['Цільнозернова булка', 'Котлета з нуту', 'Соус авокадо', 'Овочі гриль', 'Рукола'], calories: 420 },
  // Напої
  { id: 11, name: 'Лимонад домашній', category: 'Напої', price: 65.00, imageUrl: 'https://picsum.photos/seed/drink-lemonade/400/400', description: 'Освіжаючий домашній лимонад. Об\'єм: 0.5 л.', rating: 4.9, ingredients: ['Вода', 'Свіжий лимонний сік', 'Цукор', 'М\'ята'], calories: 150 },
  { id: 12, name: 'Молочний коктейль ванільний', category: 'Напої', price: 80.00, imageUrl: 'https://picsum.photos/seed/drink-milkshake/400/400', description: 'Класичний ванільний молочний коктейль. Об\'єм: 0.4 л.', rating: 4.8, ingredients: ['Молоко', 'Ванільне морозиво', 'Збиті вершки'], calories: 350 },
  { id: 13, name: 'Холодна кава', category: 'Напої', price: 75.00, imageUrl: 'https://picsum.photos/seed/drink-iced-coffee/400/400', description: 'Прохолодна та бадьора кава. Об\'єм: 0.4 л.', rating: 4.7, ingredients: ['Еспресо', 'Молоко', 'Лід', 'Сироп (за бажанням)'], calories: 120 },
  { id: 14, name: 'Coca-Cola / Fanta / Sprite', category: 'Напої', price: 55.00, imageUrl: 'https://picsum.photos/seed/drink-soda/400/400', description: 'Ваш улюблений газований напій. Об\'єм: 0.33 л.', rating: 4.5, ingredients: ['Газована вода', 'Цукор', 'Ароматизатори'], calories: 140 },
  { id: 15, name: 'Смузі ягідний', category: 'Напої', price: 85.00, imageUrl: 'https://picsum.photos/seed/drink-smoothie/400/400', description: 'Вітамінний смузі зі свіжих ягід. Об\'єм: 0.4 л.', rating: 4.9, ingredients: ['Полуниця', 'Малина', 'Чорниця', 'Банан', 'Йогурт'], calories: 250 },
  // Десерти
  { id: 16, name: 'Чізкейк Нью-Йорк', category: 'Десерти', price: 90.00, imageUrl: 'https://picsum.photos/seed/dessert-cheesecake/400/400', description: 'Ніжний та класичний сирний десерт.', rating: 4.9, ingredients: ['Вершковий сир', 'Пісочне тісто', 'Яйця', 'Цукор', 'Ваніль'], calories: 400 },
  { id: 17, name: 'Брауні з горіхами', category: 'Десерти', price: 85.00, imageUrl: 'https://picsum.photos/seed/dessert-brownie/400/400', description: 'Насичений шоколадний десерт з хрумкими горіхами.', rating: 4.8, ingredients: ['Чорний шоколад', 'Вершкове масло', 'Яйця', 'Цукор', 'Волоські горіхи'], calories: 480 },
  { id: 18, name: 'Маффін ванільний', category: 'Десерти', price: 75.00, imageUrl: 'https://picsum.photos/seed/dessert-muffin/400/400', description: 'Пухкий ванільний маффін із шматочками білого шоколаду.', rating: 4.6, ingredients: ['Борошно', 'Цукор', 'Молоко', 'Яйця', 'Білий шоколад'], calories: 350 },
  { id: 19, name: 'Донат глазурований', category: 'Десерти', price: 70.00, imageUrl: 'https://picsum.photos/seed/dessert-donut/400/400', description: 'Класичний пончик, вкритий солодкою глазур’ю.', rating: 4.5, ingredients: ['Тісто для донатів', 'Цукрова глазур', 'Кондитерська посипка'], calories: 320 },
  { id: 20, name: 'Мус шоколадний', category: 'Десерти', price: 80.00, imageUrl: 'https://picsum.photos/seed/dessert-mousse/400/400', description: 'Легкий та повітряний кремовий десерт з насиченим смаком шоколаду.', rating: 4.7, ingredients: ['Чорний шоколад', 'Вершки', 'Яйця', 'Цукор'], calories: 380 },
  // Соуси
  { id: 21, name: 'Часниковий соус', category: 'Соуси', price: 20.00, imageUrl: 'https://picsum.photos/seed/sauce-garlic/400/400', description: 'На основі майонезу, свіжого часнику та зелені.', rating: 4.9, ingredients: ['Майонез', 'Часник', 'Кріп', 'Спеції'], calories: 150 },
  { id: 22, name: 'Фірмовий бургерний соус', category: 'Соуси', price: 25.00, imageUrl: 'https://picsum.photos/seed/sauce-burger/400/400', description: 'Класичне поєднання майонезу, кетчупу та секретних спецій.', rating: 4.8, ingredients: ['Майонез', 'Кетчуп', 'Гірчиця', 'Спеції'], calories: 180 },
  { id: 23, name: 'Соус BBQ', category: 'Соуси', price: 25.00, imageUrl: 'https://picsum.photos/seed/sauce-bbq/400/400', description: 'Насичений димний, солодко-гострий соус.', rating: 4.7, ingredients: ['Томатна паста', 'Оцет', 'Коричневий цукор', 'Димний ароматизатор'], calories: 120 },
  { id: 24, name: 'Сирний соус', category: 'Соуси', price: 30.00, imageUrl: 'https://picsum.photos/seed/sauce-cheese/400/400', description: 'Густий соус з сиру, вершків та спецій.', rating: 4.9, ingredients: ['Сир чеддер', 'Вершки', 'Молоко', 'Спеції'], calories: 220 },
  { id: 25, name: 'Гострий соус чилі', category: 'Соуси', price: 25.00, imageUrl: 'https://picsum.photos/seed/sauce-chili/400/400', description: 'Пікантний соус на основі томатів, перцю чилі та часнику.', rating: 4.6, ingredients: ['Перець чилі', 'Томати', 'Часник', 'Оцет'], calories: 80 },
];


interface MainContentProps {
  onAddToCart: (product: Product, imageRect: DOMRect, quantity: number) => void;
  onShowDetails: (product: Product) => void;
  searchQuery: string;
  cartItems: CartItem[];
  selectedCategory: string;
  wishlist: number[];
  onToggleWishlist: (productId: number) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onAddToCart, onShowDetails, searchQuery, cartItems, selectedCategory, wishlist, onToggleWishlist }) => {
  const filteredProducts = mockProducts
    .filter(product => {
      if (selectedCategory === 'Головна') return true;
      if (selectedCategory === 'Обране') return wishlist.includes(product.id);
      return product.category === selectedCategory;
    })
    .filter(product => {
      const query = searchQuery.toLowerCase();
      if (!query) return true;
      return (
        product.name.toLowerCase().includes(query) ||
        (selectedCategory === 'Головна' && product.category.toLowerCase().includes(query)) ||
        product.description.toLowerCase().includes(query)
      );
    });
  
  const categoryTitle = selectedCategory === 'Головна' ? 'Наше Меню' : selectedCategory;

  const noResultsMessage = selectedCategory === 'Обране' ? 
    { title: 'Список обраного порожній', description: 'Додайте товари, які вам сподобались, натиснувши на сердечко.' } : 
    { title: 'Нічого не знайдено', description: 'Спробуйте змінити пошуковий запит або вибрати іншу категорію.' };


  return (
    <div className="w-full">
        <h2 className="text-3xl font-extrabold text-primary-text mb-6">{categoryTitle}</h2>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const isInCart = cartItems.some(item => item.id === product.id);
                return <ProductCard 
                          key={product.id} 
                          product={product} 
                          onAddToCart={onAddToCart} 
                          onShowDetails={onShowDetails} 
                          isInCart={isInCart} 
                          searchQuery={searchQuery}
                          wishlist={wishlist}
                          onToggleWishlist={onToggleWishlist}
                       />
              })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center text-secondary-text">
            {selectedCategory === 'Обране' ? <HeartIcon className="h-16 w-16 mb-4 text-primary/50 fill-none" /> : <SearchIcon className="h-16 w-16 mb-4 text-primary/50" />}
            <p className="font-semibold text-primary-text text-lg">{noResultsMessage.title}</p>
            <p className="text-sm">{noResultsMessage.description}</p>
          </div>
        )}
    </div>
  );
};

export default MainContent;