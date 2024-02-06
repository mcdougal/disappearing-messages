import { Post } from '@/domain/post/server';

export type Comment = Post['comments'][number];
