import Product from '@/models/Product';

export default interface IApi {
  getProductByProductId(id: number): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getAllProductsByPage(pageNum: number, itemsPerPage: number): Promise<Product[]>;
  searchProductByName(name: string): Promise<Product[]>;
}
