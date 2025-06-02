import "dotenv/config";

const env = {
    PORT: process.env.PORT || "",
    DB_URL: process.env.DB_URL || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    FRONTEND_URL: process.env.FRONTEND_URL
};

for (let key in env) {
    //@ts-ignore
    if (!env[key]) {
        console.log(`Missing key: ${key} in .env file`);
        process.exit(1);
    }
}

export default env;