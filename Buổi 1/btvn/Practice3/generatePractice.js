'use strict'

function generate(testLengthArray){
  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm

  const result = [];

  for (let i = 0; i < testLengthArray.length; i++) {
    const inputLength = testLengthArray[i];

    const item = {
      input: [],
      output: 0,
      target: 0,
    };

    for (let i = 0; i < inputLength; i++) {
      const randomNumber = Math.floor(Math.random()*20001 - 10000);
      item.input.push(randomNumber);
    }

    item.input = item.input.sort((a,b) => a-b);
    
    // Not found
    if (i == 0) {
      item.target = 10001;

      item.output = -1;
    }

    //First index
    if (i == 1) {
      item.target = item.input[0];

      item.output = 0;
    }

    //Last index
    if (i == 2) {
      item.target = item.input[item.input.length - 1];

      item.output = item.input.length - 1
    }

    //Middle index
    if (i == 3) {
      item.target = item.input[1];

      item.output = 1;
    }

    if (i > 3) {
      item.target = Math.floor(Math.random()*20001 - 10000);

      item.output = item.input.indexOf(item.target);
    }
    result.push(item)
  }
  return result
}

module.exports = generate
