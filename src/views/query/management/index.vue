<template>
  <div class="my-container">
    <Breadcrumb :items="['menu.query', 'menu.query.management']" />
    <a-card class="general-card" :title="$t('menu.query.management')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="id" :label="$t('query.management.form.id')">
                  <a-input
                    v-model="formModel.id"
                    :placeholder="$t('query.management.form.id.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="name"
                  :label="$t('query.management.form.name')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('query.management.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="ruleId"
                  :label="$t('query.management.form.ruleId')"
                >
                  <a-select
                    v-model="formModel.ruleId"
                    allow-search
                    :options="
                      rules.map((rule) => ({
                        label: rule.name,
                        value: rule.id,
                      }))
                    "
                    :placeholder="$t('query.management.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="operator"
                  :label="$t('query.management.form.operator')"
                >
                  <a-select
                    v-model="formModel.operator"
                    allow-search
                    :options="
                      users.map((user) => ({
                        label: showUser(user),
                        value: user.id,
                      }))
                    "
                    :placeholder="$t('query.management.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdAt"
                  :label="$t('query.management.form.createdAt')"
                >
                  <a-range-picker
                    v-model="formModel.createdAt"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('query.management.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('query.management.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('query.management.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('query.management.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #createdAt="{ record }">
          {{ new Date(record.createdAt).toLocaleString() }}
        </template>
        <template #ruleId="{ record }">
          <a-button
            type="text"
            size="small"
            @click="
              () =>
                $router.push({
                  name: 'RuleEditor',
                  query: { mode: 'view', id: record.ruleId },
                })
            "
          >
            {{
              rules.find((item) => item.id === record.ruleId)?.name ||
              `规则${Math.floor(Math.random() * 90 + 10)}`
            }}
          </a-button>
        </template>
        <template #operator="{ record }">
          {{
            showUser(
              users.find((user) => user.id === record.ruleId) || {
                nickname: `用户${Math.floor(Math.random() * 90 + 10)}`,
                username: `zhangsan${Math.floor(Math.random() * 90 + 10)}`,
              }
            )
          }}
        </template>
        <template #status="{ record }">
          <a-typography-text
            :type="
              record.status === 1
                ? 'success'
                : record.status === -1
                ? 'danger'
                : 'secondary'
            "
          >
            <icon-loading v-if="record.status === 0" />
            <icon-close v-else-if="record.status === -1" />
            <icon-check v-else-if="record.status === 1" />
            {{ $t(`query.management.form.status.${record.status}`) }}
          </a-typography-text>
        </template>
        <template #operations="{ record }">
          <a-button
            :disabled="record.status !== 1"
            type="text"
            size="small"
            @click="
              () =>
                $router.push({
                  name: 'QueryResult',
                  query: {
                    id: record.id,
                  },
                })
            "
          >
            {{ $t('query.management.columns.operations.view') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { fetchQueryList, PolicyRecord, FetchQueryListReq } from '@/api/query';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import { RuleRecord, fetchRuleList } from '@/api/rule';
  import { queryUserList } from '@/api/user-management';
  import { showUser } from '@/utils/transformer';
  import { UserView } from '@/store/modules/user/types';

  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      id: '',
      name: '',
      ruleId: '',
      operator: '',
      createdAt: [],
      status: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('query.management.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('query.management.columns.id'),
      dataIndex: 'id',
    },
    {
      title: t('query.management.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('query.management.columns.ruleId'),
      dataIndex: 'ruleId',
      slotName: 'ruleId',
    },
    {
      title: t('query.management.columns.operator'),
      dataIndex: 'operator',
      slotName: 'operator',
    },
    {
      title: t('query.management.columns.createdAt'),
      dataIndex: 'createdAt',
      slotName: 'createdAt',
    },
    {
      title: t('query.management.columns.status'),
      dataIndex: 'status',
      slotName: 'status',
    },
    {
      title: t('query.management.columns.operations'),
      slotName: 'operations',
    },
  ]);
  const statusOptions = computed<SelectOptionData[]>(() =>
    [-1, 0, 1].map((status) => ({
      label: t(`query.management.form.status.${status}`),
      value: status,
    }))
  );
  const fetchData = async (
    params: FetchQueryListReq = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const data = await fetchQueryList(params);
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
    } as unknown as FetchQueryListReq);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const rules = ref<RuleRecord[]>([]);
  const users = ref<UserView[]>([]);
  const bootstrap = async () => {
    try {
      const { data } = await fetchRuleList({});
      rules.value = data.list;
    } catch (error) {
      //
    }

    try {
      const { data } = await queryUserList({});
      users.value = data.list;
    } catch (error) {
      //
    }
  };

  bootstrap();

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
    name: 'QueryManagement',
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
