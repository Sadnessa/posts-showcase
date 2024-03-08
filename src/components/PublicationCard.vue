<template>
  <div
    class="publicationCard flex flex-col gap-2.5 shadow-sm bg-white rounded p-4 py-5 border"
  >
    <div
      class="publicationCard__title text-sky-500 text-xl first-letter:capitalize font-semibold"
    >
      {{ props.title }}
    </div>
    <div
      class="publicationCard__content first-letter:capitalize text-neutral-900"
    >
      {{ props.content }}
    </div>
    <div
      class="publicationCard__author first-letter:capitalize grow flex items-end text-gray-400 text-sm"
    >
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
