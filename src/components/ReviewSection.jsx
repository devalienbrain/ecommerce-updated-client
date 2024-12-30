// ReviewSection.jsx
import React, { useEffect, useState } from "react";
import "./animate.css";
import Title from "./shared/Title";
const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Fake review data
    const fakeReviews = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        stars: 5,
        review:
          "Amazing service! Highly recommend for anyone looking to buy land or flats.",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        stars: 4,
        review:
          "Great experience overall, but there was a slight delay in processing.",
      },
      {
        name: "Chris Johnson",
        email: "chris.j@example.com",
        stars: 5,
        review:
          "The best property buying experience I have ever had. Excellent team!",
      },
      {
        name: "Emily Brown",
        email: "emily.b@example.com",
        stars: 3,
        review:
          "Good service, but the property details were slightly inaccurate.",
      },
    ];

    setReviews(fakeReviews);
  }, []);

  return (
    <div className="py-20">
      <Title title="Customer Reviews" />
      <div
        className="overflow-hidden relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`flex gap-6 transition-transform duration-300 ${
            paused ? "" : "animate-scroll"
          }`}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[300px] bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => setPaused(!paused)}
            >
              <h3 className="text-cyan-500 font-semibold text-lg">
                {review.name}
              </h3>
              <p className="text-green-500 text-sm mb-2">{review.email}</p>
              <div className="flex mb-3">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
