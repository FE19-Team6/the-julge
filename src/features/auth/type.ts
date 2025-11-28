export interface SignupPayload {
  email: string;
  password: string;
  type: "employee" | "employer";
}

export type User = {
  id: string;
  email: string;
  type: "employee" | "employer";
  name?: string;
  phone?: string;
};

export type LoginResponse = {
  item: {
    token: string;
    user: {
      item: User;
      href: string;
    };
  };
  links: [];
};

export type LoginResult = {
  token: string;
  user: User;
};
