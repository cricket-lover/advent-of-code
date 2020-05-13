class Computer {
  constructor(data, inputValue) {
    this.data = data.map(Number).slice();
    this.inputValue = inputValue;
    this.pointer = 0;
    this.output = [];
    this.isHalted = false;
    this.isFirstTime = true;
    this.relativeIndex = 0;
  }
  getInstruction() {
    const instruction = `${this.data[this.pointer]}`.padStart(5, 0);
    const opcode = instruction.substr(-2);
    const mode1 = +instruction[2];
    const mode2 = +instruction[1];
    const mode3 = +instruction[0];
    return { opcode, mode1, mode2, mode3 };
  }
  getParam(mode, number) {
    let first =
      mode === 0
        ? this.data[this.pointer + number]
        : mode === 1
        ? this.pointer + number
        : this.data[this.pointer + number] + this.relativeIndex;
    return first;
  }
  getParams(mode1, mode2, mode3) {
    const first = this.getParam(mode1, 1);
    const second = this.getParam(mode2, 2);
    const third = this.getParam(mode3, 3);

    return { first, second, third };
  }
  run(secondInput) {
    while (this.pointer < this.data.length) {
      const { opcode, mode1, mode2, mode3 } = this.getInstruction();
      let { first, second, third } = this.getParams(mode1, mode2, mode3);
      if (opcode == '01') {
        this.data[third] = this.data[first] + this.data[second];
        this.pointer += 4;
      }
      if (opcode == '02') {
        this.data[third] = this.data[first] * this.data[second];
        this.pointer += 4;
      }
      if (opcode == '03') {
        const value = this.isFirstTime ? this.inputValue : secondInput;
        this.data[first] = value;
        this.isFirstTime = false;
        this.pointer += 2;
      }
      if (opcode == '04') {
        this.output.push(this.data[first]);
        this.pointer += 2;
        break;
      }
      if (opcode == '05') {
        this.pointer =
          this.data[first] != 0 ? this.data[second] : (this.pointer += 3);
      }
      if (opcode == '06') {
        this.pointer =
          this.data[first] == 0 ? this.data[second] : (this.pointer += 3);
      }
      if (opcode == '07') {
        this.data[third] = this.data[first] < this.data[second] ? 1 : 0;
        this.pointer += 4;
      }
      if (opcode == '08') {
        this.data[third] = this.data[first] === this.data[second] ? 1 : 0;
        this.pointer += 4;
      }
      if (opcode == '09') {
        this.relativeIndex += this.data[first];
        this.pointer += 2;
      }
      if (opcode == '99') {
        this.isHalted = true;
        break;
      }
    }
    return this.output;
  }
}

module.exports = Computer;
