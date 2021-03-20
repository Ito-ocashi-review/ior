import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardHeader, Grid, Typography, Paper,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { admin } from '../../../firebase-admin';
import firebase from '../../../Firebase';

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
    userName: string,
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

export async function getServerSideProps() {
  // 外部APIからデータを取得します。
  admin.auth()
    .getUser('1g9pg28YcHejj31jzJ7hwj6N7Ej1')
    .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      console.log('userRecord', userRecord.providerData[0].displayName);
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
  const data = 'hooho';
  // データをprops経由でページに渡します。
  return { props: { data } };
}

export default Comment;
