const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const bcrypt=require('bcrypt');

let url = "mongodb://" + process.env.DB_HOST + ":27017/";

if (process.env.DB_USERNAME && process.env.DB_PASSWORD && process.env.DB_HOST) {
    url = "mongodb://" + process.env.DB_USERNAME + ':'
        + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ":27017/";
}

const COLOR_CODES = ['#3B82F6', '#F79411', '#6A76F2', '#12B76A', '#E86565', '#4DBAC4'];

const randomColorGenerator = () => {
    return COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)];
}


(async() => {
    const db = new MongoClient(url)
    const db_obj = db.db(process.env.DB_NAME);
    try {
    
        const users = [
            { fullName: 'Harsh Sanklecha', password: bcrypt.hashSync('admin@123', Number(process.env.SALT_ROUNDS)), phoneNumber: '6281563129', email: 'harsh@inncircles.com', type: 'ADMIN', colorCode: randomColorGenerator(), isActive: true },
        ]
        const updateData = users.map(data => ({
            "updateOne": {
                "filter": { email: data.email },
                "upsert": true,
                "update": { $set: data }
            }
        }))
        await db_obj.collection("users").bulkWrite(updateData, { ordered: false });
        console.log('------------ Admins Updated ------------ ')
    }catch(err) {
        console.log(err);
    }finally {
        db.close();
    }
})()

