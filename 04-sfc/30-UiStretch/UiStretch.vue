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

:slotted(img, video, picture) {
  object-fit: scale-down;
}
</style>
