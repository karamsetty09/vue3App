<script lang="ts" setup>
import PostWriter from '../components/PostWriter.vue';
import { TimelinePost } from '../posts';
import { DateTime } from 'luxon';

const post: TimelinePost = {
    id: "-1",
    title: "Title",
    created: DateTime.now(),
    markdown: '## Title',
    html: '<h2>Title</h2>'
}
</script>
<template>
    New Post
    <PostWriter :post="post" ></PostWriter>
</template>