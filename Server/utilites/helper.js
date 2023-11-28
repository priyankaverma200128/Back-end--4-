require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { S3Client,GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");



async function generatePresignedUrl (bucket,key,expiresIn = 3600){
    const command = new GetObjectCommand({
      Bucket:bucket,
      Key:key,
    })

    const signedUrl = await getSignedUrl(s3, command, { expiresIn });

    return signedUrl;
}

module.exports = {
    generatePresignedUrl
  }