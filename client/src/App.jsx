import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedPage from "./components/pages/FeedPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        {/* 
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/new" element={<AddBook />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/search" element={<SearchPage />} /> 
        */}
      </Routes>
    </BrowserRouter>
  );
}
