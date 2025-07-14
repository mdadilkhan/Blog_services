import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "crypto"; //used to geenrate unique file name
import config from "../config";

const region = config.awsRegion;
const bucketName = config.awsBucketName;
const awsAccessKey = config.awsAccessKey;
const awsSecretKey = config.awsSecretKey;

// ✅ Setup S3 client correctly
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
});

type PutObjectUrlOptions = {
  folder: string; // e.g., "blog-app/profilePic"
  contentType: string; // e.g., "image/png"
  cacheControl?: string; // optional custom cache header
};

export const getPresignedPutUrl = async ({
  folder,
  contentType,
  cacheControl = "public, max-age=604800", // default cache for one week
}: PutObjectUrlOptions) => {

  const bytes = await randomBytes(16);
  const id = bytes.toString("hex");// creatign unique id always

  const key = `${folder}/${id}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
    CacheControl: cacheControl,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  const cloudfrontUrl = `${config.awsCloudFrontDomain}/${key}`;

  return {
    uploadUrl: url, // for the actual PUT request
    key, // object key in S3
    publicUrl: cloudfrontUrl, // CDN-accessible URL to store in DB
  };
};

// this fucnton is used to get those file which is presnt in private bucket
export const getObjectUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  return signedUrl;
};

// async function call(){
//    const { uploadUrl, key,publicUrl } = await getPresignedPutUrl({folder: "blog-app/blog",fileName: "",contentType: "image/jpeg",});
//    console.log(uploadUrl);
//    console.log(key);
//    console.log("public",publicUrl);

// }

// call()

// async function call1() {
//   const ans = await getObjectUrl("blog-app/profilePic/123abc");
//   console.log(ans);
// }

// call1();
