'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  let temp 
  let n = input.length
  for(let i = 0; i<n-1; i++){
    for(let j = i+1; j<n; j++){
      if(input[i]>input[j]){
      temp = input[i]
      input[i] = input[j]
      input[j] = temp
      }
    }
  }
  return input
}

module.exports = sort
