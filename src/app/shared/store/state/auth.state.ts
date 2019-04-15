

export interface AuthState{
  correo: string;
  clave: string;
}

export const initialAuthState: AuthState={
  correo: null,
  clave: null
}
