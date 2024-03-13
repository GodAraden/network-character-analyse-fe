<template>
  <div class="my-container">
    <Breadcrumb :items="['menu.user']" />

    <a-space class="header" :size="12" direction="vertical" align="center">
      <a-avatar :size="64">
        <template #trigger-icon>
          <icon-camera />
        </template>
        <img :src="userInfo.avatar" />
      </a-avatar>
      <a-typography-title :heading="6" style="margin: 0">
        {{ userInfo.nickname }}
      </a-typography-title>
      <div class="user-msg">
        <a-space :size="18">
          <div>
            <icon-idcard />
            <a-typography-text>{{ userInfo.username }}</a-typography-text>
          </div>
          <div>
            <icon-user />
            <a-typography-text>{{ userInfo.role }}</a-typography-text>
          </div>
          <div>
            <icon-email />
            <a-typography-text>
              {{ userInfo.email }}
            </a-typography-text>
          </div>
        </a-space>
      </div>
    </a-space>

    <a-list class="wrapper" :bordered="false">
      <a-list-item>
        <a-list-item-meta>
          <template #avatar>
            <a-typography-paragraph>
              {{ $t('user.form.label.nickname') }}
            </a-typography-paragraph>
          </template>
          <template #description>
            <div class="content">
              <a-typography-paragraph class="tip" editable>
                {{ userInfo.nickname }}
              </a-typography-paragraph>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <template #avatar>
            <a-typography-paragraph>
              {{ $t('user.form.label.password') }}
            </a-typography-paragraph>
          </template>
          <template #description>
            <div class="content">
              <a-typography-paragraph class="tip" editable>
                {{ $t('user.placeholder.password') }}
              </a-typography-paragraph>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <template #avatar>
            <a-typography-paragraph>
              {{ $t('user.form.label.email') }}
            </a-typography-paragraph>
          </template>
          <template #description>
            <div class="content">
              <a-typography-paragraph class="tip" editable>
                <template #expand-node></template>
                {{ userInfo.email }}
              </a-typography-paragraph>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store';

  const userInfo = useUserStore();
</script>

<script lang="ts">
  export default {
    name: 'User',
  };
</script>

<style scoped lang="less">
  .my-container {
    padding: 0 20px 20px 20px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 204px;
    color: var(--gray-10);
    background: url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)
      no-repeat;
    background-size: cover;
    border-radius: 4px;

    :deep(.arco-avatar-trigger-icon-button) {
      color: rgb(var(--arcoblue-6));

      :deep(.arco-icon) {
        vertical-align: -1px;
      }
    }
    .user-msg {
      .arco-icon {
        color: rgb(var(--gray-10));
      }
      .arco-typography {
        margin-left: 6px;
      }
    }
  }

  .wrapper {
    padding: 40px 0 40px 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.arco-list-item) {
    border-bottom: none !important;
    .arco-typography {
      margin-bottom: 20px;
    }
    .arco-list-item-meta-avatar {
      margin-bottom: 1px;
    }
    .arco-list-item-meta {
      padding: 0;
    }
  }
  :deep(.arco-list-item-meta-content) {
    flex: 1;
    border-bottom: 1px solid var(--color-neutral-3);

    .tip {
      color: rgb(var(--gray-6));
    }
  }
</style>
