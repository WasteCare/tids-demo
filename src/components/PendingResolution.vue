<script setup>
import { ref } from 'vue';
import WCButton from './WCButton.vue';

const props = defineProps({
  update: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: false,
  }
});


</script>
<template>
  <li>
    <div class="bg-wc sm:rounded-lg flex flex-col gap-x-4 p-6">
      <div class="flex flex-row justify-between">
        <h3 class="text-lg/6 font-medium  text-white mb-6">Pending Resolution</h3>
        <time :datetime="update.timestamp" class="flex-none py-0.5 text-xs/5 text-white">{{ update.relativeTime
        }}</time>
      </div>
      <div class="flex flex-row gap-x-4">
        <img :src="'https://xsgames.co/randomusers/avatar.php?g=male'" alt=""
          class="relative mt-0 -ml-2.5 size-12 flex-none rounded-full bg-gray-50" />
        <div class="flex flex-col w-full">
          <div class="flex-auto bg-white/50 sm:rounded-lg p-4">
            <div class="flex justify-between gap-x-4">
              <div class="py-0.5 text-white">
                <span class="font-medium text-white">{{ update.loggedBy }}</span> commented
              </div>
            </div>
            <div class="mt-2 text-sm text-white">
              <p>{{ update.update }}</p>

              <div class="flex flex-row gap-x-4 border-t border-white/20 pt-4 mt-4">
                <div>
                  <p class="font-bold py-2">Root Cause</p>
                  <p><strong>{{ update.proposedResolution.rootCause }}</strong> - {{
                    update.proposedResolution.rootCauseDetails
                    }}</p>
                </div>
                <div>
                  <p class="font-bold py-2">Corrective Action</p>
                  <p><strong>{{ update.proposedResolution.correctiveAction }}</strong> - {{
                    update.proposedResolution.correctiveActionDetails
                    }}</p>
                </div>
              </div>
            </div>

          </div>
          <div class="mt-5 flex gap-x-2">
            <WCButton class="text-white" solid>Accept Resolution</WCButton>
            <WCButton class="text-white" error>Reject Resolution</WCButton>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>