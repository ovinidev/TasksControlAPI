export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
}

export interface ILoginUserDTO {
  email: string;
  password: string;
}

export interface IUserResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  avatarUrl: string | null;
}
