const crypto = require('crypto');

const hashPin = '5531a5834816222280f20d1ef9e95f69'; // hash PIN
const pinLength = 4;
const characters = '0123456789';

function generatePins(length) {
 let pins = [];
 const totalChars = characters.length;
  
 function helper(currentPin, length) {
    if(length === 0) {
      pins.push(currentPin);
      return;
    }
    
    for(let i = 0; i < totalChars; i++) {
      helper(currentPin + characters[i], length - 1);
    }
 }
  
 helper('', length);
 return pins;
}

function findPin(hash) {
 const pins = generatePins(pinLength);
  
 for(let pin of pins) {
    const md5Hash = crypto.createHash('md5').update(pin).digest('hex');
    
    if(md5Hash === hash) {
      return pin;
    }
 }
  
 return null;
}

const pin = findPin(hashPin);

if(pin) {
 console.log(`PIN ditemukan: ${pin}`);
} else {
 console.log('PIN tidak ditemukan');
}