const request = require('request');
const fs = require('fs');
const readline = require('readline');


let input = process.argv.splice(2);

let html = input[1];
let file = input[0];

const readWebsite = () => {
  request(html, (error, response, body) => {

    console.log('error:', error); // Print the error if one occurred
    if(error !== null){
      process.exit();
    }
  
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if(response.statusCode !== 200 ){
      process.exit();
    }
    
    fs.writeFile(file, body); // Print the HTML for the Google homepage.
    console.log(`Wrote ${body.length} bytes to ${file}`);
    if(body.length > 0){
      process.exit();
    } else{
      console.log('press ctrl+c to quit!')
    }
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
    if(response === 'Y' || response == 'y'){
      readWebsite();
    } else{
      console.log('CANCELLED');
      process.exit();
    }
    
  })}
  else{

    console.log('FILE DOES NOT EXIST, CREATING NEW ONE')

    readWebsite();
    

  };
})
