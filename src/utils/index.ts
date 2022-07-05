const HIGHEST_SCORE = 1000;
export const calculateScoreFromMoves = (
  movesSinceLastMatch: number,
  elapsedTime: number
) => {
  const score = (1 / elapsedTime) * (1 / movesSinceLastMatch) * HIGHEST_SCORE;

  return Math.round(score);
};
