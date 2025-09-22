export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN'; // bisa tambah union kalau ada role lain
  createdAt: string;
}

export interface LoanStats {
  borrowed: number;
  late: number;
  returned: number;
  total: number;
}

export interface MeData {
  profile: UserProfile;
  loanStats: LoanStats;
  reviewsCount: number;
}

export interface GetMeSuccessResponse {
  success: true;
  message: string;
  data: MeData;
}

export interface GetMeErrorResponse {
  success: false;
  message: string;
}

// request body
export interface UpdateMeRequest {
  name: string;
}

// success response
export interface UpdateMeSuccessResponse {
  success: true;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
  };
}

// error response
export interface UpdateMeErrorResponse {
  success: false;
  message: string;
}
