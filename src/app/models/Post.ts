import { Tag } from './Tag';

export interface Post {
    id: number,
    title: string,
    description: string,
    text: string,
    tags?: Tag[]
}