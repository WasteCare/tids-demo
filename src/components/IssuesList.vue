<script setup>
import { RouterLink } from 'vue-router'
import TaskListItem from './TaskListItem.vue'
import { useIssuesStore } from '../stores/issues'

const store = useIssuesStore()
</script>

<template>
  <div class="flex-1 overflow-hidden">
    <TransitionGroup tag="ul" role="list" name="list" class="divide-y divide-gray-100">
      <RouterLink :to="'/ids/' + issue.id" v-for="issue in store.getSortedIssues" :key="issue.id"
        class="flex flex-row  hover:bg-gray-50 cursor-pointer bg-white" exactActiveClass="!bg-gray-50"
        activeClass="!bg-gray-50">
        <TaskListItem :issue="issue" />
      </RouterLink>
    </TransitionGroup>
  </div>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
