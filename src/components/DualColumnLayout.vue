<template>
    <div class="py-8 xl:py-10 bg-white">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-3">
            <!-- Left column -->
            <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                    <h2 class="sr-only" id="section-1-title">Section title</h2>
                    <div class="">
                        <div class="pr-10 border-r  border-gray-200">
                            <!-- Your content -->
                            <slot name="left-column"></slot>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Right column -->
            <div class="grid grid-cols-1 gap-4 sticky top-5 pl-10 ">
                <section aria-labelledby="section-2-title">
                    <h2 class="sr-only" id="section-2-title">Section title</h2>
                    <div class="">
                        <!-- Your content -->
                        <slot name="right-column"></slot>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script setup></script>