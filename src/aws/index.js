import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";



const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: import.meta.env.VITE_AMAZON_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_AMAZON_SECRET_KEY
    },
})

async function putObject(data, type) {
    const command = new PutObjectCommand({
        Bucket: "crypto-hunter-bucket",
        Key: "uploads/user-uploads/crypto-hunter-data",
        ContentType: type,
        Body: data
    });
    await s3Client.send(command);
}

// async function deleteObject(key) {
//     const command = new DeleteObjectCommand({
//         Bucket: "private-bucketdemo",
//         Key: key
//     })
//     await s3Client.send(command);
// }

async function getObjectData(key) {
    let val;
    const command = new GetObjectCommand({
        Bucket: "crypto-hunter-bucket",
        Key: "uploads/user-uploads/crypto-hunter-data"//key
    })
    // return await s3Client.send(command);
    
    const obj = await s3Client.send(command);

    obj.Body.transformToString('utf-8').then(async (data) => {
        return await JSON.parse(data);
        
    });
    // console.log(val);
    
}

export const putData = async (data) => {
    // console.log("URL of the image is :", await getObjectURL("serverless/\T10:09:58.663Z/serverless"));
    putObject(JSON.stringify(data), 'text/plain');
}
export const getAwsData = async () => {
    return getObjectData();
}