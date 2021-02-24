import React from 'react';
import { useRouter } from 'next/router';

const Comment: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Comment: {id}</p>;
};

export default Comment;
