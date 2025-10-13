const { v4: uuid } = require("uuid");
const { toFile, ImageKit } = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  // console.log("this is file imagekit storage service =============>", file.buffer);
  return(
    await client.files.upload(
      {
        file: await toFile(file.buffer, file),      
        fileName: uuid(),
        folder: "Feelify",  
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
);
}

module.exports = uploadFile;
