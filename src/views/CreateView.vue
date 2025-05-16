<script setup>
import Combobox from '@/components/Combobox.vue';
import BaseLayout from '@/components/BaseLayout.vue';
import DualColumnLayout from '@/components/DualColumnLayout.vue';
import People from '@/services/PeopleService';
import DropdownsService from '@/services/DropdownsService';
import { PaperClipIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import InlineListbox from '@/components/InlineListbox.vue';

const assignees = [
    { name: 'Unassigned', value: null },
    {
        name: 'Wade Cooper',
        value: 'wade-cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More items...
]
const assigned = ref([assignees[0]])
</script>
<template>
    <BaseLayout>
        <DualColumnLayout>
            <template v-slot:left-column>
                <p class="text-xl font-medium">
                    I'm raising this issue on behalf of
                    <InlineListbox :listItems="People" />, where we&rsquo;ve had a problem with
                    <InlineListbox :listItems="DropdownsService.advisedRootCause" />. The problem needs resolving by
                    <InlineListbox :listItems="DropdownsService.departmentResponsible" /> and I think it needs fixing
                    with a
                    <InlineListbox :listItems="DropdownsService.advisedCorrectiveAction" />.
                </p>
                <div class="relative">
                    <div
                        class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                        <label for="title" class="sr-only">Title</label>
                        <input type="text" name="title" id="title"
                            class="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                            placeholder="Title" />
                        <label for="description" class="sr-only">Description</label>
                        <span class="isolate inline-flex rounded-md shadow-sm px-2\.5">
                            <button type="button"
                                class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">Years</button>
                            <button type="button"
                                class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">Months</button>
                            <button type="button"
                                class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">Days</button>
                        </span>
                        <textarea rows="2" name="description" id="description"
                            class="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                            placeholder="Write a description..." />

                        <!-- Spacer element to match the height of the toolbar -->
                        <div aria-hidden="true">
                            <div class="py-2">
                                <div class="h-9" />
                            </div>
                            <div class="h-px" />
                            <div class="py-2">
                                <div class="py-px">
                                    <div class="h-9" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="absolute inset-x-px bottom-0">
                        <div class="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
                            <Listbox as="div" v-model="assigned" class="shrink-0" multiple>
                                <ListboxLabel class="sr-only">Assign</ListboxLabel>
                                <div class="relative">
                                    <ListboxButton
                                        class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                        <UserCircleIcon v-if="assigned.value === null"
                                            class="size-5 shrink-0 text-gray-300 sm:-ml-1" aria-hidden="true" />

                                        <img v-else :src="assigned[0].avatar" alt=""
                                            class="size-5 shrink-0 rounded-full" />

                                        <span
                                            :class="[assigned[0].value === null ? '' : 'text-gray-900', 'hidden truncate sm:ml-2 sm:block']">{{
                                                assigned[0].value === null ? 'Assign' : assigned[0].name }}</span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition ease-in duration-100"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                            <ListboxOption as="template" v-for="assignee in assignees"
                                                :key="assignee.value" :value="assignee" v-slot="{ active }">
                                                <li
                                                    :class="[active ? 'bg-gray-100' : 'bg-white', 'relative cursor-default select-none px-3 py-2']">
                                                    <div class="flex items-center">
                                                        <img v-if="assignee.avatar" :src="assignee.avatar" alt=""
                                                            class="size-5 shrink-0 rounded-full" />
                                                        <UserCircleIcon v-else class="size-5 shrink-0 text-gray-400"
                                                            aria-hidden="true" />
                                                        <span class="ml-3 block truncate font-medium">{{ assignee.name
                                                            }}</span>
                                                    </div>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                                </div>
                            </Listbox>
                        </div>
                        <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
                        <div
                            class="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                            <div class="flex">
                                <button type="button"
                                    class="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400">
                                    <PaperClipIcon class="-ml-1 mr-2 size-5 group-hover:text-gray-500"
                                        aria-hidden="true" />
                                    <span class="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a
                                        file</span>
                                </button>
                            </div>
                            <div class="shrink-0">
                                <button type="submit"
                                    class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:right-column>
                <div class="p-6">

                </div>
            </template>
        </DualColumnLayout>
    </BaseLayout>
</template>