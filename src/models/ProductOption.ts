import ProductOptionImage from '@/models/ProductOptionImage';
import ProductSuboption from '@/models/ProductSuboption';

export default interface ProductOption {
  id?: number;
  type: string;
  price: number;
  quantity: number;
  suboptions: ProductSuboption[];
  images: ProductOptionImage[];
}
