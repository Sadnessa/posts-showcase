<template>
  <div class="loader" v-show="showLoader"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "#fff",
  },

  showDelay: {
    type: Number,
    default: 300,
  },
});

onMounted(() => {
  setTimeout(() => {
    showLoader.value = true;
  }, delay.value);
});

const showLoader = ref(false);

const loaderColor = computed(() => {
  return props.color;
});

const delay = computed(() => {
  return props.showDelay;
});
</script>

<style lang="scss" scoped>
.loader {
  width: 65px;
  aspect-ratio: 1;
  position: relative;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  aspect-ratio: 1;
  border-radius: 50px;
  box-shadow: 0 0 0 3px inset v-bind(loaderColor);
  animation: l5 1s infinite linear alternate;
}
.loader:after {
  inset: auto 0 0 auto;
  animation-delay: -1s;
}
@keyframes l5 {
  0% {
    width: 20px;
  }
  100% {
    width: 50px;
  }
}
</style>
