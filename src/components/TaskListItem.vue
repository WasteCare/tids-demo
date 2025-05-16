<script setup>
import {
  ChevronRightIcon, CheckIcon, ExclamationTriangleIcon, FlagIcon
} from '@heroicons/vue/20/solid'
import { useIssuesStore } from '../stores/issues'

const props = defineProps({
  issue: {
    type: Object,
    required: true
  }
})

const store = useIssuesStore()

const toggleFlag = () => {
  store.toggleFlag(props.issue.id)
}
</script>

<template>
  <li class="flex flex-row gap-x-4 border-l-8 pl-4 px-2 py-5"
    :class="{ 'border-green-600': (issue.unseenUpdates > 0), 'border-white': (issue.unseenUpdates == 0 || issue.unseenUpdates == null) }">
    <div>
      <div v-if="!issue.open" class="mx-auto flex size-8 items-center justify-center rounded-full bg-green-100 min-w-8">
        <CheckIcon class="size-4 text-green-600" aria-hidden="true" />
      </div>
      <div v-if="issue.open" class="mx-auto flex size-8 items-center justify-center rounded-full bg-red-100  min-w-8">
        <ExclamationTriangleIcon class="size-4  text-red-600" aria-hidden="true" />
      </div>
    </div>
    <div class="flex-auto">
      <div class="flex items-baseline justify-between gap-x-4">
        <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
          :class="{ 'bg-red-50 text-red-700 ring-red-600/10': (issue.type === 'Disaster'), 'bg-yellow-50 text-yellow-800 ring-yellow-600/20': (issue.type != 'Disaster') }">
          {{ issue.type }}
        </span>
        <p class="flex flex-row gap-x-2 text-blue-200">
          <button @click.prevent="toggleFlag" class="hover:scale-110 transition-transform">
            <FlagIcon class="size-4" :class="{ 'text-red-600': issue.flagged, 'text-gray-300': !issue.flagged }"
              aria-hidden="true" />
          </button>
          <time class="text-xs text-gray-600" :datetime="issue.lastSeenDateTime">{{ issue.relativeTime }}</time>
        </p>
      </div>
      <p class="mt-1 line-clamp-2 text-sm/6 text-gray-600" v-html="issue.businessName"></p>
      <div class="flex items-center justify-between flex-row">
        <p class="mt-1 line-clamp-2 text-sm/6 text-re" v-html="issue.description"></p>
        <div class="size-4">
          <ChevronRightIcon class="size-4 text-grey-800" aria-hidden="true" />
        </div>
      </div>
      <p class="mt-1 line-clamp-2 text-sm text-gray-400">{{ issue.departmentResponsible }} <span
          v-if="issue.delegatedPerson != null"> - {{ issue.delegatedPerson }}</span></p>
    </div>
  </li>
</template>
