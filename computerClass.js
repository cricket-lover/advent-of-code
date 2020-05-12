class Computer {
  constructor(data, inputValue) {
    this.data = data.map(Number).slice();
    this.inputValue = inputValue;
    this.pointer = 0;
    this.output = [];
  }
  getInstruction() {
    const instruction = `${this.data[this.pointer]}`.padStart(5, 0);
    const opcode = instruction.substr(-2);
    const mode1 = +instruction[2];
    const mode2 = +instruction[1];
    return { opcode, mode1, mode2 };
  }
  getParams(mode1, mode2) {
    const first =
      mode1 === 0
        ? this.data[this.data[this.pointer + 1]]
        : this.data[this.pointer + 1];
    const second =
      mode2 === 0
        ? this.data[this.data[this.pointer + 2]]
        : this.data[this.pointer + 2];
    return { first, second };
  }
  run() {
    while (this.pointer < this.data.length) {
      const { opcode, mode1, mode2 } = this.getInstruction();
      const { first, second } = this.getParams(mode1, mode2);
      if (opcode == '01') {
        this.data[this.data[this.pointer + 3]] = first + second;
        this.pointer += 4;
      }
      if (opcode == '02') {
        this.data[this.data[this.pointer + 3]] = first * second;
        this.pointer += 4;
      }
      if (opcode == '03') {
        this.data[this.data[this.pointer + 1]] = this.inputValue;
        this.pointer += 2;
      }
      if (opcode == '04') {
        this.output.push(first);
        this.pointer += 2;
      }
      if (opcode == '05') {
        this.pointer = first != 0 ? second : (this.pointer += 3);
      }
      if (opcode == '06') {
        this.pointer = first == 0 ? second : (this.pointer += 3);
      }
      if (opcode == '07') {
        this.data[this.data[this.pointer + 3]] = first < second ? 1 : 0;
        this.pointer += 4;
      }
      if (opcode == '08') {
        this.data[this.data[this.pointer + 3]] = first === second ? 1 : 0;
        this.pointer += 4;
      }
      if (opcode == '99') {
        break;
      }
    }
    return this.output;
  }
}

module.exports = Computer;
