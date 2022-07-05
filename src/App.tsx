import React, { useState, useEffect } from "react";
import getImage, { getAllFrogImages, randomizeFrogs } from "./api/axios";
import MemoryGamePage from "./pages/MemoryGame";
import { FrogImage } from "./types";

function App() {
  const [images, setImages] = useState<Array<FrogImage>>([]);

  const getImages = async () => {
    const images = await getAllFrogImages();
    randomizeFrogs(images, setImages);
  };

  useEffect(() => {
    getImages();
  }, []);

  return <MemoryGamePage images={images} setImages={setImages} />;
}

export default App;
