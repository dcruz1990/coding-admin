import { Photo } from './Photo';

export interface Product {
    id?: string,
    name: string,
    type: string,
    url: string,
    productPhoto?: Photo
    productDescription: string,
    userId: number
}
