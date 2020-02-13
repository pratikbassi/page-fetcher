const request = require('request');
const fs = require('fs');
const readline = require('readline');


let input = process.argv.splice(2);

let html = input[1];
let file = input[0];

const readWebsite = () => {
  request(html, (error, response, body) => {
    //console.log('error:', error); // Print the error if one occurred
  
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    fs.writeFile(file, body); // Print the HTML for the Google homepage.
    console.log(`Wrote ${body.length} bytes to ${file}`);
  });
}
let response = '';

fs.exists(file, (exists) => {
  if(exists){
  let data = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  data.question('Do you want to proceed? File already exists. Type Y to continue and N to cancel', (answer) => {
    response = answer;
  

    if(response === 'Y'){
      readWebsite();
    } else{
      console.log('CANCELLED');
    }
  })}
  else{readWebsite()};
})
