/** @jsxImportSource @emotion/react */
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import tw from "twin.macro";
import ygoback from "../assets/yugioh-back.png";
import { useMemoryGame } from "../hooks/useMemoryGame";
import { FrogImage } from "../types";

const Card = ({
  url,
  onClick,
  isShown,
}: {
  url: string;
  onClick: any;
  isShown: boolean;
}) => {
  const [effect, setEffect] = useState(false);

  return (
    <img
      css={[
        tw`hover:border-black border-4 border-solid select-none cursor-pointer`,
      ]}
      className={`${effect && "animate-wiggle"}`}
      style={{ width: "130px" }}
      src={!isShown ? ygoback : url}
      onClick={() => {
        // setIsShown(!isShown);
        setEffect(true);
        onClick();
      }}
      onAnimationEnd={() => setEffect(false)}
    />
  );
};

const Flex = ({ children }: { children: ReactNode }) => {
  return (
    <div
      tw={
        "grid grid-rows-4 grid-flow-col text-center justify-center items-center mt-4"
      }
    >
      {children}
    </div>
  );
};

const MemoryGame = ({
  images,
  setImages,
}: {
  images: Array<FrogImage>;
  setImages: Dispatch<SetStateAction<Array<FrogImage>>>;
}) => {
  const { cards, addCard, checkTuple } = useMemoryGame({ setImages, images });

  useEffect(() => {
    console.log({ images });
  }, [JSON.stringify(images)]);

  return (
    <Flex>
      {images.map(({ url, id, isShown, found }: FrogImage) => (
        <Card
          url={url}
          onClick={() => addCard({ url, id, found, isShown } as FrogImage)}
          isShown={isShown}
        />
      ))}
    </Flex>
  );
};

export default MemoryGame;
