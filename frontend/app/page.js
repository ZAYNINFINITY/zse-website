'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { productsAPI } from '@/lib/api';
import Image from 'next/image';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getAll({ featured: 'true', limit: 6 });
      setFeaturedProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] bg-gradient-to-r from-black to-gray-900">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/assets/extra/main slider.png"
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">Welcome to ZSE Store</h1>
              <p className="text-xl mb-8">Your trusted source for premium sanitary and electric solutions</p>
              <Link
                href="/products"
                className="bg-yellow-400 text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition inline-block"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No featured products available</p>
          )}
        </section>

        {/* Categories */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { name: 'Taps', image: '/assets/products/taps.jpg', href: '/products?category=Taps' },
                { name: 'Basins', image: '/assets/products/basins.jpeg', href: '/products?category=Basins' },
                { name: 'Toilets', image: '/assets/products/toilets.jpeg', href: '/products?category=Toilets' },
                { name: 'Kitchen Ware', image: '/assets/products/kitchenware.jpeg', href: '/products?category=Kitchen Ware' },
                { name: 'Mirrors', image: '/assets/products/mirrors.jpeg', href: '/products?category=Mirrors' },
                { name: 'Pipes & Fitting', image: '/assets/products/pipes and fitting.jpeg', href: '/products?category=Pipes & Fitting' },
                { name: 'Water Geyser', image: '/assets/products/geysers.jpeg', href: '/products?category=Water Geyser' }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

