/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import tw from "twin.macro";
import cardBackImage from "../assets/yugioh-back.png";

/**
 * Yu-Gi-Oh Card Image component for the memory game grid with a back state and a front state.
 * @param url URL of the card image
 * @param onClick onClick handler
 * @param isShown whether the card is shown
 * @param found whether the card is found
 * @returns JSX.Element
 */
export const Card = ({
  url,
  onClick,
  isShown,
  isFound,
}: {
  url: string;
  onClick: any;
  isShown: boolean;
  isFound: boolean;
}) => {
  const [effect, setEffect] = useState(false);

  useEffect(() => {
    if (!isShown) setEffect(true);
  }, [isShown]);

  return (
    <img
      css={[
        tw`hover:border-black border-4 border-solid select-none cursor-pointer`,
        isFound && tw`opacity-50 border-0 select-none cursor-not-allowed`,
      ]}
      alt={`${url}`}
      className={`${effect && "animate-wiggle"}`}
      style={{ width: "130px" }}
      src={!isShown ? cardBackImage : url}
      onClick={() => {
        if (!isFound) {
          setEffect(true);
          onClick();
        }
      }}
      onAnimationEnd={() => setEffect(false)}
    />
  );
};
