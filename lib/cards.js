import fs from 'fs'
import path from 'path'
import { cards } from '../cards/m2001'

const cardsDirectory = path.join(process.cwd(), 'cards')

export function getFlightCardData() {
    return cards
}

export function getAllCardIds() {
  const fileNames = fs.readdirSync(cardsDirectory)

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
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.js$/, '')
      }
    }
  })
}

export function getCardData(id) {
  const fullPath = path.join(cardsDirectory, `${id}.js`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const cardData = JSON.parse(fileContents)

  // Combine the data with the id
  return {
    id,
    ...cardData
  }
}