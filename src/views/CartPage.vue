<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <Navbar :showBackButton="true" :showCartIcon="false" :name="'Cart'" />
            <div v-if="!cartStore.cart.products[0]" class="pt-5">
                <div class="no-cart h4 py-3">Empty Cart</div>
            </div>
            <div v-else class="pt-5">
                <div v-for="item in cartStore.cart.products" :key="item">
                    <CartDetail :productId="item" @Click="setOpen(true)" />
                </div>
                <div class="px-4 text-end">
                    {{ cartStore.cart.total }}
                </div>
            </div>
            <div v-if="cartStore.cart.products[0]">
                <div class="buy-btn">
                    <div class="buy-txt h4" @click="buy">Payment</div>
                </div>
            </div>
            <ion-toast :is-open="isOpen" message="Product removed from cart." swipe-gesture="vertical" position="top"
                :duration="5000" @didDismiss="setOpen(false)"></ion-toast>
            <ion-toast :is-open="isOpen2" message="Payed with success." swipe-gesture="vertical" position="top"
                :duration="5000" @didDismiss="setOpen2(false)"></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Navbar from '@/components/Navbar.vue';
import CartDetail from '@/components/CartDetail.vue';
import { useCartStore } from '@/store/cart';

const cartStore = useCartStore();
const isOpen = ref(false);
const isOpen2 = ref(false);
const setOpen = (state) => {
    isOpen.value = state;
};
const setOpen2 = (state) => {
    isOpen2.value = state;
};

const buy = () => {
    cartStore.cart.products.length = 0;
    cartStore.cart.total = 0;

    setOpen2(true);
}
</script>

<style scoped>
.no-cart {
    text-align: center;
    vertical-align: middle;
    line-height: 3em;
}

.buy-btn {
    position: fixed;
    bottom: 0;
    height: 4em;
    background-color: Blue;
    width: 100%;
    justify-content: center;
}

.buy-txt {
    text-align: center;
    vertical-align: middle;
    line-height: 3em
}
</style>