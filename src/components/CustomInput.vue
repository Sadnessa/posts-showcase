<template>
  <div
    class="customInput flex h-9 bg-white border-2 rounded overflow-hidden focus-within:border-sky-500"
  >
    <div
      class="customInput__indicator flex items-center justify-center w-9 border-r-2"
      v-if="$slots['icon-indicator']"
    >
      <slot name="icon-indicator" />
    </div>
    <input
      class="outline-none p-2"
      v-model="inputValue"
      :placeholder="props.placeholder"
    />
    <div
      class="customInput__actionButton flex items-center justify-center w-9"
      v-if="$slots['icon-action-button']"
    >
      <slot name="icon-action-button" />
    </div>
  </div>
</template>

<script setup lang="ts">
const inputValue = defineModel();

const props = defineProps<{ placeholder?: string }>();
</script>
