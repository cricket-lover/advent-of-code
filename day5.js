const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const arrayOfData = data.split(',');

const add = function (list, index, mode1, mode2) {
  const first = mode1 === 0 ? list[list[index + 1]] : list[index + 1];
  const second = mode2 === 0 ? list[list[index + 2]] : list[index + 2];
  list[list[index + 3]] = first + second;
};

const multiply = function (list, index, mode1, mode2) {
  const first = mode1 === 0 ? list[list[index + 1]] : list[index + 1];
  const second = mode2 === 0 ? list[list[index + 2]] : list[index + 2];
  list[list[index + 3]] = first * second;
};

const jumpIfTrue = function (list, index, mode1, mode2) {
  const first = mode1 === 0 ? list[list[index + 1]] : list[index + 1];
  const second = mode2 === 0 ? list[list[index + 2]] : list[index + 2];
  return [first, second];
};

const jumpIfFalse = function (list, index, mode1, mode2) {
  const first = mode1 === 0 ? list[list[index + 1]] : list[index + 1];
  const second = mode2 === 0 ? list[list[index + 2]] : list[index + 2];
  return [first, second];
};

const jumpLessThan = function (list, index, mode1, mode2) {
  const first = mode1 === 0 ? list[list[index + 1]] : list[index + 1];
  const second = mode2 === 0 ? list[list[index + 2]] : list[index + 2];
  list[list[index + 3]] = first < second ? 1 : 0;
};

const jumpEqual = function (list, index, mode1, mode2) {
  const first = mode1 === 0 ? list[list[index + 1]] : list[index + 1];
  const second = mode2 === 0 ? list[list[index + 2]] : list[index + 2];
  list[list[index + 3]] = first === second ? 1 : 0;
};

const computeOpcode = function (array) {
  const result = [];
  const list = array.map((e) => +e);
 

  for (let index = 0; index < list.length; ) {
    const oldInstruction = `00000${list[index]}`;
    const oldInstruction_length = oldInstruction.length;
    const instruction = oldInstruction.slice(oldInstruction_length - 5);
    const instruction_length = instruction.length;
    const opcode = +instruction.slice(
      instruction_length - 2,
      instruction_length
    );
    const mode1 = +instruction[instruction_length - 3];
    const mode2 = +instruction[instruction_length - 4];
    if (opcode === 01) {
      add(list, index, mode1, mode2);
      index += 4;
    }
    if (opcode === 02) {
      multiply(list, index, mode1, mode2);
      index += 4;
    }
    if (opcode === 03) {
      list[list[index + 1]] = 5;
      index += 2;
    }
    if (opcode === 04) {
      const first = mode1 == 0 ? list[list[index + 1]] : list[index + 1];
      result.push(first);
      index += 2;
    }
    if (opcode === 05) {
      const [first, second] = jumpIfTrue(list, index, mode1, mode2);
      if (first != 0) {
        index = second;
      } else {
        index += 3;
      }
    }
    if (opcode === 06) {
      const [first, second] = jumpIfFalse(list, index, mode1, mode2);
      if (first === 0) {
        index = second;
      } else {
        index += 3;
      }
      console.log('first is', first, 'second is', second, 'index is', index);
    }
    if (opcode === 07) {
      jumpLessThan(list, index, mode1, mode2);
      index += 4;
    }
    if (opcode === 08) {
      jumpEqual(list, index, mode1, mode2);
      index += 4;
    }

    if (opcode === 99) {
      break;
    }
  }

  return result;
};

const result = computeOpcode(arrayOfData);
console.log(result);

// fs.writeFileSync('./result.json', JSON.stringify(result, null, 2), 'utf8');
