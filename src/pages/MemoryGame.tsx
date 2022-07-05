/** @jsxImportSource @emotion/react */
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import {
  GameOverModal,
  ScoreBoard,
  ElapsedTime,
  Flex,
  Card,
} from "../components";
import { useMemoryGame } from "../hooks/useMemoryGame";
import { useTimer } from "../hooks/useTimer";
import { FrogImage } from "../types";

const MemoryGame = ({
  images,
  setImages,
}: {
  images: Array<FrogImage>;
  setImages: Dispatch<SetStateAction<Array<FrogImage>>>;
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, resetTimer] = useTimer(isRunning);
  const { addCard, score, gameOver, resetGame } = useMemoryGame({
    setImages,
    images,
  });

  useEffect(() => {
    if (gameOver) {
      setIsRunning(false);
      resetTimer();
    }
  }, [gameOver, resetTimer]);

  return (
    <>
      <GameOverModal isShown={gameOver} onClick={resetGame} />
      <ScoreBoard score={score} />
      <ElapsedTime elapsedTime={elapsedTime} />
      <Flex>
        {images.map(({ url, id, isShown, found }: FrogImage) => (
          <Fragment key={id}>
            <Card
              url={url}
              onClick={() => {
                !isRunning && setIsRunning(true);

                addCard({ url, id, found, isShown } as FrogImage);
              }}
              isShown={isShown}
              isFound={found}
            />
          </Fragment>
        ))}
      </Flex>
    </>
  );
};

export default MemoryGame;
