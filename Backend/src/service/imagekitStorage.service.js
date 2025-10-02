const { v4: uuid } = require("uuid");
const { toFile, ImageKit } = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.ImageKit_publicKey,
  privateKey: process.env.ImageKit_privateKey,
  urlEndpoint: process.env.ImageKit_urlEndpoint,
});

async function uploadFile(file) {
  console.log("this is file =========================>", file.buffer);
  // return new Promise(async(resolve, reject)=>{
  return(
    // await client.files.upload({
    //   file: await toFile(
    //     Buffer.from(file.buffer),
    //      "file"),
    //   fileName: "fileName",
    // });

    // OR

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
