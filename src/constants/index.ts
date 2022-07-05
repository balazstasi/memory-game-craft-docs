const ygoProApiUrl = (name: string) =>
  `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`;

const frogNames = [
  "Toadally Awesome",
  "Swap Frog",
  "Des Frog",
  "Dupe Frog",
  "Flip Flop Frog",
  "Poison Draw Frog",
  "Submarine Frog",
  "Substitoad",
];

export { ygoProApiUrl, frogNames };
