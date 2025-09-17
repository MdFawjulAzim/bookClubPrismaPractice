import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedPage from "./components/pages/FeedPage";
import BooksPage from "./components/pages/BooksPage";
import AddBook from "./components/pages/AddBook";
import BookDetail from "./components/pages/BookDetail";
import UsersPage from "./components/pages/UsersPage";
import UserProfile from "./components/pages/UserProfile";
import SearchPage from "./components/pages/SearchPage";
import Nav from "./components/component/Nav";
import AddUser from "./components/pages/AddUser";
import UpdateUser from "./components/pages/UpdateUser";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/new" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/users/new" element={<AddUser />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />

        </Routes>
      </main>
    </div>
  );
}
