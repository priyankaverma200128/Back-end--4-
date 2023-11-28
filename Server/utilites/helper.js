require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { S3Client,GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  },
  region: process.env.AWS_REGION,
})

async function generatePresignedUrl (bucket,key,expiresIn = 3600){
    const command = new GetObjectCommand({
      Bucket:bucket,
      Key:key,
    })

    const signedUrl = await getSignedUrl(s3, command, { expiresIn });

    return signedUrl;
}
function unlinkImage(pic) {
  if (pic != undefined && pic != "") {
    fs.unlink("server/public/" + pic, (err) => {
      // if(err) console.log(err);
      // else console.log("image Replaced");
    });
  }
}

module.exports = {
    generatePresignedUrl,
    unlinkImage
  }