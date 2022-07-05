import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FrogImage } from "../types";

type FrogTuple = [FrogImage, FrogImage] | [FrogImage] | [];

const convertId = (id: string) => {
  return id.charAt(id.length - 1);
};

export const useMemoryGame = ({
  setImages,
  images,
}: {
  setImages: Dispatch<SetStateAction<Array<FrogImage>>>;
  images: any[];
}) => {
  const [cards, setCards] = useState<FrogTuple>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    console.log({ cards });
  }, [JSON.stringify(cards)]);

  const checkTuple = (cards: FrogTuple) => {
    if (
      cards[0] &&
      cards[1] &&
      convertId(cards[0].id) === convertId(cards[1].id)
    ) {
      console.log("found a pair");
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

  const resetGame = () => {
    setCards([]);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    let found = false;

    if (cards.length === 2) checkTuple(cards);
    if (cards.length === 1)
      setImages((prevImages: any) => {
        const res = prevImages.map((image: FrogImage) => {
          if (!found && cards[0] && image.id === cards[0]!.id) {
            found = true;
            return cards[0];
          }
          // if (cards[1] && convertId(image.id) === convertId(cards[1]!.id))
          //   return cards[1];
          return image;
        });

        found = false;
        return res;
      });

    if (cards.length === 2)
      setImages((prevImages: any) => {
        const res = prevImages.map((image: FrogImage) => {
          // if (cards[0] && convertId(image.id) === convertId(cards[0]!.id))
          //   return cards[0];
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

  useEffect(() => {
    console.log(cards);
  }, [JSON.stringify(cards)]);

  useEffect(() => {
    setGameOver(images.every((image) => image.found));
  }, [JSON.stringify(images)]);

  useEffect(() => {
    if (gameOver) console.log("asdasd");
  }, [gameOver]);

  const addCard = (card: FrogImage) => {
    if (card.found) return;

    if (cards.length < 2) {
      if (cards.length === 0) {
        setCards([{ ...card, isShown: true }]);
      } else if (cards.length === 1) {
        if (card.id === cards[0].id) return;
        setCards([...cards, { ...card, isShown: true }]);
      }
    }
  };

  const updateScore = (score: number) => {
    setScore(score);
  };

  const gameOverHandler = () => {
    setGameOver(true);
  };

  return {
    cards,
    addCard,
    checkTuple,
    score,
    updateScore,
    gameOver,
    gameOverHandler,
    resetGame,
  };
};
