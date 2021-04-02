import { Grid } from '@material-ui/core';
import React from 'react';
import OverallRankingDisplay from './OverallRankingDisplay';

// 仮置き
const repotersArray = [{ name: '城之内まこと', amount: 2000 },
                       { name: '斎藤慶喜', amount: 1000 },
                       { name: '服部健二', amount: 650 },
                       { name: 'ねこぽす', amount: 500 },
                       { name: 'ラカゼット', amount: 340 },
                       { name: 'john smith', amount: 10 }];


type sweetRankingData = {
  id: string,
  name: string,
  evaluation: number,
}

type Props = {
  sweetRanking: sweetRankingData[]
}

const overallRanking:React.FC<Props> = ({ sweetRanking }) => {
  return (
    <>
      <Grid item xs={6}>
        <OverallRankingDisplay
          title="お菓子レポーターランキング"
          rankingArray={repotersArray}
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
