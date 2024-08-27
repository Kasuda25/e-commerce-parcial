<template>
    <div class="container pt-5 px-3">
        <div v-if="product">
            <div class="pt-5">
                <div class="pb-3 px-4">
                    <h2>{{ product.title }}</h2>
                </div>
                <div class="px-4">
                    <div class="img-container position-relative" :style="{ backgroundImage: `url(${product.image})` }">
                    </div>
                </div>
                <div class="pt-3 px-4">
                    <div class="row">
                        <div class="col text-start">{{ product.category }}</div>
                        <div class="col text-end"><span class="fs-5">{{ product.price }}</span></div>
                    </div>
                </div>
                <div class="pt-3 px-4">
                    <div>Description</div>
                    <div class="mt-2">{{ product.description }}</div>
                </div>
                <div class="pt-3 px-4 bottom">
                    <div class="row">
                        <div class="col text-center"><span class="fs-5">Bought: {{ product.rating.count }}+</span></div>
                        <div class="col text-center"><span class="fs-5">{{ product.rating.rate }}<i class="fa-regular fa-star fa-sm"></i></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';

const props = defineProps({
    product: Object,
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

onBeforeMount(() => {
    props.product.price = formatter.format(props.product.price);
});
</script>

<style scoped>
.img-container {
    width: 100%;
    height: 350px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
}

.bottom {
    padding-bottom: 6em;
}
</style>