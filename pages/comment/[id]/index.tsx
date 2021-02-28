import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardHeader, Grid, Typography, Paper,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const Comment: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    card: {
      width: '100%',
    },
    cardContainer: {
      margin: '150px 0',
    },
  }));

  type review = {
    _id: string,
    sweetId: string,
    comment: string,
    evaluation: number,
  }

  const [reviews, setReviews] = useState<review[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const getReviews = async() => {
      const uri = `/api/reviews/${id}`;
      const { data } = await Axios.get(uri);
      setReviews(data.reviews);
    };
    getReviews();
  }, [id]);

  const reviewsList = reviews.map((review) => {
    return (
      <Grid container justify="center" className={classes.cardContainer}>
        <Grid container xs={6} spacing={3}>
          <Card key={review._id} className={classes.card}>
            <CardHeader
              title="username"
            />
            <CardContent>
              <Rating
                precision={0.1}
                readOnly
                value={review.evaluation}
              />
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {review.comment}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  });

  // return (
  //   <Grid
  //     container
  //     alignItems="center"
  //     className={classes.top}
  //   >
  //     {reviewsList}
  //   </Grid>
  // );

  return (
    <div className={classes.root}>
      {reviewsList}
    </div>
  );
};

export default Comment;
