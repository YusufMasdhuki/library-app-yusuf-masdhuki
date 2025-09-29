export interface Review {
  id: number;
  user: {
    name: string;
  };
  star: number;
  comment: string;
  createdAt: string;
}

export interface ReviewCardProps {
  review: Review;
}
