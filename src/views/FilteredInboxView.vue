<script setup>
import {
  MagnifyingGlassIcon, ArrowsUpDownIcon, CheckIcon, PlusIcon, XMarkIcon
} from '@heroicons/vue/20/solid'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { RouterView } from 'vue-router'
import DefaultView from '../views/DefaultView.vue'
import IssuesList from '../components/IssuesList.vue'
import SidebarMenu from '../components/SidebarMenu.vue'
import CreateIssue from '../components/CreateIssue.vue'
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { useIssuesStore } from '../stores/issues'
import WCButton from '../components/WCButton.vue'

const store = useIssuesStore()

const selectedSort = ref(store.sorts[0])
const search = ref(store.search)
const sidebarOpen = ref(false)

</script>

<template>
  <DefaultView>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>



        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 bg-wc">
                <SidebarMenu />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- Static sidebar for desktop -->
    <!-- Static sidebar for desktop -->
    <div class="hidden xl:fixed lg:inset-y-0 lg:z-50 xl:flex xl:w-72 xl:flex-col border-b border-gray-200 p-4">
      <SidebarMenu />
    </div>




    <!-- Main content/Issue area desktop -->
    <main class="hidden lg:block xl:pl-72">
      <div class="lg:pl-96">
        <!-- Main area -->
        <div class="flex flex-col w-full items-start h-screen overflow-y-auto">
          <CreateIssue v-if="!$route.params.hasOwnProperty('id')" />
          <RouterView :key="$route.path"></RouterView>
        </div>
      </div>
    </main>

    <TransitionRoot as="template" :show="store.issueIsOpen">
      <Dialog class="relative z-50 lg:hidden" @close="store.issueIsOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="translate-x-full">
            <DialogPanel class="relative flex w-full flex-1">
              <div class="flex flex-col w-full items-start h-screen overflow-y-auto">
                <RouterView :key="$route.path"></RouterView>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Task List Headers -->
    <aside class="fixed w-full inset-y-0 xl:left-72 lg:w-96 overflow-y-auto border-r border-gray-200 bg-white">
      <!-- Search and sort controls -->
      <div
        class="sticky lg:hidden top-0 relative border-b border-gray-200 p-4 w-full flex flex-row justify-between bg-wc z-10">
        <button @click="sidebarOpen = true" class="p-2">
          <Bars3Icon class="size-5 text-white" aria-hidden="true" />
        </button>
        <WCButton solid>Add Task</WCButton>
      </div>
      <div class="lg:sticky top-0 bg-white relative border-b border-gray-200 p-4 w-full">
        <form class="flex gap-x-4" action="#">
          <div class="flex-1 min-w-0">
            <div class="relative">
              <input type="search" v-model="search"
                class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
                placeholder="Search issues..." />
              <MagnifyingGlassIcon
                class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400"
                aria-hidden="true" />
            </div>
          </div>

          <Listbox v-model="selectedSort">
            <div class="relative">
              <ListboxButton
                class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <ArrowsUpDownIcon class="size-5" aria-hidden="true" />
              </ListboxButton>

              <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                  class="absolute right-0 z-10 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  <ListboxOption v-for="sort in sorts" :key="sort.id" :value="sort" v-slot="{ active, selected }">
                    <li
                      :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                        {{ sort.value }}
                      </span>
                      <span v-if="selected"
                        :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                        <CheckIcon class="size-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </form>
      </div>

      <!-- Issues List -->
      <IssuesList />
    </aside>

    <!-- Router View for Issue Details -->

  </DefaultView>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
