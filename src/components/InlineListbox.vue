<script setup>
import { ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
    Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions
} from '@headlessui/vue'

const props = defineProps({
    listItems: Array
})

const selectedItem = ref(null)

</script>
<template>
    <Listbox as="div" v-model="selectedItem" class="inline-block">
        <div class="relative text-green-600">
            <ListboxButton class="grid w-full cursor-default grid-cols-1">

                <span v-if="selectedItem" class="inline-block text-left col-start-1 row-start-1">{{
                    selectedItem?.value
                    }}</span>
                <span v-else
                    class="inline-block min-w-64 border-b-2 border-green-600 text-left col-start-1 row-start-1">&nbsp;</span>
                <ChevronUpDownIcon
                    class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    aria-hidden="true" />
            </ListboxButton>

            <ListboxOptions v-if="listItems.length > 0"
                class="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                <ListboxOption v-for="item in listItems" :key="item.id" :value="item" as="template"
                    v-slot="{ active, selected }">
                    <li
                        :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-green-600 text-white outline-none' : 'text-gray-900']">
                        <span :class="['block truncate', selected && 'font-semibold']">
                            {{ item.value }}
                        </span>

                        <span v-if="selected"
                            :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-green-600']">
                            <CheckIcon class="size-5" aria-hidden="true" />
                        </span>
                    </li>
                </ListboxOption>
            </ListboxOptions>
        </div>
    </Listbox>
</template>