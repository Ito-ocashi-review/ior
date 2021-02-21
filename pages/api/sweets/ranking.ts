import Sweet from '../../../models/Sweet';
import Review from '../../../models/Review';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  try {
    const sweets = await Sweet.find({});
    const sweetScore = sweets?.map(async(sweet) => {
      const reviews = await Review.find({ sweetId: sweet._id });
      // レビューが一つもなかったら、平均値を0で返す
      if (reviews?.length === 0) {
        return { name: sweet.name, evaluation: 0 };
      }

      const scoreAmount = reviews?.map((review) => {
        return Number(review.evaluation);
      }).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });

      if (scoreAmount && reviews?.length) {
        return { name: sweet.name, evaluation: Number((scoreAmount / reviews?.length).toFixed(2)) };
      }

      return { name: sweet.name, evaluation: 0 };

    });

    let sweetsRankingData;
    if (sweetScore) {
      sweetsRankingData = await Promise.all(sweetScore);
    }

    // 評価の値で昇順にソート
    const sortedSweetsRankingData = sweetsRankingData?.sort((a, b) => {
      return Number(b.evaluation) - Number(a.evaluation);
    });

    res.status(201).json({ success: true, sortedSweetsRankingData });
  }
  catch (error) {
    res.status(400).json({ success: false });
  }

}
