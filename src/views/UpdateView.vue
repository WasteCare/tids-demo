<script setup>
import BaseLayout from '../components/BaseLayout.vue'
import GalleryModule from '../components/GalleryModule.vue'
import DualColumnLayout from '../components/DualColumnLayout.vue';
import ActivityModule from '@/components/ActivityModule.vue';
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon, LockOpenIcon, LockClosedIcon, ChatBubbleLeftEllipsisIcon, PencilIcon } from '@heroicons/vue/20/solid'
import data from '../services/IssuesService.js'
import AttachmentsComponent from '@/components/AttachmentsComponent.vue';
import EmphasisWord from '@/components/EmphasisWord.vue';
import { ref } from 'vue';

const props = defineProps({
    id: String
})

console.log(data.find(e => e.id === props.id))

const issue = ref(data.find(e => e.id == props.id))


</script>

<template>
    <main>
        <BaseLayout>
            <DualColumnLayout>
                <template v-slot:left-column>
                    <div
                        class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6 border-gray-400">
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
                                <PencilIcon class="-ml-0.5 size-5 text-gray-400" aria-hidden="true" />
                                Edit
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
                    <div class="border-b border-gray-200 pt-10 pb-5 ">
                        <h2 class="text-lg/6 font-medium text-gray-900">Activity</h2>
                    </div>
                    <ActivityModule :activity="issue.updates" v-if="issue.updates.length != -1"></ActivityModule>
                </template>
                <template v-slot:right-column>
                    <div class="">
                        <div>
                            <div class="">
                                <div class="space-y-5">
                                    <div class="flex items-center space-x-2">
                                        <LockOpenIcon v-if="issue.open" class="size-5 text-green-500"></LockOpenIcon>
                                        <span v-if="issue.open" class="text-sm font-medium text-green-700">Open {{
                                            issue.type }}</span>
                                        <LockClosedIcon v-if="!issue.open" class="size-5 text-gray-400">
                                        </LockClosedIcon>
                                        <span v-if="!issue.open" class="text-sm font-medium text-gray-500">Closed {{
                                            issue.type }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <CalendarDaysIcon class="h-6 w-5 text-gray-400" aria-hidden="true" />
                                        <span class="text-sm font-medium text-gray-500">Opened {{ issue.relativeTime
                                            }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <ChatBubbleLeftEllipsisIcon class="size-5 text-gray-400" aria-hidden="true" />
                                        <span class="text-sm font-medium text-gray-500">{{ issue.updates.length }}
                                            updates</span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="mt-6 space-y-8 border-b border-t border-gray-200 py-6">
                        <div>
                            <h2 class="text-sm font-medium text-gray-500">Current Owner</h2>

                            <div class="text-sm font-medium text-gray-900 mt-3 space-y-3">Kyle Beachill</div>
                        </div>
                    </div>
                    <div class="bg-white">
                        <div class="px-4 py-5 sm:p-6">
                            <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                                <div class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:shrink-0 sm:items-center">
                                    <button type="button"
                                        class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Proceed</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white">
                        <div class="px-4 py-5 sm:p-6">
                            <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                                <div class="max-w-xl text-sm text-gray-500">
                                    <p>This issue doesn't apply to me or has been sent to the wrong place - it needs
                                        reallocating</p>
                                </div>
                                <div class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:shrink-0 sm:items-center">
                                    <button type="button"
                                        class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Reallocate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DualColumnLayout>
        </BaseLayout>
    </main>
</template>
