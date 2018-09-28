import ProductOption from '@/models/ProductOption';

export default interface CartItem {
  productOption: ProductOption;
  productName: string;
  productId: number;
  quantity: number;
}
