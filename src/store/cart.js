import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cart = reactive({
        products: [],
        total: 0
    });

    return { cart }
});