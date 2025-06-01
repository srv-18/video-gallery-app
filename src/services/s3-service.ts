import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import env from "../env/variables";

const s3 = new S3({
  endpoint: env.S3_ENDPOINT as string,
  region: env.S3_REGION as string,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY as string,
    secretAccessKey: env.S3_SECRET_KEY as string,
  },
  forcePathStyle: true,
});

export const uploadToS3Storage = async (file: Express.Multer.File) => {
    try {
        const fileKey = `${Date.now()}-${file.originalname.replace(
            /[^a-zA-Z0-9.-]/g,
            "_"
        )}`;

        const upload = new Upload({
            client: s3,
            params: {
                Bucket: env.S3_BUCKET_NAME,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
                ContentLength: file.size,
                ACL: "public-read",
            },
        });

        await upload.done();
        return `${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${fileKey}`;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
};

export const deleteFromS3Storage = async (fileUrl: string) => {
    try {
        const key = fileUrl.split(`${env.S3_BUCKET_NAME}/`)[1];
        
        await s3.deleteObject({
            Bucket: env.S3_BUCKET_NAME as string,
            Key: key,
        });
    } catch (error) {
        console.error("Error deleting file from S3:", error);
        throw error;
    }
};