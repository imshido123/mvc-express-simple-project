/*SERVICES*/

const MongoLib = require('../lib/mongo');

class ProductsService {
    constructor() {
        this.collection = 'products';
        this.mongoDb = new MongoLib();
    }

    // Deconstructing parameters upon receiving the info
    async getProducts({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const products = await this.mongoDb.getAll(this.collection, query);

        return products || [];
    }

    async getProduct({ productId }) {
        const product = await this.mongoDb.get(this.collection, productId);

        return product || {};
    }

    async createProduct({ product }) {
        const createdProductId = await this.mongoDb.create(this.collection, product);

        return createdProductId;
    }

    async updateProduct({ productId, product }) {
        const updatedProductId = await this.mongoDb.update(this.collection, productId, product);

        return updatedProductId;
    }

    async deleteProduct({ productId }) {
        const deletedProductId = await this.mongoDb.delete(this.collection, productId);

        return deletedProductId || productId;
    }
};

module.exports = ProductsService;