<script setup>
import {
  FlagIcon, UsersIcon, ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import filters from '../services/FiltersService.js'
import dropdowns from '../services/DropdownsService.js'
import { useIssuesStore } from '../stores/issues'

const store = useIssuesStore()

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

  <!-- Filters section -->
  <h3 class="text-base font-semibold leading-6 text-gray-900">Filters</h3>

  <!-- Status filters -->
  <div class="mt-4">
    <div class="mt-2 space-y-2">
      <button v-for="filter in filters.topFilters" :key="filter.id" @click="store.activeFilters.status = filter" :class="[
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

</template>
