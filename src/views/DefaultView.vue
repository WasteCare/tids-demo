<script setup>
import BaseFullpageLayout from '../components/BaseFullpageLayout.vue'
</script>

<template>
  <BaseFullpageLayout>
    <!--<div class="mx-auto flex flex-col lg:flex-row w-full items-stretch px-6 md:px-0">-->
    <div>
      <slot></slot>
    </div>
  </BaseFullpageLayout>
</template>
