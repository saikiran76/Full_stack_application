import s3 from '../config/s3.config.js'


// if the key is aws key then upload it from s3 to upload file
// key is unique to each and every image that is being stored
export const s3FileUpload = async({bucketName, key, body, contentType}) => {
    return await s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType
    })
    .promise()
}


// To delete the files with corresponding key
export const deleteFile = async ({bucketName, key}) => {
    return await s3.deleteObject({
        Bucket: bucketName,
        Key: key
    })
    .promise()
}