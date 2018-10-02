import ProductOption from '@/models/ProductOption';

export default interface Product {
  id: number;
  name: string;
  description: string;
  options: ProductOption[];
  defaultImageUrl: string;
}
