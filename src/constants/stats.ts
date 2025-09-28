import { Book } from '@/types/book-type';

// stats.ts
export interface BookStat {
  label: string;
  value: string | number;
}

export const getBookStats = (book: Book): BookStat[] => [
  { label: 'Published Year', value: book.publishedYear },
  { label: 'Available Copies', value: book.availableCopies },
  { label: 'Reviews', value: book.reviewCount },
];
