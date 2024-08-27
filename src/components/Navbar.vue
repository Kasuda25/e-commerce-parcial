<template>
    <div class="header">
        <div class="header-bg">
            <div class="row">
                <div class="col">
                    <div class="d-flex">
                        <div v-if="showBackButton" class="my-auto ms-3 me-2" @click="back">
                            <i class="fa-solid fa-arrow-left fa-xl"></i>
                        </div>
                        <ion-title size="large">{{ name }}</ion-title>
                    </div>
                </div>
                <div v-if="showCartIcon" class="col text-end my-auto me-3" @click="viewCart">
                    <i class="fa-solid fa-cart-shopping fa-xl"></i>
                </div>
            </div>
        </div class="header-bg">
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    showBackButton: Boolean,
    showCartIcon: Boolean,
    name: String,
});

const router = useRouter();

const viewCart = () => {
    router.push({ name: 'Cart' });
}

const back = () => {
    router.go(-1);
}
</script>

<style scoped>
.header {
    border-bottom: 1px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 200;
}

.header-bg {
    background-color: black;
}
</style>