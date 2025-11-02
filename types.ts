
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  rating: number;
  ingredients: string[];
  calories: number;
}

export interface CartItem extends Product {
  quantity: number;
}