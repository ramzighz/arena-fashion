import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home } from 'lucide-react';

export function NotFound() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 py-24 text-center space-y-8">
      
      <div className="space-y-3">
        <span className="text-sm font-mono font-bold uppercase text-milano-500 tracking-widest">
          HTTP Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
          Drop Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-milano-500 max-w-md mx-auto">
          The requested route does not exist in our catalog or has been moved to an archived seasonal capsule.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto relative flex items-center">
        <Search className="w-4 h-4 text-milano-400 absolute left-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jeans, tees, sneakers, jackets..."
          className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-milano-300 dark:border-milano-700 bg-white dark:bg-milano-900 text-xs text-milano-900 dark:text-white focus:outline-none focus:border-milano-900 dark:focus:border-white"
        />
        <button
          type="submit"
          className="absolute right-2 px-3 py-1.5 bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-bold text-xs uppercase rounded"
        >
          Search
        </button>
      </form>

      {/* Popular Destination Links */}
      <div className="space-y-4 pt-4">
        <span className="text-xs font-mono font-bold uppercase text-milano-500 block">
          Recommended Destinations:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 inline-flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <Link
            to="/shop?category=jeans"
            className="px-4 py-2 rounded-lg bg-milano-100 dark:bg-milano-800 text-milano-800 dark:text-milano-200 hover:bg-milano-200"
          >
            Jeans
          </Link>
          <Link
            to="/shop?category=bottoms"
            className="px-4 py-2 rounded-lg bg-milano-100 dark:bg-milano-800 text-milano-800 dark:text-milano-200 hover:bg-milano-200"
          >
            Pants &amp; Joggers
          </Link>
          <Link
            to="/shop?category=footwear"
            className="px-4 py-2 rounded-lg bg-milano-100 dark:bg-milano-800 text-milano-800 dark:text-milano-200 hover:bg-milano-200"
          >
            Sneakers &amp; Shoes
          </Link>
        </div>
      </div>
    </main>
  );
}
