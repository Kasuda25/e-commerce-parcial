<template>
    <ion-card>
        <ion-card-content @Click="removeItem(product.id)">
            <div v-if="product">
                <div class="row">
                    <div class="col-3">
                        <div class="product-container">
                            <div class="img-container position-relative"
                                :style="{ backgroundImage: `url(${product.image})` }">
                            </div>
                        </div>
                    </div>
                    <div class="col-6">{{ product.title }}</div>
                    <div class="col">
                        <div class="text-end">{{ product.price }}</div>
                        <div class="h-100 delete"><i class="fa-solid fa-trash fa-sm"></i></div>
                    </div>
                </div>
            </div>
        </ion-card-content>
    </ion-card>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { IonCard, IonCardContent, IonToast } from '@ionic/vue';
import ProductService from '@/services/product.js';
import CurrencyFormatter from '@/helpers/currency.js';
import { useCartStore } from '@/store/cart';

const cartStore = useCartStore();

const emit = defineEmits();
const props = defineProps({
    productId: Number,
});

const product = ref();

onBeforeMount(async () => {
    product.value = await ProductService.getProduct(props.productId);

    product.value.price = CurrencyFormatter.toUsd(product.value.price);
});

const removeItem = (id) => {
    const idInt = id.toString();

    const index = cartStore.cart.products.indexOf(idInt);
    if (index > -1) {
        cartStore.cart.products.splice(index, 1);
    }

    const totalInt = parseInt(cartStore.cart.total.substring(1));
    const productPriceInt = parseInt(product.value.price.substring(1));

    const total = totalInt - productPriceInt;

    cartStore.cart.total = CurrencyFormatter.toUsd(total);
};
</script>

<style scoped>
.img-container {
    width: 100%;
    height: 80px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
}

.delete {
    text-align: end;
    line-height: 3em;
}
</style>