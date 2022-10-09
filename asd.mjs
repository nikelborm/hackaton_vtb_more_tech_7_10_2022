import {generateKeyPairSync, createSign} from 'crypto';
import crypto from 'crypto';

const {
  publicKey,
  privateKey,
} = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
});

console.log('publicKey: ', Buffer.from(publicKey).toString('base64'));
console.log('\n\nprivateKey: ', Buffer.from(privateKey).toString('base64'));




const privateKeyOfIssuer = privateKey;

const sign = createSign('RSA-SHA256');
sign.update('abcdef'); // data from your file would go here
const signature = sign.sign(privateKeyOfIssuer, 'hex');
console.log('signature: ', signature);

const verify = crypto.createVerify('RSA-SHA256');
verify.write('abcdef');
verify.end();
console.log(verify.verify(publicKey, signature,'hex'));
