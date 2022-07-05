import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { ygoProApiUrl, frogNames } from "../constants";
import { FrogImage } from "../types";

const getImage = async (name: string) => {
  const result = await axios.get(ygoProApiUrl(name));
  console.log(result.data.data[0]["card_images"][0]["image_url"]);
  return result.data.data[0]["card_images"][0]["image_url"];
};

export const getAllFrogImages = async (): Promise<Array<FrogImage>> => {
  const promises = frogNames.map(getImage);
  const urls = await Promise.all(promises);
  const result = urls.map((url: string, id: number) => ({
    id: id.toString(),
    url,
    found: false,
    isShown: false,
  }));

  return result;
};

export const randomizeFrogs = (list: Array<FrogImage>, setList: any) => {
  const result = list
    .concat(
      list.map(({ url, id }: FrogImage) => {
        return {
          id: `pairOf-${id}`,
          url,
          found: false,
          isShown: false,
        };
      })
    )
    .sort(() => {
      return 0.5 - Math.random();
    });

  setList(() => {
    console.log(result);
    return result;
  });
};

export default getImage;
