import ProductOptionImage from '@/models/ProductOptionImage';

export default interface ProductOption {
  productOptionsId: number;
  productType: string;
  productPrice: number;
  productQuantity: number;
  productOptionImages: ProductOptionImage[];
}
