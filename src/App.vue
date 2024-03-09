<template>
  <main class="flex flex-col items-center bg-slate-100">
    <Transition appear name="fade">
      <div
        class="sm:container flex items-center h-screen flex-col grow gap-4 p-5 pb-0"
      >
        <CustomInput v-model="searchValue" placeholder="Find by author">
          <template #icon-indicator>
            <Icon class="text-lg text-gray-500" icon="mingcute:search-3-line" />
          </template>
          <template #icon-action-button>
            <Transition name="fade">
              <Icon
                class="text-xl text-neutral-900 cursor-pointer hover:bg-gray-400/20 rounded-full"
                icon="mingcute:close-line"
                v-if="searchValue.length"
                @click="resetField"
              />
            </Transition>
          </template>
        </CustomInput>
        <Transition name="fade" mode="out-in">
          <CustomLoader v-if="isLoading" color="#0ea5e9" />
          <section
            class="publicationsList grow w-full grid auto-rows-max grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 overflow-auto basis-0 pb-5 scroll-smooth px-3 -mx-3"
            v-else-if="postsToShow.length"
          >
            <TransitionGroup name="list">
              <PublicationCard
                v-for="post in postsToShow"
                :key="post.id"
                :title="post.title"
                :content="post.body"
                :author="post.userName"
              />
            </TransitionGroup>
          </section>
          <div class="emptyList flex flex-col items-center" v-else>
            <p>Author not found. :c</p>
            <span
              class="cursor-pointer text-sky-500 font-semibold"
              @click="resetField"
            >
              Reset field?
            </span>
          </div>
        </Transition>
      </div>
    </Transition>
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

const isLoading = ref(true);
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

const resetField = () => {
  searchValue.value = "";
};

const initPage = async () => {
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);
  postsList.value = posts.map((post: Post) => {
    return {
      ...post,
      userName: users.find((user: User) => user.id === post.userId)!.name,
    };
  });
  isLoading.value = false;
};

initPage();
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
  opacity: 0;
  transition: none;
}
</style>
