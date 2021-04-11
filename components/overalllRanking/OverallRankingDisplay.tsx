import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import RankingColumn from './RankingColumn';
import Link from 'next/link';

const useStyle = makeStyles({
  OverallRankingDisplay: {
    backgroundColor: '#270000',
    color: 'white',
    padding: '20px',
  },
  title: {
    fontFamily: 'MotoyaLMaru',
    fontSize: '40px',
  },
  ranking: {
    margin: '10px 0',
    padding: '10px 0',
    '&:hover': {
      backgroundColor: '#984B15',
      transition: 'all 0.2s linear',
      cursor: 'pointer',
    },
  },
  content: {
    height: '400px',
    overflow: 'scroll',
  },
});

type Ranking = {
  id?: string;
  name: string;
  evaluation?: number;
  amount?: number;
};

type Props = {
  title: string;
  rankingArray: Array<Ranking>;
  rankingUnit: string;
  rankingType: 'reporter' | 'sweet';
};

const OverallRankingDisplay: React.FC<Props> = ({
  title,
  rankingArray,
  rankingUnit,
  rankingType,
}) => {
  const classes = useStyle();

  if (rankingType === 'sweet') {
    const sweets = rankingArray.map((ranking, index) => {
      return (
        <Link href={`/comment/${ranking.id}`} key={ranking.name}>
          <div className={classes.ranking}>
            <RankingColumn
              ranking={index + 1}
              name={ranking.name}
              reviewNumericalValue={ranking.evaluation}
              rankingUnit={rankingUnit}
            />
          </div>
        </Link>
      );
    });

    return (
      <Paper className={classes.OverallRankingDisplay}>
        <span className={classes.title}>{title}</span>
        <div className={classes.content}>{sweets}</div>
      </Paper>
    );
  }

  const repoters = rankingArray.map((ranking, index) => {
    return (
      <div className={classes.ranking} key={ranking.name}>
        <RankingColumn
          ranking={index + 1}
          name={ranking.name}
          reviewNumericalValue={ranking.amount}
          rankingUnit={rankingUnit}
        />
      </div>
    );
  });

  return (
    <Paper className={classes.OverallRankingDisplay}>
      <span className={classes.title}>{title}</span>
      <div className={classes.content}>{repoters}</div>
    </Paper>
  );
};

export default OverallRankingDisplay;
