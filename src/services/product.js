import axios from '@/services/axios';

class ProductService {
    async getProducts() {
        const response = await axios.get('/products');
        return response.data;
    }

    async getProduct(id) {
        const response = await axios.get(`/products/${id}`);
        return response.data;
    }

    async getFromCategory(category) {
        const response = await axios.get(`/products/category/${category}`);
        return response.data;
    }
}

export default new ProductService();