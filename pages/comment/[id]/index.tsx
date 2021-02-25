import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';

const Comment: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  type review = {
    _id: string,
    sweetId: string,
    comment: string,
    evaluation: number,
  }

  const [reviews, setReviews] = useState<review[]>([]);

  useEffect(() => {
    const getReviews = async() => {
      const uri = `/api/reviews/${id}`;
      const { data } = await Axios.get(uri);
      setReviews(data.reviews);
    };
    getReviews();
  }, [id]);

  const reviewsList = reviews.map((review) => {
    return <h1 key={review._id}>{review.comment}</h1>;
  });

  return <>{reviewsList}</>;
};

export default Comment;
