<template>
  <div class="my-container">
    <Breadcrumb :items="['menu.query', 'menu.query.result']" />

    <a-page-header
      :title="query?.name"
      :style="{ background: 'var(--color-bg-2)', marginBottom: '16px' }"
      @back="() => $router.push({ name: 'QueryManagement' })"
    >
      <template #subtitle>
        <a-typography-text type="secondary">
          {{ $t('result.pageHeader.createAt') }}
          {{ new Date(query?.createAt).toLocaleString() }}
        </a-typography-text>
      </template>
      <template #extra>
        <a-link
          icon
          @click="
            () =>
              $router.push({
                name: 'RuleEditor',
                query: { mode: 'view', id: query.ruleId },
              })
          "
        >
          {{ $t('result.pageHeader.viewRule') }}
        </a-link>
      </template>
    </a-page-header>

    <a-space direction="vertical" :size="16" fill>
      <template v-for="item in query?.analyse" :key="item">
        <a-card :title="item.title">
          <Description v-if="item.type === 'description'" :res="item.res" />
          <Count v-else-if="item.type === 'count'" :res="item.res" />
          <Line v-else-if="item.type === 'line'" :res="item.res" />
          <Pie v-else-if="item.type === 'pie'" :res="item.res" />
          <Graph v-else-if="item.type === 'graph'" :res="item.res" />
          <template v-else>{{ item }}</template>
        </a-card>
      </template>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import Description from './components/description.vue';
  import Count from './components/count.vue';
  import Line from './components/line.vue';
  import Pie from './components/pie.vue';
  import Graph from './components/graph.vue';
  import { provideShareData } from './hooks/useShareData';

  const { query } = provideShareData();
</script>

<script lang="ts">
  export default {
    name: 'QueryResult',
  };
</script>

<style scoped lang="less">
  .my-container {
    padding: 0 20px 20px 20px;
  }

  :deep(.section-title) {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 16px;
  }

  :deep(.chart-wrap) {
    height: 264px;
  }
</style>
