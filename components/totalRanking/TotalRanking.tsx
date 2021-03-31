import { Grid } from '@material-ui/core';
import React from 'react';
import TotalRankingDisplay from './TotalRankingDisplay';

// 仮置き
const repotersArray = [{ name: '城之内まこと', evaluation: 2000 },
                       { name: '斎藤慶喜', evaluation: 1000 },
                       { name: '服部健二', evaluation: 650 },
                       { name: 'ねこぽす', evaluation: 500 },
                       { name: 'ラカゼット', evaluation: 340 },
                       { name: 'john smith', evaluation: 10 }];

// 仮置き
const sweetsArray = [{ name: 'じゃがりこ', evaluation: 2000 },
                     { name: 'ぽてち', evaluation: 1000 },
                     { name: 'うまい棒', evaluation: 650 },
                     { name: 'ぼたぼた焼き', evaluation: 500 },
                     { name: 'カントリーマウム', evaluation: 340 },
                     { name: 'ねるねるねるね', evaluation: 10 }];

type sweetRankingData = {
  id: string,
  name: string,
  evaluation: number,
}

type Props = {
  sweetRanking: sweetRankingData[]
}

const TotalRanking:React.FC<Props> = ({ sweetRanking }) => {
  return (
    <>
      <Grid item xs={6}>
        <TotalRankingDisplay
          title="お菓子レポーターランキング"
          rankingArray={repotersArray}
          rankingUnit="レビュー"
        />
      </Grid>
      <Grid item xs={6}>
        <TotalRankingDisplay
          title="お菓子ランキング"
          rankingArray={sweetRanking}
          rankingUnit="point"
        />
      </Grid>
    </>
  );
};

export default TotalRanking;
