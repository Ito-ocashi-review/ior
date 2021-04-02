import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import RankingColumn from './RankingColumn';

const useStyle = makeStyles(theme => ({
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
    margin: '50px 0',
  },
  content: {
    height: '400px',
    overflow: 'scroll',
  },
}));

type Ranking = {
  name: string,
  evaluation: number,
}

type Props = {
  title: string,
  rankingArray: Array<Ranking>,
  rankingUnit: string,
  rankingType: 'reporter'|'sweet'
}

const OverallRankingDisplay:React.FC<Props> = ({
  title, rankingArray, rankingUnit, rankingType,
}) => {
  const classes = useStyle();
  let reviewNumericalValuePropaty;
  switch (rankingType) {
    case 'sweet':
      reviewNumericalValuePropaty = 'evaluation';
      break;
    case 'reporter':
      reviewNumericalValuePropaty = 'amount';
  }
  const repoters = rankingArray.map((ranking, index) => {
    return (
      <div className={classes.ranking} key={ranking.name}>
        <RankingColumn
          ranking={index + 1}
          name={ranking.name}
          reviewNumericalValue={ranking[reviewNumericalValuePropaty]}
          rankingUnit={rankingUnit}
        />
      </div>
    );
  });

  return (
    <Paper className={classes.OverallRankingDisplay}>
      <span className={classes.title}>{title}</span>
      <div className={classes.content}>
        {repoters}
      </div>
    </Paper>
  );
};

export default OverallRankingDisplay;
