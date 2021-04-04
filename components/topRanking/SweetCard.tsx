import React from 'react';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import Link from 'next/link';

const useStyles = makeStyles({
  cards: {
    margin: '30px 0',
  },
  cardContent: {
    color: 'white',
    backgroundColor: '#270000',
  },
  cardHeader: {
    textAlign: 'left',
  },
  cardRating: {
    textAlign: 'right',
  },
  cardButton: {
    color: '#FFAA01',
    margin: '15px 0',
    border: '1px solid #FFAA01',
    borderRadius: '18px',
  },
});

type props = { id: string; evaluation: number; name: string };

const SweetCard: React.FC<props> = ({ id, evaluation, name }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={name}
        className={`${classes.cardContent} $s{classes.cardHeader}`}
      />
      <CardContent className={`${classes.cardContent} ${classes.cardRating}`}>
        <Rating precision={0.1} readOnly value={Number(evaluation)} />
      </CardContent>
      <Image
        src="/image/comingsoon.png"
        alt="Picture of the sweet"
        width={600}
        height={300}
      />
      <CardContent className={`${classes.cardContent} ${classes.cardRating}`}>
        <Link href={`/comment/${id}`}>
          <Button className={classes.cardButton}>+ もっと見る</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SweetCard;
