import React from "react";

const products = [
  {
    id: 1,
    title: "Trending Smart Watch Series 9",
    category: "GADGETS",
    price: "৳ ২,৫০০",
    image: "https://via.placeholder.com/150",
    link: "https://www.daraz.com.bd",
  },
  {
    id: 2,
    title: "Wireless Bluetooth Earbuds",
    category: "ELECTRONICS",
    price: "৳ ১,২০০",
    image: "https://via.placeholder.com/150",
    link: "https://www.daraz.com.bd",
  },
];

export default function ShopDeals() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-center mb-1 text-gray-900">
        🔥 TaskFlow Hot Deals & Offers
      </h2>
      <p className="text-xs text-center text-gray-500 mb-6">
        সেরা অফার ও ডিসকাউন্টে আপনার পছন্দের পণ্যটি বেছে নিন!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-36 object-cover rounded-lg mb-3"
              />
              <span className="text-[10px] font-semibold text-orange-500 tracking-wide uppercase">
                {product.category}
              </span>
              <h3 className="text-sm font-semibold text-gray-800 mt-1">
                {product.title}
              </h3>
              <p className="text-xs font-bold text-gray-700 mt-1">
                {product.price}
              </p>
            </div>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 rounded-lg text-center transition-colors block"
            >
              Order Now (Daraz)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
