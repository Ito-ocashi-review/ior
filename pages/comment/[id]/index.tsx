import React from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardHeader, Grid, Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import urljoin from 'url-join';

type review = {
  _id: string,
  sweetId: string,
  comment: string,
  evaluation: number,
  userName: string,
}

type Props = {
  reviews: review[]
}

const Comment: React.FC<Props> = ({ reviews }) => {
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

  const classes = useStyles();

  const reviewsList = reviews.map((review) => {
    return (
      <Grid container justify="center" className={classes.cardContainer}>
        <Grid container item xs={6} spacing={3}>
          <Card key={review._id} className={classes.card}>
            <CardHeader
              title={review.userName}
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

  return (
    <div className={classes.root}>
      {reviewsList}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await Axios.get(urljoin(process.env.API_ROUTES_BASE_PATH, '/api/reviews/', params.id));
  const reviews = res.data.reviews;
  const reviewsWithUserName = await Promise.all(reviews.map(async(review) => {
    const user = await Axios.get(urljoin(process.env.API_ROUTES_BASE_PATH, '/api/users', review.userId));
    const userName = user.data.user.displayName;
    review.userName = userName;
    return review;
  }));
  // データをprops経由でページに渡します。
  return { props: { reviews: reviewsWithUserName } };
}

export default Comment;
