<script setup>
import GalleryModule from './GalleryModule.vue';

defineProps({
  update: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: false,
  },
  length: {
    type: Number,
    required: false,
  },
});
</script>

<template>
  <li class="relative flex gap-x-4">
    <div :class="[index === length - 1 ? 'h-6' : '-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
      <div class="w-px bg-gray-200"></div>
    </div>

    <img :src="'https://xsgames.co/randomusers/avatar.php?g=male'" alt=""
      class="relative mt-0 -ml-2.5 size-12 flex-none rounded-full bg-gray-50" />
    <div class="flex-auto bg-white">
      <div class="flex justify-between gap-x-4">
        <div class="py-0.5 text-gray-500">
          <span class="font-medium text-gray-900">{{ update.loggedBy }}</span> commented
        </div>
        <time :datetime="update.timestamp" class="flex-none py-0.5 text-xs/5 text-gray-500">{{ update.relativeTime
        }}</time>
      </div>
      <p class="text-sm/6 text-gray-500">{{ update.update }}</p>
      <GalleryModule v-if="update.images != null" :files="update.images"></GalleryModule>
    </div>
  </li>
</template>
