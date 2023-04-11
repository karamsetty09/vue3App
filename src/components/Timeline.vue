<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import { usePosts } from "../stores/posts";
import {periods} from "../constants";

const postsStore = usePosts()

await postsStore.fetchPosts()
</script>

<template>
    <nav class="is-primary panel">
        <!-- {{ postsStore.selectedPeriod }} -->
        <span class="panel-tabs">
            <a v-for="period of periods"
            :key="period"
            :class="{'is-active': period === postsStore.selectedPeriod}"
            @click="postsStore.setSelectedPeriod(period)"
            >
                {{ period }}
            </a>
        </span>
        <TimelineItem v-for="post of postsStore.filteredPosts" :key="post.id" :post="post"/>
        <!-- {{ postsStore.foo }}
        <button @click="postsStore.updateFoo('bar')">Update foo</button> -->
    </nav>
</template>