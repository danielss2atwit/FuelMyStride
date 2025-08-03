export const calculateTrainingLoad = ({ intensity, duration = 0, distance = 0, pace = 0 }) => {
  let score = 0;

  if (intensity === 'hard') score += 3;
  else if (intensity === 'moderate') score += 2;
  else score += 1;

  score += duration / 30;
  score += distance / 3;

  if (pace && pace < 10) score += 1;

  return score;
};

const getTotalPortionsFromScore = (score) => {
  if (score < 4) return 16;
  else if (score < 7) return 20;
  else return 24;
};

export const getPortionRangesFromPlate = (plateType, score) => {
  const TOTAL_PORTIONS = getTotalPortionsFromScore(score);

  const range = (percent) => {
    const min = Math.floor(TOTAL_PORTIONS * percent - 1);
    const max = Math.ceil(TOTAL_PORTIONS * percent + 1);
    return [min, max];
  };

  if (plateType === 'easy') {
    return {
      carbs: range(0.25),
      protein: range(0.25),
      color: range(0.50),
    };
  } else if (plateType === 'moderate') {
    return {
      carbs: range(0.35),
      protein: range(0.25),
      color: range(0.40),
    };
  } else if (plateType === 'hard') {
    return {
      carbs: range(0.50),
      protein: range(0.25),
      color: range(0.25),
    };
  } else {
    return { carbs: [0, 0], protein: [0, 0], color: [0, 0] };
  }
};
