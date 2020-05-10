const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');
let arrayOfData = data.split('\n');

const orbits = {};

arrayOfData = arrayOfData.map((e) => {
  const values = e.split(')');
  return values;
});

arrayOfData.forEach((e) => {
  const keys = Object.keys(orbits);
  if (keys.includes(e[1])) {
    orbits[e[1]].push(e[0]);
    return;
  }
  orbits[e[1]] = [e[0]];
});

const getTotalOrbitCount = (mappedOrbits, orbit) => {
  if (orbit === 'COM') return 0;
  const orbitData = mappedOrbits[orbit];
  return getTotalOrbitCount(mappedOrbits, orbitData[0]) + orbitData.length;
};

//orbits is that object with key value pairs
const orbitsList = Object.keys(orbits);
const totalOrbits = orbitsList.reduce(
  (total, orbit) => total + getTotalOrbitCount(orbits, orbit),
  0
);
console.log('part one', totalOrbits);


