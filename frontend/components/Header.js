'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { getCartItemsCount } = useCart();
  const cartCount = getCartItemsCount();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/logo.png"
              alt="ZSE Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-xl font-bold text-yellow-400">ZSE Store</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <input
              type="text"
              placeholder="Search Entire Store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-6 py-2 rounded-r-lg hover:bg-yellow-500 transition"
            >
              <FiSearch className="inline" />
            </button>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-800 rounded-lg transition"
            >
              <FiShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg transition">
                  <FiUser className="text-2xl" />
                  <span className="hidden md:inline">{user?.name?.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition font-semibold"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
            >
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 py-4 border-t border-gray-800">
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <div className="relative group">
            <Link href="/products" className="hover:text-yellow-400 transition">
              Products
            </Link>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link href="/products?category=Taps" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                Taps
              </Link>
              <Link href="/products?category=Basins" className="block px-4 py-2 hover:bg-gray-100">
                Basins
              </Link>
              <Link href="/products?category=Toilets" className="block px-4 py-2 hover:bg-gray-100">
                Toilets
              </Link>
              <Link href="/products?category=Kitchen Ware" className="block px-4 py-2 hover:bg-gray-100">
                Kitchen Ware
              </Link>
              <Link href="/products?category=Mirrors" className="block px-4 py-2 hover:bg-gray-100">
                Mirrors
              </Link>
              <Link href="/products?category=Pipes & Fitting" className="block px-4 py-2 hover:bg-gray-100">
                Pipes & Fitting
              </Link>
              <Link href="/products?category=Water Geyser" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg">
                Water Geyser
              </Link>
            </div>
          </div>
          <Link href="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>
          <div className="ml-auto text-sm">
            <span>Order Hotline: </span>
            <a href="tel:+923185929927" className="text-yellow-400 hover:underline">
              +92-3185929927
            </a>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search Entire Store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </form>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-2 hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-4 py-2 hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

