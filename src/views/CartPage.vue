<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <Navbar :showBackButton="true" :name="'Carrito'"/>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import Navbar from '../components/Navbar.vue';
</script>

<style scoped>
    
</style>