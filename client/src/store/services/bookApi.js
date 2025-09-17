import { api } from "./api";

export const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getBook: build.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    createBook: build.mutation({
      query: (data) => ({ url: "/books", method: "POST", body: data }),
      invalidatesTags: ["Books"],
    }),
    updateBook: build.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Books", id }],
    }),
    deleteBook: build.mutation({
      query: (id) => ({ url: `/books/${id}`, method: "DELETE" }),
      invalidatesTags: ["Books"],
    }),
    searchBooks: build.query({
      query: (genre) => `/books/search?genre=${genre}`,
      providesTags: ["Books"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useSearchBooksQuery,
} = bookApi;
