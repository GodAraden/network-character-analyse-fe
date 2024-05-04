<template>
  <a-space direction="vertical" size="large" fill>
    <a-descriptions size="large" :column="1">
      <a-descriptions-item
        v-for="item of Object.entries(res)"
        :key="item[0]"
        :label="item[0]"
      >
        {{ item[1] }}
      </a-descriptions-item>
    </a-descriptions>
  </a-space>
</template>

<script lang="ts" setup>
  defineProps({
    res: {
      type: Object,
      default() {
        return {};
      },
    },
  });
</script>
