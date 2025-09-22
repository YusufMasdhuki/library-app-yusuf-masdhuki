export interface DeleteBookSuccessResponse {
  success: true;
  message: string; // "Deleted"
}

export interface DeleteBookErrorResponse {
  success: false;
  message: string; // "Has active loans" | "Not found" | error message lain
}
