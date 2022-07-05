/**
 *
 * @param score number
 * @returns JSX.Element
 */
export const ScoreBoard = ({ score }: { score: number }) => {
  return (
    <div className="text-left text-3xl px-8 py-4 absolute">Score: {score}</div>
  );
};
