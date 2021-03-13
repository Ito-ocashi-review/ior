import React, { useEffect, useState, useContext } from 'react';
import {
  Button, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import Axios from 'axios';
import SweetRanking from '../components/topRanking/SweetRanking';
import TotalRanking from '../components/totalRanking/TotalRanking';
import { AuthContext } from './_app';

const useStyles = makeStyles(theme => ({
  top: {
    color: '#270000',
    height: '100vh',
    textAlign: 'center',
  },
  section: {
    margin: '80px 50px',
  },
  title: {
    fontSize: '100px',
    font: 'MotoyalMaru',
  },
  sweetRanking: {
    margin: '30px 0',
  },
  reviewButton: {
    color: 'black',
    border: '2px solid #984B15',
    backgroundColor: '#984B15',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#984B15',
      borderRadius: '30px',
      transition: 'all 0.2s linear',
    },
  },
  totalRanking: {
    margin: '30px 0',
  },
}));

type data = {
  id: string,
  name: string,
  evaluation: number,
}

type Props ={
  sweetsData: data[]
}

const Index: React.FC<Props> = ({ sweetsData }) => {
  const [sweetRanking, setsweetRanking] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const getRanking = async() => {
      const ranking = await Axios.get('/api/sweets/ranking');
      setsweetRanking(ranking.data.sortedSweetsRankingData);
    };
    getRanking();
  }, []);

  return (
    <div className={classes.top}>
      <div className={classes.section}>
        <span className={classes.title}>お菓子ランキングトップ３</span>
        <div className={classes.sweetRanking}>
          <Grid container spacing={3}>
            <SweetRanking sweetsData={sweetRanking} />
          </Grid>
        </div>
      </div>
      <div className={classes.section}>
        <span className={classes.title}>総合ランキング</span>
        <div className={classes.totalRanking}>
          <Grid container spacing={8}>
            <TotalRanking />
          </Grid>
        </div>
      </div>

      <Button
        variant="outlined"
        className={classes.reviewButton}
        onClick={() => Router.push('/new-review')}
      >
        投稿する
      </Button>
    </div>
  );
};

export default Index;
