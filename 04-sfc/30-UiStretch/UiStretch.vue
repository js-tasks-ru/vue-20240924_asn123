<script setup></script>

<template>
  <div class="stretch-container">
    <slot />
  </div>
</template>

<style scoped>
.stretch-container>* {
  width: 100%;
  height: 100%;
}

.stretch-container {

  :slotted(img),
  :slotted(video),
  :slotted(picture) {
    object-fit: scale-down;
  }
}
</style>
