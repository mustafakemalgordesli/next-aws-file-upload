"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const ACCEPTED_CONTENT_TYPES = ["png", "gif", "svg", "jpg", "jpeg"];

const uploadImage = async function ({
  file,
  fileName,
  fileContent,
  bucketName,
}: {
  file: File;
  fileName?: string;
  fileContent?: string;
  bucketName?: string;
}) {
  if (!fileName) fileName = file.name;
  if (!bucketName) bucketName = process.env.BUCKET_NAME;
  if (!fileContent) {
    const fileContentArray = fileName.split(".");
    fileContent = fileContentArray[fileContentArray.length - 1];
  }
  if (!ACCEPTED_CONTENT_TYPES.some((item) => item == fileContent)) return null;

  fileName = uuidv4() + fileName;
  fileName = fileName.replace(/\s/g, "");

  const fileBody: ArrayBuffer = await file.arrayBuffer();

  const result = await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: Buffer.from(fileBody),
      ContentType: `image/${fileContent}`,
    })
  );
  return {
    result: result,
    filePath: fileName,
  };
};

export default uploadImage;
