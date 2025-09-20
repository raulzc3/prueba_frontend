//API types
export interface User {
  login: {
    uuid: string;
    username: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    country: string;
  };
}

export interface ApiResponse {
  results: User[];
}
