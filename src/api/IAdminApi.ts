import Product from '@/models/Product';
import IApi from './IApi';

export default interface IAdminApi extends IApi {
  addProduct(product: Product): Promise<boolean>;
  updateProduct(product: Product): Promise<boolean>;
  deleteProduct(id: number): Promise<boolean>;
}
