import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-toastify';
import { FiShoppingCart } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/products/${product.slug || product._id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={product.images?.[0]?.url || '/assets/products/default.jpg'}
            alt={product.images?.[0]?.alt || product.name}
            fill
            className="object-cover"
          />
          {product.featured && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
              Featured
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug || product._id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-yellow-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-yellow-600">
            PKR {product.price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2"
          >
            <FiShoppingCart />
            <span>Add</span>
          </button>
        </div>
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-red-600 text-xs mt-2">Only {product.stock} left!</p>
        )}
        {product.stock === 0 && (
          <p className="text-red-600 text-xs mt-2">Out of Stock</p>
        )}
      </div>
    </div>
  );
}


