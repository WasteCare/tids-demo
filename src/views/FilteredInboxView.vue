<script setup>
import {
  MagnifyingGlassIcon, ArrowsUpDownIcon, CheckIcon, PlusIcon
} from '@heroicons/vue/20/solid'
import { FlagIcon, UsersIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { RouterView } from 'vue-router'
import filters from '../services/FiltersService.js'
import dropdowns from '../services/DropdownsService.js'
import DefaultView from '../views/DefaultView.vue'
import IssuesList from '../components/IssuesList.vue'
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { useIssuesStore } from '../stores/issues'

const store = useIssuesStore()

const selectedSort = ref(store.sorts[0])
const search = ref(store.search)

// Helper functions for checkbox handling
const isTypeSelected = (filter) => store.activeFilters.type.has(filter)
const isFlaggedSelected = (filter) => store.activeFilters.flagged.has(filter)
const isDepartmentSelected = (dept) => store.activeFilters.departments.has(dept)

const toggleTypeFilter = (filter) => {
  const typeSet = store.activeFilters.type
  if (typeSet.has(filter)) {
    typeSet.delete(filter)
  } else {
    typeSet.add(filter)
  }
}

const toggleFlaggedFilter = (filter) => {
  const flaggedSet = store.activeFilters.flagged
  if (flaggedSet.has(filter)) {
    flaggedSet.delete(filter)
  } else {
    flaggedSet.add(filter)
  }
}

const toggleDepartmentFilter = (dept) => {
  const deptSet = store.activeFilters.departments
  if (deptSet.has(dept)) {
    deptSet.delete(dept)
  } else {
    deptSet.add(dept)
  }
}

</script>

<template>
  <DefaultView>
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-b border-gray-200 p-4">
      <!-- Filters section -->
      <h3 class="text-base font-semibold leading-6 text-gray-900">Filters</h3>

      <!-- Status filters -->
      <div class="mt-4">

        <div class="mt-2 space-y-2">
          <button v-for="filter in filters.topFilters" :key="filter.id" @click="store.activeFilters.status = filter"
            :class="[
              'flex w-full items-center justify-between px-0 py-2 text-sm rounded-md text-white',
              store.activeFilters.status.id === filter.id
                ? 'bg-sky-950'
                : 'hover:bg-sky-950'
            ]">
            <div class="flex items-center">
              <component :is="filter.icon" class="mr-3 size-5"
                :class="store.activeFilters.status.id === filter.id ? 'text-white' : 'text-white'" aria-hidden="true" />
              {{ filter.name }}
            </div>
            <span class="rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-medium text-white">
              {{filter.func === -1 ? store.issues.length : store.issues.filter(x => x.open === filter.func).length}}
            </span>
          </button>
        </div>
      </div>

      <!-- Flagged filters -->
      <div class="mt-6">
        <h4 class="text-sm font-medium text-white">
          <FlagIcon class="mr-3 size-5 inline-block" />
          Flagged
        </h4>
        <div class="mt-2 space-y-2">
          <label v-for="filter in filters.flaggedFilters" :key="filter.id"
            class="relative flex items-center px-3 py-2 text-sm hover:bg-sky-950  rounded-md cursor-pointer"
            :class="[isFlaggedSelected(filter) ? 'bg-sky-950' : '']">
            <div class="flex items-center h-6">
              <input type="checkbox" :checked="isFlaggedSelected(filter)" @change="toggleFlaggedFilter(filter)"
                class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600">
            </div>
            <div class="ml-3 flex justify-between flex-1">
              <span class="text-white">
                {{ filter.name }}
              </span>
              <span v-if="store.issues.filter(x => x.flagged === filter.func).length > 0"
                class="rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-medium text-white">
                {{store.issues.filter(x => x.flagged === filter.func).length}}
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- Type filters -->
      <div class="mt-6">
        <h4 class="text-sm font-medium text-white">
          <ExclamationTriangleIcon class="mr-3 size-5 inline-block" /> Type
        </h4>
        <div class="mt-2 space-y-2">
          <label v-for="filter in filters.typeFilters" :key="filter.id"
            class="relative flex items-center px-3 py-2 text-sm hover:bg-sky-950 rounded-md cursor-pointer"
            :class="[isTypeSelected(filter) ? 'bg-sky-950' : '']">
            <div class="flex items-center h-6">
              <input type="checkbox" :checked="isTypeSelected(filter)" @change="toggleTypeFilter(filter)"
                class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600">
            </div>
            <div class="ml-3 flex justify-between flex-1">
              <span class="text-white">
                {{ filter.name }}
              </span>
              <span v-if="filter.count" class="rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-medium text-white">
                {{store.issues.filter(x => x.type === filter.value).length}}
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- Department filters -->
      <div class="mt-6">
        <h4 class="text-sm font-medium text-white">
          <UsersIcon class="mr-3 size-5 inline-block" /> Team
        </h4>
        <div class="mt-2 space-y-2">
          <label v-for="dept in dropdowns.departmentResponsible" :key="dept.id"
            class="relative flex items-center px-3 py-2 text-sm hover:bg-sky-950 rounded-md cursor-pointer"
            :class="[isDepartmentSelected(dept) ? 'bg-sky-950' : '']">
            <div class="flex items-center h-6">
              <input type="checkbox" :checked="isDepartmentSelected(dept)" @change="toggleDepartmentFilter(dept)"
                class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600">
            </div>
            <div class="ml-3 flex justify-between flex-1">
              <span class="text-white">
                {{ dept.name }}
              </span>
              <span v-if="dept.count" class="rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-medium text-white">
                {{store.issues.filter(x => x.departmentResponsible === dept.value).length}}
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Main content area -->
    <main class="lg:pl-72">
      <div class="xl:pl-96">
        <!-- Main area -->

        <div class="flex flex-col w-full items-start h-screen overflow-y-auto">
          <div v-if="!$route.params.hasOwnProperty('id')" class="text-center w-full h-full bg-white">
            <svg class="mx-auto size-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              aria-hidden="true">
              <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 class="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
            <div class="mt-6">
              <button type="button"
                class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <PlusIcon class="-ml-0.5 mr-1.5 size-5" aria-hidden="true" />
                New Project
              </button>
            </div>
          </div>
          <RouterView :key="$route.path"></RouterView>
        </div>
      </div>
    </main>
    <aside class="fixed inset-y-0 left-72 w-96 overflow-y-auto border-r border-gray-200 bg-white">
      <!-- Search and sort controls -->
      <div class="sticky top-0 bg-white relative border-b border-gray-200 p-4 w-full">
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
