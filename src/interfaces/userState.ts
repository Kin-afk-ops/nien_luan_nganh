export interface UserState {
  currentUser: {
    _id: string;
    accessToken: string;
    phone: string;
    email: string;
  } | null;
  isFetching: boolean;
  isError: boolean;
}
