<template>
  <a-spin :loading="false" style="width: 100%; padding: 12px 20px">
    <a-row justify="space-between">
      <a-col v-for="(item, idx) in renderData" :key="idx" :span="6">
        <a-statistic
          :title="item.title"
          :value="item.value"
          show-group-separator
          :value-from="0"
          animation
        >
          <template #prefix>
            <span
              class="statistic-prefix"
              :style="{ background: item.prefix.background }"
            >
              <component
                :is="item.prefix.icon"
                :style="{ color: item.prefix.iconColor }"
              />
            </span>
          </template>
        </a-statistic>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import useThemes from '@/hooks/themes';

  const props = defineProps({
    res: {
      type: Object,
      default() {
        return {};
      },
    },
  });

  const lightBackgroundArr = ['#FFE4BA', '#E8FFFB', '#E8F3FF', '#F5E8FF'];
  const darkBackgroundArr = ['#593E2F', '#3D5A62', '#354276', '#3F385E'];
  const lightIconColorArr = ['#F77234', '#33D1C9', '#165DFF', '#722ED1'];
  const darkIconColorArr = ['#F29A43', '#6ED1CE', '#4A7FF7', '#8558D3'];

  const { isDark } = useThemes();
  const renderData = computed(() =>
    Object.entries(props.res).map(([label, value], idx) => ({
      title: label,
      value: value.count,
      prefix: {
        icon: 'icon-edit',
        background: isDark.value
          ? darkBackgroundArr[idx]
          : lightBackgroundArr[idx],
        iconColor: isDark.value
          ? darkIconColorArr[idx]
          : lightIconColorArr[idx],
      },
    }))
  );
</script>

<style scoped lang="less">
  :deep(.arco-statistic) {
    .arco-statistic-title {
      color: rgb(var(--gray-10));
      font-weight: bold;
    }
    .arco-statistic-value {
      display: flex;
      align-items: center;
    }
  }
  .statistic-prefix {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    color: var(--color-white);
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
  }
</style>
