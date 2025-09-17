// src/components/Nav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Book, Users, Search } from "lucide-react";

export default function Nav() {
  const location = useLocation();

  const navItems = [
    { name: "Feed", path: "/", icon: <Home size={20} /> },
    { name: "Books", path: "/books", icon: <Book size={20} /> },
    { name: "Users", path: "/users", icon: <Users size={20} /> },
    { name: "Search", path: "/search", icon: <Search size={20} /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-primary">Book Club</h1>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition ${location.pathname === item.path ? "bg-gray-100 font-semibold" : ""
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
