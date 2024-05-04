<template>
  <a-table
    :columns="[
      {
        title: '#',
        slotName: 'index',
      },
      ...Object.keys(res?.graph[0] || {}).map((item) => ({
        title: item,
        dataIndex: item,
      })),
      {
        title: $t('result.graph.column.operation'),
        slotName: 'operation',
      },
    ]"
    :data="res.graph"
    :pagination="false"
    :scroll="{ y: 360 }"
  >
    <template #index="{ rowIndex }"> {{ rowIndex + 1 }}</template>
    <template #operation="{ record }">
      <a-button
        type="text"
        @click="
          $router.push({
            name: 'QueryStart',
            query: { ruleId: query?.ruleId, record: JSON.stringify(record) },
          })
        "
      >
        {{ $t('result.graph.column.operation.drill') }}
      </a-button>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { injectShareData } from '../hooks/useShareData';

  defineProps({
    res: {
      type: Object,
      default() {
        return {};
      },
    },
  });

  const { query } = injectShareData();
</script>
