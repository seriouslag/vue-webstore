import ProductOptionImage from '@/models/ProductOptionImage';

export default interface ProductOption {
  id: number;
  type: string;
  price: number;
  quantity: number;
  images: ProductOptionImage[];
}
