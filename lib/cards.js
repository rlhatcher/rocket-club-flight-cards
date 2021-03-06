import fs from "fs";
import path from "path";

const cardsDirectory = path.join(process.cwd(), "cards");

export function getFlightCardData() {
  const fullPath = path.join(cardsDirectory, `all.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  return JSON.parse(fileContents);
}

export function getAllCardIds() {
  const fileNames = fs.readdirSync(cardsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ""),
      },
    };
  });
}

export function getCardData(id) {
  const fullPath = path.join(cardsDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const cardData = JSON.parse(fileContents);

  // Combine the data with the id
  return {
    id,
    ...cardData,
  };
}
