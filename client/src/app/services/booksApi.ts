import { Book } from "../../types";
import { api } from "./api";

export const booksApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllBooks: builder.query<Book[], void>({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
    }),

    getBookById: builder.query<Book, string>({
      query: id => ({
        url: `/books/${id}`,
        method: "GET",
      }),
    }),

    addBook: builder.mutation<Book, Book>({
      query: book => ({
        url: `/books`,
        method: "POST",
        body: book,
      }),
    }),

    updateBook: builder.mutation<string, Book>({
      query: book => ({
        url: `/books/${book.id}`,
        method: "PUT",
        body: book,
      }),
    }),

    deleteBook: builder.mutation<string, string>({
      query: id => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useLazyGetAllBooksQuery,
  useGetBookByIdQuery,
  useLazyGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

export const {
  endpoints: { getAllBooks, getBookById, addBook, updateBook, deleteBook },
} = booksApi;
