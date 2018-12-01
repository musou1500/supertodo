export interface SignupData {
  name: string;
  screenId: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  screenId: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: User;
}

export interface Credential {
  screenId: string;
  password: string;
}

export interface Tag {
  id: number;
  name: string;
  color?: string;
}

export interface NewTag {
  name: string;
  color?: string;
}

export interface Task {
  id: number;
  name: string;
  tags: Tag[];
  assignee: User | null;
  author: User | null;
}
export interface NewTask {
  name: string;
  tags?: number[];
  assigneeId?: number;
}

export interface PaginateOptions {
  limit?: number;
  minId?: number;
  maxId?: number;
}
