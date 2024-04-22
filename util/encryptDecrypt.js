import crypto from 'crypto';
const algorithm = 'aes-256-cbc'; //Using AES encryption


export const generatedKey = () => {
   return crypto.randomBytes(32);
}

export const generatedIV = () => {
   return crypto.randomBytes(16);
}

//Encrypting text
export const encrypt = (text) => {
   let cipher = crypto.createCipheriv(algorithm, Buffer.from(generatedKey()), generatedIV());
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: generatedIV().toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
export const decrypt = (text) => {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv(algorithm, Buffer.from(generatedKey()), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

// Encrypting text with key
export const encryptWithKey = (text, key) => {
   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), generatedIV());
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: generatedIV().toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text with key
export const decryptWithKey = (text, key) => {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

// Encrypting text with key and iv
export const encryptWithKeyAndIV = (text, key, iv) => {
   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
