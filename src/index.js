module.exports = function toReadable (number) {
  const units1 = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };

  const units2 = {
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19
  };

  const dozens = {
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90
  };

  let Convert = function (sym, obj) {
    for (const i in obj) {
        if (sym == obj[i]) {
            return i;
        };
    };
  };

  let NumberToOrder = function(inputNum) {
    let numString = inputNum.toString();
    let result = '';

    if(inputNum < 10) {
        result = Convert(inputNum, units1); // 1..9
    }

    else if (inputNum < 20) {
        result = Convert(inputNum, units2); // 10..19
    }

    else if (inputNum < 100) {
        result = (numString[1] == '0' ? Convert((numString[0] * 10), dozens) : Convert((numString[0] * 10), dozens) + ' ' + Convert(numString[1], units1)); // 20 .. 99
    }

    else if (inputNum == 100) {
        result = Convert(1, units1) + ' hundred'; // 100
    }

    else if (inputNum < 110 && numString[1] == '0') {
        result = Convert(1, units1) + ' hundred ' + Convert(numString[2], units1); // 101.. 109
    }

    else if (inputNum < 120) {
        result = Convert(1, units1) + ' hundred ' + Convert((numString[1] + numString[2]), units2); // 111 .. 119
    }

    else if (inputNum < 199 && numString[2] == '0'){
        result = Convert(1, units1) + ' hundred ' + Convert(numString[1] * 10, dozens); // 120, 130, 140, 150, 160, 170, 180, 190
    }

    else if (inputNum <= 199) {
        result = Convert(1, units1) + ' hundred ' + Convert((numString[1] * 10), dozens) + ' ' + Convert(numString[2], units1);
    }

    else if (inputNum != 100 && numString[1] == '0' && numString[2] == '0') {
        result = Convert(numString[0], units1) + ' hundred'; // 200, 300, 400, 500, 600, 700, 800, 900
    }

    else if (numString[1] == '0') {
        result = Convert(numString[0], units1) + ' hundred ' + Convert(numString[2], units1); // ?01 .. ?09
    }

    else if (numString[1] == '1') {
        result = Convert(numString[0], units1) + ' hundred ' + Convert(numString[1] + numString[2], units2); // ?11 .. ?19
    }

    else if (numString[2] == '0') {
        result = Convert(numString[0], units1) + ' hundred ' + Convert((numString[1] * 10), dozens); // ?20 .. ?90
    }

    else {
        result = Convert(numString[0], units1) + ' hundred ' + Convert((numString[1] * 10), dozens) + ' ' + Convert(numString[2], units1);
    };

    return result;

  };

  return NumberToOrder(number);
}
