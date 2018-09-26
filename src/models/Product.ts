import ProductOption from '@/models/ProductOption';

export default interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productOptions: ProductOption[];
}
