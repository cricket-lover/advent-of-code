const fs = require('fs');
const Generatorics = require('generatorics');
const Computer = require('./computerClass');

const amplifyCircuit = function (data, phaseSetting) {
  let lastOutput = 0;
  const circuit = phaseSetting.map((phase) => new Computer(data, phase));
  let index = 0;
  while (true) {
    const computer = circuit[index % circuit.length];
    const output = computer.run(lastOutput);
    if (computer.isHalted) break;
    lastOutput = output.shift();
    index++;
  }
  return lastOutput;
};

const main = function () {
  let data = fs.readFileSync('./input.txt', 'utf8');
  data = data.split(',');
  let maxResult = 0;
  for (const phaseSetting of Generatorics.permutation([5, 6, 7, 8, 9])) {
    const result = amplifyCircuit(data, phaseSetting);
    maxResult = result > maxResult ? result : maxResult;
  }
  console.log(maxResult);
};
main();
