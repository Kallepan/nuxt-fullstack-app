<script lang="ts" setup>
const popupStore = useState("popup");
// initialize the store with an object
popupStore.value = { display: false, message: "" };

const popup = computed(() => popupStore.value);

function closePopup() {
  popupStore.value = { display: false, message: "" };
}
</script>
<template>
  <div v-if="popup.display" class="fixed bottom-4 left-4">
    <div class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-between">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span class="font-semibold">{{ popup.message }}</span>
      </div>
      <button class="text-white bg-transparent border border-white px-3 py-1 rounded-md hover:bg-white hover:text-blue-500 ml-4" @click="closePopup()">Dismiss</button>
    </div>
  </div>
</template>
