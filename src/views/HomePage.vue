<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Navbar :showBackButton="false" :showCartIcon="true" :name="'Virtual Store'" />

      <div id="container pt-3">
        <div class="pt-5 pb-3 px-5">
          <ion-select placeholder="Category" v-model="category" @ionChange="handleChange()">
            <ion-select-option value="all">All</ion-select-option>
            <ion-select-option value="electronics">Electronics</ion-select-option>
            <ion-select-option value="jewelery">Jewelery</ion-select-option>
            <ion-select-option value="men's clothing">Men's clothing</ion-select-option>
            <ion-select-option value="women's clothing">Women's clothing</ion-select-option>
          </ion-select>

        </div>
        <div class="row row-cols-2">
          <div v-for="product in products" :key="product">
            <ProductCard :productId="product.id" />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/vue';

import Navbar from '../components/Navbar.vue';
import ProductService from '@/services/product.js';
import ProductCard from '@/components/ProductCard.vue';

const products = ref();
const categories = ref();
const category = ref();

onBeforeMount(async () => {
  products.value = await ProductService.getProducts();
});

const handleChange = async () => {
  if (category.value == 'all') {
    products.value = await ProductService.getProducts();
  } else {
    products.value = await ProductService.getFromCategory(category.value);
  };
};
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
