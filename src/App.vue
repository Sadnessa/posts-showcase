<template>
  <main class="flex items-center flex-col h-screen bg-slate-100 p-5 gap-4">
    <CustomInput v-model="searchValue" placeholder="Find by author">
      <template #icon-indicator>
        <Icon class="text-lg text-slate-500" icon="mingcute:search-3-line" />
      </template>
    </CustomInput>
    <section
      class="publicationsList flex grow basis-0 items-start flex-wrap gap-3 overflow-auto"
    >
      <PublicationCard
        v-for="i in 10"
        :key="i"
        title="JopaJopaJopa"
        content="Fdkfsdkfksd lsdfl sdlk fksdk s;fldskflskdfk lfskdflskfls"
        author="Jopa Popa"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

import PublicationCard from "./components/PublicationCard.vue";
import CustomInput from "./components/CustomInput.vue";

import { Icon } from "@iconify/vue";

const searchValue = ref("");
</script>
