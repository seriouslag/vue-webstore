import {allUrl, apiUrl, productUrl, searchUrl} from '@/api/endpoints';
import Fetch from '@/utils/fetch';
import Product from '@/models/Product';
import IApi from '@/api/IApi';

export default class Api implements IApi {
  getAllProducts(): Promise<Product[]> {
    return Fetch.get<Product[]>(`${apiUrl}/${productUrl}/${allUrl}`, {});
  }

  getAllProductsByPage(pageNum: number, itemsPerPage: number): Promise<Product[]> {
    return Fetch.get<Product[]>(
      `${apiUrl}/${searchUrl}?page=${pageNum}+itemsPerPage=${itemsPerPage}`, {}
      );
  }

  getProductByProductId(id: number): Promise<Product> {
    return Fetch.get<Product>(`${apiUrl}/${productUrl}/${id}`, {});
  }

  searchProductByName(name: string): Promise<Product[]> {
    return Fetch.get<Product[]>(`${apiUrl}/${searchUrl}?productName=${name}`, {});
  }
}
