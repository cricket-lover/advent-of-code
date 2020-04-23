const getPossiblePasswords = function (start, end) {
  let count = 0;

  for (let index = start; index <= end; index++) {
		const strOfNum = `${index}`.split('');
    const digits = [0,0,0,0,0,0,0,0,0,0];
    
strOfNum.forEach((e, i) => {
      digits[strOfNum[i]]++;   
    });
    strOfNum.push(digits);
    
const repeated = strOfNum[6].includes(2);;

    let incremented = true;
    for (let index = 0; index < 5; index++) {
      incremented = incremented && strOfNum[index] <= strOfNum[index + 1];
      if (!incremented) {
        break;
      }
    }
    if (incremented && repeated ) {
      count++;
    }
  }
  return count;
};

const result = getPossiblePasswords(168630,718098);
console.log(result);
