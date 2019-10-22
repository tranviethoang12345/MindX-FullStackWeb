const fs = require('fs')

const obj = {
    a: 5,
    b: 6,
}

// json
const jsonObj = JSON.stringify(obj);

console.log("Begin write file");
fs.writeFile("test.txt", jsonObj, (err) => {
    //Write file done
    if (err) {
        console.log(err);
    } else {
        console.log("Write file success!!");
    }
});
console.log("End write file");


console.log("Begin read file");
fs.readFile("test.txt", {encoding: 'utf-8' }, (err, data) => {
    //Write file done
    if (err) {
        console.log(err);
    } else {
        // console.log("File data: ", data);
        const dataObj = JSON.parse(data);
        console.log("File data: ", dataObj)
    }
});
console.log("End read file");