import { Photo } from './Photo';
import { Post } from './Post';

export interface User {
    id: number;
    username: string;
    fullname: string;
    phone: number;
    email: string;
    resume: string;
    fullresume: string;
    photos?: Photo[];
    posts?: Post[];
}
