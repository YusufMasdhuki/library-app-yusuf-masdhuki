export interface Author {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAuthorsSuccessResponse {
  success: true;
  message: string; // "Success"
  data: {
    authors: Author[];
  };
}

export interface GetAuthorsErrorResponse {
  success: false;
  message: string;
}
