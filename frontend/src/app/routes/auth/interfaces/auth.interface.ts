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


