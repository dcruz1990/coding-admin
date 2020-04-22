import { Photo } from './Photo';

export interface Product {
    id: number,
    name: string,
    type: string,
    url: string,
    productPhoto: Photo
    productDescription: string,
}
