export interface IDecodedToken {
  id: string | null;
  name: string | null;
  role: string | null;
  iat: number | null;
  exp: number | null;
}