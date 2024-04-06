import { Dayjs } from "dayjs";

export type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  books: Book[];
};

export type Book = {
  id: string;
  title: string;
  author: string;
  img?: string;
  rating: number;
  readDate: Date | Dayjs;
  user: User;
  userId: string;
};

export type ErrorWithMessage = {
  status: number;
  data: { message: string };
};
