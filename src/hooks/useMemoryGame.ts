import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FrogImage } from "../types";
import { calculateScoreFromMoves } from "../utils";
import { useDeepCompareEffect } from "./useDeepCompareEffect";
import { useTimer } from "./useTimer";

type FrogTuple = [FrogImage, FrogImage] | [FrogImage] | [];

const convertId = (id: string) => {
  return id.charAt(id.length - 1);
};

export const useMemoryGame = ({
  setImages,
  images,
}: {
  setImages: Dispatch<SetStateAction<Array<FrogImage>>>;
  images: FrogImage[];
}) => {
  const [cards, setCards] = useState<FrogTuple>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [movesSinceLastMatch, setMovesSinceLastMatch] = useState(0);
  const [isDeltaTimerRunning, setIsDeltaTimerRunning] = useState(false);
  const [elapsedTime, resetTimer] = useTimer(isDeltaTimerRunning);
  const deltaTime = elapsedTime;

  useDeepCompareEffect(() => {
    console.log({ cards });
  }, [cards]);

  const checkTuple = (cards: FrogTuple) => {
    if (
      cards[0] &&
      cards[1] &&
      convertId(cards[0].id) === convertId(cards[1].id)
    ) {
      /**
       * Found a pair:
       * Increment score depending on the number of moves since last match and the time elapsed since last match
       * Reset moves since last match
       */
      setScore(
        (score) =>
          score + calculateScoreFromMoves(movesSinceLastMatch, deltaTime)
      );

      resetTimer();
      setMovesSinceLastMatch(0);
      setImages((images: Array<FrogImage>) => {
        return images.map((image: FrogImage) => {
          if (cards[0] && cards[1])
            if (
              convertId(image.id) === convertId(cards[0].id) ||
              convertId(image.id) === convertId(cards[1].id)
            ) {
              return { ...image, found: true, isShown: true };
            }
          return image;
        });
      });
      setCards([]);
      return true;
    }

    // Switch cards back to hidden after opening two with a delay
    setTimeout(() => {
      setImages((images: Array<FrogImage>) => {
        return images.map((image: FrogImage) => {
          if (cards[0] && cards[1])
            if (
              convertId(image.id) === convertId(cards[0].id) ||
              convertId(image.id) === convertId(cards[1].id)
            ) {
              return { ...image, isShown: false, found: false };
            }
          return image;
        });
      });
      setCards([]);
      return false;
    }, 500);
  };

  useDeepCompareEffect(() => {
    let found = false;

    if (cards.length === 2) checkTuple(cards);
    if (cards.length === 1)
      setImages((prevImages) => {
        const res = prevImages.map((image: FrogImage) => {
          if (!found && cards[0] && image.id === cards[0]!.id) {
            found = true;
            return cards[0];
          }
          return image;
        });

        found = false;
        return res;
      });

    if (cards.length === 2)
      setImages((prevImages: any) => {
        const res = prevImages.map((image: FrogImage) => {
          if (!found && cards[1] && image.id === cards[1]!.id) {
            found = true;
            checkTuple(cards);
            return cards[1];
          }
          return image;
        });
        return res;
      });
  }, [cards.length, JSON.stringify(cards)]);

  useDeepCompareEffect(() => {
    setGameOver(images.every((image) => image.found));
  }, [images]);

  const addCard = (card: FrogImage) => {
    if (card.found) return;

    if (cards.length < 2) {
      if (cards.length === 0) {
        setCards([{ ...card, isShown: true }]);
        setMovesSinceLastMatch((moves) => moves + 1);
        setIsDeltaTimerRunning(true);
      } else if (cards.length === 1) {
        if (card.id === cards[0].id) return;
        setCards([...cards, { ...card, isShown: true }]);
        setMovesSinceLastMatch((moves) => moves + 1);
        setIsDeltaTimerRunning(true);
      }
    }
  };

  const resetGame = () => {
    setCards([]);
    setScore(0);
    setGameOver(false);
    setImages((images: Array<FrogImage>) => {
      return images.map((image: FrogImage) => {
        return { ...image, found: false, isShown: false };
      });
    });
  };

  return {
    addCard,
    score,
    gameOver,
    resetGame,
  };
};
