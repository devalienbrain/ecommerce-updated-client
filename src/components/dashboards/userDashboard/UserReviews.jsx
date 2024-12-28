import React, { useState, useEffect } from "react";
import { useUser } from "../../../provider/UserContext";
import useAxios from "../../../hooks/useAxios";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useUser();
  const userId = user?.id;
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance
      .get(`/api/reviews?userId=${userId}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [userId]);

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        My Reviews
      </h1>
      <hr className="mb-7" />
      <div className="grid grid-cols-1 gap-4">
        {reviews?.map((review) => (
          <div key={review?.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{review?.product?.name}</h3>
            <p>
              Rating: <strong>{review?.rating}/5</strong>{" "}
            </p>
            <p>
              Comment: <strong>{review?.comment}</strong>{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
