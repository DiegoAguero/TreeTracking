export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  id_locality: number;
}

export interface userRegisterResponseOk {
  userCreated: boolean;
  message: string;
  user?: string;
}
export interface userLoginResponseOk {
  message: string;
  user: string;
  userLogged: boolean;
}

export interface responseJWT {
  isVerified: boolean;
  jwt?: string;
  message: string;
}


