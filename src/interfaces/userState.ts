export interface UserState {
  currentUser: {
    _id: string;
    accessToken: string;
    phone: string;
    email: string;
    firebase: boolean;
  } | null;
  isFetching: boolean;
  isError: boolean;
}
