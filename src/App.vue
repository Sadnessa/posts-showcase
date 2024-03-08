<template>
  <main class="flex flex-col items-center bg-slate-100">
    <div
      class="sm:container flex items-center h-screen flex-col grow gap-4 p-5 pb-0"
    >
      <CustomInput v-model="searchValue" placeholder="Find by author">
        <template #icon-indicator>
          <Icon class="text-lg text-slate-500" icon="mingcute:search-3-line" />
        </template>
      </CustomInput>
      <CustomLoader v-if="!postsToShow.length" />
      <section
        v-else
        class="publicationsList grow grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 overflow-auto basis-0 pb-5 scroll-smooth px-3 -mx-3"
      >
        <PublicationCard
          v-for="post in postsToShow"
          :key="post.id"
          :title="post.title"
          :content="post.body"
          :author="post.userName"
        />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { getPosts, getUsers } from "./api";

import PublicationCard from "./components/PublicationCard.vue";
import CustomInput from "./components/CustomInput.vue";
import CustomLoader from "./components/CustomLoader.vue";

import { Icon } from "@iconify/vue";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  userName: string;
}

interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
  phone: string;
  website: string;
  company: object;
  address: object;
}

const searchValue = ref("");

const postsList = ref<Post[]>([]);

const postsToShow = computed(() => {
  if (searchValue.value.length) {
    return postsList.value.filter((el) => {
      return el.userName
        .toLowerCase()
        .includes(searchValue.value.toLowerCase());
    });
  } else {
    return postsList.value;
  }
});

const initPage = async () => {
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);
  postsList.value = posts.map((post: Post) => {
    return {
      ...post,
      userName: users.find((user: User) => user.id === post.userId)!.name,
    };
  });
};

initPage();
</script>
