export interface BookCardProps {
  id: number;
  title: string;
  coverImage?: string | null;
  authorName: string;
  authorId: number;
  rating: number;
}
