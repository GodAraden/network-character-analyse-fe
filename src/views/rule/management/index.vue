<template>
  <div class="my-container">
    <Breadcrumb :items="['menu.rule', 'menu.rule.management']" />
    <a-card class="general-card" :title="$t('menu.rule.management')">
      <a-space
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        "
      >
        <a-input-search
          size="small"
          search-button
          :placeholder="$t('rule.management.form.name.placeholder')"
          @press-enter="search"
          @search="search"
        >
          <template #button-icon>
            <icon-search />
          </template>
          <template #button-default>
            {{ $t('rule.management.form.search') }}
          </template>
        </a-input-search>
        <div style="display: flex; align-items: center">
          <a-tooltip :content="$t('rule.management.actions.refresh')">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('rule.management.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('rule.management.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </div>
      </a-space>

      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #rules="{ record }">
          {{ record.rules.length }}
        </template>
        <template #operations="{ record }">
          <a-button
            type="text"
            size="small"
            @click="() => onOpenEditor('create', record.id)"
          >
            {{ $t('rule.management.columns.operations.copy') }}
          </a-button>
          <a-button
            type="text"
            size="small"
            @click="() => onOpenEditor('view', record.id)"
          >
            {{ $t('rule.management.columns.operations.view') }}
          </a-button>
          <a-button
            type="text"
            size="small"
            @click="() => onOpenEditor('update', record.id)"
          >
            {{ $t('rule.management.columns.operations.update') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { fetchRuleList, RuleRecord, FetchRuleListReq } from '@/api/rule';
  import { useRouter } from 'vue-router';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<RuleRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const router = useRouter();
  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const densityList = computed(() => [
    {
      name: t('rule.management.size.mini'),
      value: 'mini',
    },
    {
      name: t('rule.management.size.small'),
      value: 'small',
    },
    {
      name: t('rule.management.size.medium'),
      value: 'medium',
    },
    {
      name: t('rule.management.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('rule.management.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('rule.management.columns.id'),
      dataIndex: 'id',
    },
    {
      title: t('rule.management.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('rule.management.columns.base'),
      dataIndex: 'base',
    },
    {
      title: t('rule.management.columns.depth'),
      dataIndex: 'depth',
    },
    {
      title: t('rule.management.columns.rules'),
      dataIndex: 'rules',
      slotName: 'rules',
    },
    {
      title: t('rule.management.columns.operations'),
      slotName: 'operations',
    },
  ]);

  const fetchData = async (
    params: FetchRuleListReq = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await fetchRuleList(params);
      renderData.value = data.list;
      pagination.current = params.current || 1;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as FetchRuleListReq);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();

  const onOpenEditor = (mode: 'view' | 'update' | 'create', id: string) => {
    router.push({ name: 'RuleEditor', query: { mode, id } });
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'RuleManagement',
  };
</script>

<style scoped lang="less">
  .my-container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
