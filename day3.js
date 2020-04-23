const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const arrayOfData = data.split('\n');

const wire1 = arrayOfData[0].split(',');
const wire2 = arrayOfData[1].split(',');

const wire1Points = [];
const wire2Points = [];

const addValues = function (listOfSteps, array) {
  let x = 0,
    y = 0;
  z = 0;
  listOfSteps.forEach((s) => {
    const step = s.slice(1);
    switch (s[0]) {
      case 'R':
        for (let index = 0; index < +step; index++) {
          x += 1;
          z += 1;
          array.push([x, y, z]);
        }
        break;
      case 'L':
        for (let index = 0; index < +step; index++) {
          x -= 1;
          z += 1;
          array.push([x, y, z]);
        }
        break;
      case 'U':
        for (let index = 0; index < +step; index++) {
          y += 1;
          z += 1;
          array.push([x, y, z]);
        }
        break;
      case 'D':
        for (let index = 0; index < +step; index++) {
          y -= 1;
          z += 1;
          array.push([x, y, z]);
        }
        break;
      default:
        break;
    }
  });
};

addValues(wire1, wire1Points);
addValues(wire2, wire2Points);

const secondWire = wire2Points.map(p =>{
	point = p.slice();
	point.pop();
	return point.join(',');
})

const result = [];

wire1Points.forEach((p) => {
  
	let point = p.slice();
	point.pop()
  point = point.join(',');
	const index = secondWire.findIndex(e => {
    return e === point;
  });
	if (wire2Points[index] === undefined) {
    return;
  }
  const value = +wire2Points[index][2] + +p[2];
  result.push(value);
});


// fs.writeFileSync('./intersections.json', JSON.stringify(intersections, null, 2), 'utf8');

// const resultedDistances = intersections.map((p) => {
  //   const point = p.split(',');
  //   const n1 = +point[0] < 0 ? +point[0] : -+point[0];
  //   const n2 = +point[1] < 0 ? +point[1] : -+point[1];
  //   const sum = n1 + n2;
  //   return sum >= 0 ? sum : -sum;
  // });
  
  // console.log(Math.min(...resultedDistances));
  
  // console.log(wire1Points);
  // console.log(wire2Points);
  
  // const steps = intersections.map(p=>p.slice(0,1));
  
  console.log(Math.min(...result));