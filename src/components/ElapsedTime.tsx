/**
 * @param elapsedTime seconds: number
 * @returns JSX.Element
 */
export const ElapsedTime = ({ elapsedTime }: { elapsedTime: number }) => {
  return <div className="absolute mt-12 px-8">Elapsed Time: {elapsedTime}</div>;
};
