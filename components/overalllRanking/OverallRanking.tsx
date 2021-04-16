import { Grid } from '@material-ui/core';
import React from 'react';
import OverallRankingDisplay from './OverallRankingDisplay';

type sweetData = {
  id: string;
  name: string;
  evaluation: number;
};

type userData = {
  userName: string;
  totalReviews: number;
};

type Props = {
  sweetRanking: sweetData[];
  userRanking: userData[];
};

const overallRanking: React.FC<Props> = ({ sweetRanking, userRanking }) => {
  return (
    <>
      <Grid item xs={6}>
        <OverallRankingDisplay
          title="お菓子レポーターランキング"
          rankingArray={userRanking}
          rankingUnit="レビュー"
          rankingType="reporter"
        />
      </Grid>
      <Grid item xs={6}>
        <OverallRankingDisplay
          title="お菓子ランキング"
          rankingArray={sweetRanking}
          rankingUnit="point"
          rankingType="sweet"
        />
      </Grid>
    </>
  );
};

export default overallRanking;
