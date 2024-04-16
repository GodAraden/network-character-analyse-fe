<template>
  <div class="my-container">
    <Breadcrumb :items="['menu.user-management']" />
    <a-card class="general-card" :title="$t('menu.user-management')">
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
                <a-form-item field="id" :label="$t('userManagement.form.id')">
                  <a-input-number
                    v-model="formModel.id"
                    allow-clear
                    :placeholder="$t('userManagement.form.id.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="username"
                  :label="$t('userManagement.form.username')"
                >
                  <a-input
                    v-model="formModel.username"
                    allow-clear
                    :placeholder="
                      $t('userManagement.form.username.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="nickname"
                  :label="$t('userManagement.form.nickname')"
                >
                  <a-input
                    v-model="formModel.nickname"
                    allow-clear
                    :placeholder="
                      $t('userManagement.form.nickname.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="email"
                  :label="$t('userManagement.form.email')"
                >
                  <a-input
                    v-model="formModel.email"
                    allow-clear
                    :placeholder="$t('userManagement.form.email.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="role"
                  :label="$t('userManagement.form.role')"
                >
                  <a-select
                    v-model="formModel.role"
                    allow-clear
                    :options="roleOptions"
                    :placeholder="$t('userManagement.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('userManagement.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    allow-clear
                    :options="statusOptions"
                    :placeholder="$t('userManagement.form.selectDefault')"
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
              {{ $t('userManagement.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('userManagement.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-input-search
              search-button
              :placeholder="$t('userManagement.operation.create.placeholder')"
              @search="onCreateUser"
              @press-enter="(e: any) => onCreateUser(e.target.value)"
            >
              <template #button-icon>
                <icon-plus />
              </template>
              <template #button-default>
                {{ $t('userManagement.operation.create') }}
              </template>
            </a-input-search>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('userManagement.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('userManagement.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('userManagement.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('userManagement.actions.density')">
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
          <a-tooltip :content="$t('userManagement.actions.columnSetting')">
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
                    <div class="title"> {{ item.title }}</div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
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
        <template #nickname="{ record }">
          <a-space>
            <a-avatar :size="AvatarSizeMap[size]">
              <img alt="avatar" :src="record.avatar" />
            </a-avatar>
            <a-typography-text>{{ record.nickname }}</a-typography-text>
          </a-space>
        </template>
        <template #role="{ record }">
          {{ $t(`userManagement.form.role.${record.role}`) }}
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'disable'" class="circle error"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`userManagement.form.status.${record.status}`) }}
        </template>
        <template #operations="{ record }">
          <a-popconfirm
            :content="
              $t('userManagement.columns.operations.tip.status', {
                method: $t(
                  `userManagement.columns.operations.${getStatuOperation(
                    record.status
                  )}`
                ),
                nickname: record.nickname,
                username: record.username,
              })
            "
            @ok="
              () =>
                handleUpdateUserStatus({
                  id: record.id,
                  status:
                    record.status === UserStatus.DISABLE
                      ? UserStatus.ENABLE
                      : UserStatus.DISABLE,
                })
            "
          >
            <a-button
              v-if="record.role !== UserRole.ADMIN"
              type="text"
              size="small"
              :status="record.status === 'disable' ? 'success' : 'danger'"
            >
              {{
                $t(
                  `userManagement.columns.operations.${getStatuOperation(
                    record.status
                  )}`
                )
              }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import {
    createUser,
    queryUserList,
    QueryUserListReq,
    updateUserStatus,
    UpdateUserStatusReq,
  } from '@/api/user-management';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { UserRole, UserStatus, UserView } from '@/store/modules/user/types';
  import { Message } from '@arco-design/web-vue';
  import { MD5 } from 'crypto-js';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };
  const AvatarSizeMap: Record<SizeProps, number> = {
    mini: 12,
    small: 16,
    medium: 20,
    large: 24,
  };

  const generateFormModel = () => {
    return {
      id: undefined,
      username: undefined,
      nickname: undefined,
      email: undefined,
      role: undefined,
      status: undefined,
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<UserView[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

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
      name: t('userManagement.size.mini'),
      value: 'mini',
    },
    {
      name: t('userManagement.size.small'),
      value: 'small',
    },
    {
      name: t('userManagement.size.medium'),
      value: 'medium',
    },
    {
      name: t('userManagement.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('userManagement.columns.id'),
      dataIndex: 'id',
    },
    {
      title: t('userManagement.columns.username'),
      dataIndex: 'username',
    },
    {
      title: t('userManagement.columns.nickname'),
      dataIndex: 'nickname',
      slotName: 'nickname',
    },
    {
      title: t('userManagement.columns.role'),
      dataIndex: 'role',
      slotName: 'role',
    },
    {
      title: t('userManagement.columns.email'),
      dataIndex: 'email',
    },
    {
      title: t('userManagement.columns.createTime'),
      dataIndex: 'createTime',
    },
    {
      title: t('userManagement.columns.status'),
      dataIndex: 'status',
      slotName: 'status',
    },
    {
      title: t('userManagement.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);
  const roleOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('userManagement.form.role.admin'),
      value: UserRole.ADMIN,
    },
    {
      label: t('userManagement.form.role.user'),
      value: UserRole.USER,
    },
  ]);
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('userManagement.form.status.enable'),
      value: UserStatus.ENABLE,
    },
    {
      label: t('userManagement.form.status.disable'),
      value: UserStatus.DISABLE,
    },
  ]);
  const fetchData = async (
    params: QueryUserListReq = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryUserList(params);
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
    } as unknown as QueryUserListReq);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData(pagination);
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const onCreateUser = async (value: string) => {
    try {
      const { count } = await createUser([
        {
          username: value,
          password: MD5(value).toString(),
          nickname: value,
        },
      ]);
      if (count === 1) {
        Message.success(t('tips.success.create'));
        fetchData({
          ...basePagination,
          ...formModel.value,
        });
      }
    } catch (err) {
      // ...
    }
  };

  const getStatuOperation = (current: UserStatus) => {
    return current === UserStatus.DISABLE
      ? UserStatus.ENABLE
      : UserStatus.DISABLE;
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

  const handleUpdateUserStatus = async (params: UpdateUserStatusReq) => {
    try {
      const { id } = await updateUserStatus(params);
      if (id === params.id) {
        Message.success(t(`tips.success.${params.status}`));
        fetchData({ ...pagination, ...formModel.value });
      }
    } catch (error) {
      // ...
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
    name: 'UserManagement',
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
