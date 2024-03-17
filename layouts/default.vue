<script setup lang="ts">
import Navbar from "~/components/layout/navbar.vue";
import Popup from "~/components/layout/popup.vue";
</script>

<template>
  <div class="h-screen">
    <Navbar />
    <slot />
    <Popup />
  </div>
</template>
