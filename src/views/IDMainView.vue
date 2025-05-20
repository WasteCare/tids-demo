<script setup>
//import DefaultView from './DefaultView.vue';
import GalleryModule from '../components/GalleryModule.vue'
import ActivityModule from '@/components/ActivityModule.vue';
import { CalendarDaysIcon, LockOpenIcon, LockClosedIcon, ArrowRightCircleIcon, ArrowUturnLeftIcon } from '@heroicons/vue/20/solid'
import { ArrowsUpDownIcon } from '@heroicons/vue/24/outline'
import AttachmentsComponent from '@/components/AttachmentsComponent.vue';
import EmphasisWord from '@/components/EmphasisWord.vue';
import { ref } from 'vue';
import { useIssuesStore } from '../stores/issues'

const store = useIssuesStore()

const props = defineProps({
  id: String,
  filter: String
})



const issue = ref(store.getIssueById(parseInt(props.id, 10)))
issue.value.unseenUpdates = 0
store.issueIsOpen = true
//store.taskListOpen = false

let updates = ref([...issue.value.updates].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
let sortAscending = true

function sortUpdates() {
  sortAscending = !sortAscending
  updates.value = [...updates.value].sort((a, b) =>
    (sortAscending ? 1 : -1) * (new Date(a.timestamp) - new Date(b.timestamp))
  )
}

</script>

<template>


  <aside v-if="issue != null && !store.taskListOpen"
    class="sticky top-0 shrink-0 w-full bg-white border-b border-gray-200 z-10">

    <div class="flex flex-row justify-between shrink-0  px-4 py-6 sm:px-6 lg:pr-8 xl:pr-6">

      <div class="space-x-5 flex flex-row w-full">
        <div class="flex items-center justify-between w-full">
          <button class="lg:hidden" @click="store.issueIsOpen = false">
            <ArrowUturnLeftIcon class="size-5 text-gray-400" aria-hidden="true" />
          </button>
          <div class="flex items-center space-x-2">
            <LockOpenIcon v-if="issue.open" class="h-6 w-5 text-green-500"></LockOpenIcon>
            <span v-if="issue.open" class="text-sm font-medium text-green-700">Open {{
              issue.type }}</span>
            <LockClosedIcon v-if="!issue.open" class="h-6 w-5 text-gray-400">
            </LockClosedIcon>
            <span v-if="!issue.open" class="text-sm font-medium text-gray-500">Closed {{
              issue.type }}</span>

            <div class="flex items-center space-x-2">
              <CalendarDaysIcon class="h-6 w-5 text-gray-400" aria-hidden="true" />
              <span class="text-sm font-medium text-gray-500">Opened {{ issue.relativeTime
              }}</span>
            </div>
          </div>
        </div>

      </div>




    </div>
  </aside>
  <main v-if="issue != null" class="flex-1 lg:border-l border-gray-200 bg-white w-full">
    <div class="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
      <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6 border-gray-400">
        <div>
          <h2 id="applicant-information-title" class="text-2xl font-bold text-gray-900">
            <EmphasisWord>
              {{ issue.type
              }}
            </EmphasisWord>

            Information
          </h2>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            #{{ issue.id }} opened by
            {{ ' ' }}
            <span class="font-medium text-gray-900">{{ issue.raisedBy }}</span>
            {{ ' ' }}
            on behalf of
            {{ ' ' }}
            <a href="#" class="font-medium text-gray-900">{{ issue.businessName }}</a>
          </p>
        </div>

        <div class="mt-4 flex space-x-3 md:mt-0">
          <button type="button"
            class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">

            Reallocate
            <ArrowRightCircleIcon class="-ml-0.5 size-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
      <!-- Your content -->
      <dl class=" grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2
                    mt-5 pt-5">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Department at fault</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ issue.departmentResponsible }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Advised root cause</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ issue.advisedRootCause }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Advised corrective action</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ issue.advisedRootCause }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Advised root cause</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ issue.advisedCorrectiveAction }}</dd>
        </div>
        <div class="sm:col-span-2 border-t border-gray-200 pt-5">
          <dt class="text-sm font-medium text-gray-500"></dt>
          <dd class="mt-1 text-sm text-gray-900">
            <article class="prose lg:prose-l " v-html="issue.description"></article>
          </dd>
        </div>
        <div class="sm:col-span-2" v-if="issue.images.length != -1">
          <dd class="mt-1 text-sm text-gray-900">
            <GalleryModule :files="issue.images" />
          </dd>
        </div>
        <div class="sm:col-span-2" v-if="issue.attachments.length != -1">
          <dd class="mt-1 text-sm text-gray-900">
            <AttachmentsComponent :attachments="issue.attachments"></AttachmentsComponent>
          </dd>
        </div>
      </dl>

      <!-- images -->


      <!-- other attachements-->

      <!-- Comments-->
      <div class="flex flex-row justify-between border-b border-gray-200 pt-10 pb-3 items-center">
        <h2 class="text-lg/6 font-medium text-gray-900">Activity</h2>
        <button type="button" @click="sortUpdates"
          class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <ArrowsUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
        </button>

      </div>
      <ActivityModule :activity="updates" v-if="updates.length != -1"></ActivityModule>
    </div>
  </main>


</template>
