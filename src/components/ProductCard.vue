<template>
    <div v-if="product">
        <div class="mb-4 p-2" @click="viewProduct">
            <div class="product-container p-1 rounded-top">
                <div class="img-container position-relative" :style="{ backgroundImage: `url(${product.image})` }">
                </div>
            </div>
            <div class="product-body p-1">
                <div class="name mb-1">
                    <span v-if="product.title.length < 30" class="name">{{ product.title }}</span>
                    <span v-else class="name">{{ product.title.substring(0, 25) + "..." }}</span>
                </div>
                <div class="categoriy"><span class="fs-8">{{ product.category }}</span></div>
                <div class="stars mb-1">{{ product.rating.rate }}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="price">
                        <span class="fs-5 current-price">{{ product.price }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import ProductService from '@/services/product.js';
import CurrencyFormatter from '@/helpers/currency.js';

const router = useRouter();

const props = defineProps({
    productId: Number,
});
const product = ref();

onBeforeMount(async () => {
    product.value = await ProductService.getProduct(props.productId);

    product.value.price = CurrencyFormatter.toUsd(product.value.price);
});

const viewProduct = async () => {
    router.push({ name: 'Product', params: { id: product.value.id } });
};
</script>

<style scoped>
.img-container {
    width: 100%;
    height: 230px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
}

.categoriy,
.name {
    font-weight: 400;
    color: var(--bs-gray-700);
}

.price span:first-child {
    font-weight: 600;
    color: var(--im-blue-4);
}
</style>