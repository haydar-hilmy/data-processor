import { uniqueNamesGenerator, adjectives, colors, animals, starWars } from 'unique-names-generator';

const getRandomDictionary = () => {
  return Math.random() > 0.5 ? starWars : animals;
};

const shortName = uniqueNamesGenerator({
  dictionaries: [getRandomDictionary()],
  length: 1,
  style: 'capital',
  separator: ' '
});