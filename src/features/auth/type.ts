export interface SignupPayload {
  email: string;
  password: string;
  type: "employee" | "employer";
}
