export interface UserState {
  currentUser: {
    accessToken: string;
    phone: string;
    email: string;
  } | null;
  isFetching: boolean;
  isError: boolean;
}
