<template>

    <div class="min-h-full">
        <Popover as="header" class="bg-wc pb-24" v-slot="{ open }">
            <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div class="relative flex items-center justify-center py-5 lg:justify-between">
                    <!-- Logo -->
                    <div class="absolute left-0 shrink-0 lg:static">
                        <a href="#">
                            <span class="sr-only">Wastecare</span>
                            <img class="h-8 w-auto"
                                src="https://www.wastecare.co.uk/wp-content/themes/wastecare/assets/img/logo.svg"
                                alt="Your Company" />
                        </a>
                    </div>




                    <!-- Menu button -->
                    <div class="absolute right-0 shrink-0 lg:hidden">
                        <!-- Mobile menu button -->
                        <PopoverButton
                            class="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                        </PopoverButton>
                    </div>
                </div>
                <img class="h-auto w-1/2"
                    src="https://www.wastecare.co.uk/wp-content/themes/wastecare/assets/img/line-divider.svg" />
                <div class="hidden border-t border-white/20 py-5 lg:block">
                    <div class="grid grid-cols-3 items-center gap-8">
                        <div class="col-span-2">
                            <nav class="flex space-x-4">
                                <a v-for="item in navigation" :key="item.name" :href="item.href"
                                    :class="[item.current ? 'text-white' : 'text-indigo-100', 'rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10']"
                                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>

            <TransitionRoot as="template" :show="open">
                <div class="lg:hidden">
                    <TransitionChild as="template" enter="duration-150 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-150 ease-in" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <PopoverOverlay class="fixed inset-0 z-20 bg-black/25" />
                    </TransitionChild>

                    <TransitionChild as="template" enter="duration-150 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-150 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <PopoverPanel focus
                            class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition">
                            <div class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
                                <div class="pb-2 pt-3">
                                    <div class="flex items-center justify-between px-4">
                                        <div>
                                            <img class="h-8 w-auto"
                                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                                alt="Your Company" />
                                        </div>
                                        <div class="-mr-2">
                                            <PopoverButton
                                                class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span class="absolute -inset-0.5" />
                                                <span class="sr-only">Close menu</span>
                                                <XMarkIcon class="size-6" aria-hidden="true" />
                                            </PopoverButton>
                                        </div>
                                    </div>
                                    <div class="mt-3 space-y-1 px-2">
                                        <a href="#"
                                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">Home</a>
                                        <a href="#"
                                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">Profile</a>
                                        <a href="#"
                                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">Resources</a>
                                        <a href="#"
                                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">Company
                                            Directory</a>
                                        <a href="#"
                                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">Openings</a>
                                    </div>
                                </div>

                            </div>
                        </PopoverPanel>
                    </TransitionChild>
                </div>
            </TransitionRoot>
        </Popover>
        <main class="-mt-24 pb-8">
            <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Page title</h1>
                <!-- Main 3 column grid -->
                <slot></slot>
            </div>
        </main>
        <footer>

        </footer>
    </div>
</template>

<script setup>
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverOverlay,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Profile', href: '#', current: false },
    { name: 'Resources', href: '#', current: false },
    { name: 'Company Directory', href: '#', current: false },
    { name: 'Openings', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
</script>