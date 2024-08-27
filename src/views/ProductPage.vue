<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <Navbar :showBackButton="true" :showCartIcon="true" :name="'Product Detail'" />
            <div v-if="product">
                <ProductDetail :product="product" />
            </div>
            <div class="add-btn">
                <div class="add-txt h4" @click="addToCart">Add to Cart</div>
            </div>
            <ion-toast :is-open="isOpen" message="Product added to cart." swipe-gesture="vertical" position="top"
                :duration="5000" @didDismiss="setOpen(false)" @Click="openCart"></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { IonPage, IonContent, IonToast } from '@ionic/vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import ProductService from '@/services/product.js';
import { useCartStore } from '@/store/cart.js';

const router = useRouter();
const cartStore = useCartStore();
const props = defineProps({
    id: Number,
});

const product = ref();
const isOpen = ref(false);
const setOpen = (state) => {
    isOpen.value = state;
};

onBeforeMount(async () => {
    product.value = await ProductService.getProduct(props.id);
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const addToCart = async () => {
    const productPrice = parseInt(product.value.price.substring(1));

    cartStore.cart.products.push(props.id);

    let priceInt;

    if (typeof cartStore.cart.total == 'number') {
        priceInt = cartStore.cart.total + productPrice;
    } else {
        priceInt = parseInt(cartStore.cart.total.substring(1)) + productPrice;
    };

    cartStore.cart.total = formatter.format(priceInt);
    setOpen(true);
};

const openCart = () => {
    router.push({ name: 'Cart' });
    setOpen(false);
};
</script>

<style scoped>
.add-btn {
    position: fixed;
    bottom: 0;
    height: 4em;
    background-color: Blue;
    width: 100%;
    justify-content: center;
}

.add-txt {
    text-align: center;
    vertical-align: middle;
    line-height: 3em;
}
</style>