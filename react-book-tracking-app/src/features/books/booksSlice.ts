import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types";
import { booksApi } from "../../app/services/booksApi";
import { RootState } from "../../app/store";

interface InitialState {
  books: Book[] | null;
}

const initialState: InitialState = {
  books: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    logout: () => initialState,
  },

  extraReducers: builder => {
    builder.addMatcher(
      booksApi.endpoints.getAllBooks.matchFulfilled,
      (state, action) => {
        state.books = action.payload;
      },
    );
  },
});

export default booksSlice.reducer;

export const selectBooks = (state: RootState) => state.books.books;
