const { MongoClient, ObjectId } = require('mongodb');
const config  = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD= encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true`; //prettier-ignore

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if(err) {
                    reject(err);
                }
                
                console.log('Connection succsessful');
                resolve(this.client.db(this.dbName));
            })
        });
    }

    async getAll(collection, query) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .find(query)
                .toArray();
        });
    }

    async get(collection, id) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .findOne({ _id: ObjectId(id) });
        });
    }

    async create(collection, data) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .insertOne(data);
        }).then(result => result.insertedId);
    }

    async update(collection, id, data) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }

    async delete(collection, id) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .deleteOne({ _id: ObjectId(id) });
        }).then(result => id);
    }
}

module.exports = MongoLib;