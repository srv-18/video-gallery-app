import "dotenv/config";

const env = {
    PORT: process.env.PORT || "",
    DB_URL: process.env.DB_URL || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
};

for (let key in env) {
    //@ts-ignore
    if (!env[key]) {
        console.log(`Missing key: ${key} in .env file`);
        process.exit(1);
    }
}

export default env;