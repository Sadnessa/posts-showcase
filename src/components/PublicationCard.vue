<template>
  <div
    class="publicationCard flex flex-col gap-2.5 shadow-sm bg-white rounded p-4 border"
  >
    <div
      class="publicationCard__title text-sky-500 font-semibold first-letter:capitalize"
    >
      {{ props.title }}
    </div>
    <div class="publicationCard__content first-letter:capitalize">
      {{ props.content }}
    </div>
    <div class="publicationCard__author first-letter:capitalize">
      {{ props.author }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  content: string;
  author: string;
}>();
</script>
