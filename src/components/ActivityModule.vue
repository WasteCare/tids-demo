<script setup>
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue';
import GalleryModule from './GalleryModule.vue';
import PendingResolution from './PendingResolution.vue';
import ActivityListItem from './ActivityListItem.vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel
} from '@headlessui/vue'

const isOpen = ref(false)

function setIsOpen(value) {
  isOpen.value = value
}

const props = defineProps({
  activity: Array
})

function itemType(update) {
  if (update.proposedResolution?.status === 'pending') {
    return PendingResolution
  }
  return ActivityListItem
}




</script>
<template>
  <TransitionGroup tag="ul" role="list" name="list" class="mt-6 space-y-6">
    <template v-for="(update, updateIdx) in activity" :key="update.update">
      <component :is="itemType(update)" :update="update" :index="updateIdx" :length="activity.length"></component>
    </template>
  </TransitionGroup>

  <!-- New comment form -->
  <div class="mt-6 flex gap-x-3">
    <img
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt="" class="size-6 flex-none rounded-full bg-gray-50">
    <form action="#" class="relative flex-auto">
      <div
        class="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <label for="comment" class="sr-only">Add your comment</label>
        <textarea rows="2" name="comment" id="comment"
          class="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
          placeholder="Add your comment..."></textarea>
      </div>

      <div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
        <div class="flex items-center space-x-5">
          <div class="flex items-center">
            <button type="button" @click="setIsOpen(true)"
              class="-m-2.5 flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
              <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd"
                  d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                  clip-rule="evenodd" />
              </svg>
              <span class="sr-only">Attach a file</span>
            </button>
          </div>
        </div>
        <button type="submit"
          class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Comment</button>
      </div>
    </form>
  </div>
  <!-- Wrap your dialog in a `TransitionRoot` to add transitions. -->
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="setIsOpen">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-xl sm:p-6">
              <div class="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
                <input type="file" class="absolute inset-0 w-full h-full opacity-0 z-50" />
                <div class="text-center">
                  <img class="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="">

                  <h3 class="mt-2 text-sm font-medium text-gray-900">
                    <label for="file-upload" class="relative cursor-pointer">
                      <span>Drag and drop</span>
                      <span class="text-indigo-600"> or browse</span>
                      <span> to upload</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only">
                    </label>
                  </h3>
                  <p class="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>

                <img src="" class="mt-4 mx-auto max-h-40 hidden" id="preview">
              </div>
              <div class="mt-5 sm:mt-6">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click="isOpen = false">Done</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>