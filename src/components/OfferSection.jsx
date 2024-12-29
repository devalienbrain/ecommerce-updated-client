// OfferSection.jsx
import React from "react";

const OfferSection = () => {
  const offers = [
    {
      title: "Summer Sale",
      description: "Up to 50% off on summer collection.",
      discount: 50,
      image: "https://i.ibb.co.com/2kjSqvt/Summer-sale.png",
    },
    {
      title: "Buy 1 Get 1 Free",
      description: "Limited time offer on selected items.",
      discount: 100,
      image: "https://i.ibb.co.com/3rgYsyk/shopping.png",
    },
    {
      title: "Winter Specials",
      description: "Exclusive deals on winter wear.",
      discount: 40,
      image: "https://i.ibb.co.com/vwKwyFx/model.png",
    },
  ];
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">
                {offer.title}
              </h3>
              <p className="text-gray-600 mt-2">{offer.description}</p>
              <p className="text-green-500 font-bold mt-4">
                {offer.discount}% Off
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
