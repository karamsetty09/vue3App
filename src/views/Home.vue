<script lang="ts" setup>
import Timeline from '../components/Timeline.vue';
</script>
<template>
    <div class="section">
      <div class="container">
        <RouterView />
        <Suspense>
          <template #default>
            <Timeline />
          </template>
          <template #fallback>
            <progress class="progress is-primary is-small" ></progress>
          </template>
        </Suspense>
      </div>
    </div>
  </template>