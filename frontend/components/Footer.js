import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">ZSE Store</h3>
            <p className="text-gray-400">
              Your trusted source for premium sanitary and electric solutions in Pakistan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-yellow-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-yellow-400 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Taps" className="text-gray-400 hover:text-yellow-400 transition">
                  Taps
                </Link>
              </li>
              <li>
                <Link href="/products?category=Basins" className="text-gray-400 hover:text-yellow-400 transition">
                  Basins
                </Link>
              </li>
              <li>
                <Link href="/products?category=Toilets" className="text-gray-400 hover:text-yellow-400 transition">
                  Toilets
                </Link>
              </li>
              <li>
                <Link href="/products?category=Kitchen Ware" className="text-gray-400 hover:text-yellow-400 transition">
                  Kitchen Ware
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <FiPhone />
                <a href="tel:+923185929927" className="hover:text-yellow-400 transition">
                  +92-3185929927
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FiMail />
                <a href="mailto:info@zse.com" className="hover:text-yellow-400 transition">
                  info@zse.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <FiMapPin className="mt-1" />
                <span>Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ZSE Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


