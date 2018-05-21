function randomElementOfAnArray (array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateName () {
  const titles = ['', 'Mr. ', 'Sir ', 'His Majesty ', 'Prince '];
  const names = ['Bigglesworth', 'Knapser', 'Fig', 'McKittens', 'Lord', 'Puss', 'Tiger', 'Oscar', 'Ginger', 'Charlie', 'Foxtrot', 'Fox', 'Smudge', 'Mist', 'Max', 'Shadow', 'Angel', 'Flufster', 'Felix', 'Blacky', 'Haku', 'Nagi', 'McClaw', 'Meowster', 'Catpernicus'];
  const adjectives = ['', 'Unending', 'Knight', 'Dandy', 'Fluffy', 'Dark', 'Light', 'Superfluos', 'One and Only', 'Dangerous', 'Immortal', 'Infinite', 'Common', 'Special', 'Brave', 'Magnificient'];
  return `${randomElementOfAnArray(titles)}${randomElementOfAnArray(names)} the ${randomElementOfAnArray(adjectives)}`;
}