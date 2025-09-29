import { Book } from '@/types/book-type';
import { BookReview } from '@/types/review-type';

export interface BookInfoSectionProps {
  book: Book;
}

export interface BreadcrumbsProps {
  currentTitle: string;
  category?: { id: number; name: string };
}

export interface RelatedBooksSectionProps {
  relatedBooks: Book[];
}

export interface ReviewsSectionProps {
  reviews: BookReview[];
  rating: number;
  reviewCount: number;
}
