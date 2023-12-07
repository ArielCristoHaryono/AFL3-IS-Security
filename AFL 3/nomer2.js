// File names for dictionary and MD5 hash file
const wordListFileName = '500-worst-passwords.txt';
const hashedPasswordFileName = 'hashed-password.txt';
const fs = require('fs');

// Function to read a file
function readFile(file) {
 return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
 });
}

// Function to calculate MD5 hash
function md5(text) {
 return crypto.createHash('md5').update(text).digest('hex');
}

// Function to check a password
const crypto = require('crypto');
async function checkPassword(password) {
 const hashedPassword = await readFile(hashedPasswordFileName);
 return hashedPassword === md5(password);
}

// Main function to perform dictionary attack
async function main() {
 const wordList = await readFile(wordListFileName);
 const words = wordList.split('\n');

 for (const word of words) {
    if (await checkPassword(word)) {
      console.log(`Password found: ${word}`);
      break;
    }
 }
}

main().catch(console.error);