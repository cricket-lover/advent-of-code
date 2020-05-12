const fs = require('fs');
const Generatorics = require('generatorics');
const Computer = require('./computerClass');

const amplifyCircuit = function (data, phaseSetting) {
  let lastOutput = 0;
  const circuit = phaseSetting.map((phase) => new Computer(data, phase));
  for (let index = 0; index < circuit.length; index++) {
    const computer = circuit[index];
    const output = computer.run(lastOutput);
    if (computer.isHalted) break;
    lastOutput = output.shift();
  }
  return lastOutput;
};

const main = function () {
  let data = fs.readFileSync('./input.txt', 'utf8');
  data = data.split(',');
  let maxResult = 0;
  for (const phaseSetting of Generatorics.permutation([0, 1, 2, 3, 4])) {
    const result = amplifyCircuit(data, phaseSetting);
    maxResult = result > maxResult ? result : maxResult;
  }
  console.log(maxResult);
};
main();
