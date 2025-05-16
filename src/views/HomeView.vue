<script setup>
import BaseLayout from '../components/BaseLayout.vue'
import { ChevronRightIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
import { RouterLink } from 'vue-router'
import issues from '../services/IssuesService.js'


</script>

<template>
  <main>
    <BaseLayout>
      <ul type="list"
        class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">

        <RouterLink :to="'/update/' + issue.id" v-for="issue in issues" :key="issue.id">
          <li class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div class="flex min-w-0 gap-x-4">
              <div v-if="!issue.open"
                class="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100 min-w-12">
                <CheckIcon class="size-6 text-green-600" aria-hidden="true" />
              </div>
              <div v-if="issue.open"
                class="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100  min-w-12">
                <ExclamationTriangleIcon class="size-6  text-red-600" aria-hidden="true" />
              </div>
              <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-gray-900">
                  <a>
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ issue.businessName }}
                  </a>
                </p>
                <p class="mt-1 flex text-xs/5 text-gray-500">
                  <span class="relative truncate" v-html="issue.description">
                  </span>
                </p>
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-x-4">
              <div class="hidden sm:flex sm:flex-col sm:items-end">
                <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  :class="{ 'bg-red-50 text-red-700 ring-red-600/10': (issue.type === 'Disaster'), 'bg-yellow-50 text-yellow-800 ring-yellow-600/20': (issue.type != 'Disaster') }">{{
                    issue.type
                  }}</span>
                <p v-if="issue.lastSeen" class="mt-1 text-xs/5 text-gray-500">
                  Raised <time :datetime="issue.lastSeenDateTime">{{ issue.relativeTime }}</time>
                </p>
                <div v-else class="mt-1 flex items-center gap-x-1.5">
                  <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div class="size-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p class="text-xs/5 text-gray-500">Online</p>
                </div>
              </div>
              <ChevronRightIcon class="size-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </li>
        </RouterLink>
      </ul>
    </BaseLayout>
  </main>
</template>
