function randomElementOfAnArray (array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateName () {
  const titles = ['', 'Mr. ', 'Sir ', 'His Majesty ', 'Prince '];
  const names = ['Bigglesworth', 'Knapser', 'Fig', 'McKittens', 'Puss', 'Tiger', 'Oscar', 'Ginger', 'Charlie', 'Foxtrot', 'Fox', 'Smudge', 'Mist', 'Max', 'Shadow', 'Angel', 'Flufster', 'Felix', 'Blacky', 'Haku', 'Nagi', 'McClaw', 'Meowster', 'Catpernicus'];
  const adjectives = ['Unending', 'Knight', 'Dandy', 'Fluffy', 'Dark', 'Light', 'Superfluos', 'One and Only', 'Dangerous', 'Immortal', 'Infinite', 'Common', 'Special', 'Brave', 'Magnificient'];
  return `${randomElementOfAnArray(titles)}${randomElementOfAnArray(names)} the ${randomElementOfAnArray(adjectives)}`;
}

// function* incrementIndex () {
//   let index = 0;
//   while (true) {
//     yield index ++;
//   }
// }

// const generateID = incrementIndex();


function counterGenerator () {
  let index = 0;
  return function () {
    return index ++;
  };
}

let generateID = counterGenerator();

export {
  generateName,
  generateID
}