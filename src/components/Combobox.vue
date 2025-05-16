<script setup>
import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/vue'

const props = defineProps({
    listItems: Array,
    label: String
})

const query = ref('')
const selectedItem = ref(props.listItems[[0]])
const filteredItems = computed(() =>
    query.value === ''
        ? props.listItems
        : props.listItems.filter((item) => {
            return item.value.toLowerCase().includes(query.value.toLowerCase())
        }),
)
</script>
<template>
    <Combobox as="div" v-model="selectedItem" @update:modelValue="query = ''" by="id">
        <ComboboxLabel class="block text-sm/6 font-medium text-gray-900">{{ label }}</ComboboxLabel>
        <div class="relative mt-2">
            <ComboboxInput
                class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                @change="query = $event.target.value" @blur="query = ''" :display-value="(item) => item?.value" />
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            <ComboboxOptions v-if="filteredItems.length > 0"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="item in filteredItems" :key="item.id" :value="item" as="template"
                    v-slot="{ active, selected }">
                    <li
                        :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white outline-none' : 'text-gray-900']">
                        <span :class="['block truncate', selected && 'font-semibold']">
                            {{ item.value }}
                        </span>

                        <span v-if="selected"
                            :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                            <CheckIcon class="size-5" aria-hidden="true" />
                        </span>
                    </li>
                </ComboboxOption>
            </ComboboxOptions>
        </div>
    </Combobox>
</template>