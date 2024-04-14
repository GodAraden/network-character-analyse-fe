<template>
  <div class="my-container">
    <Breadcrumb :items="['menu.user']" />

    <a-space class="header" :size="12" direction="vertical" align="center">
      <a-avatar :size="64">
        <template #trigger-icon>
          <a-upload
            action="/api/user/avatar"
            :show-file-list="false"
            @before-upload="onCheckAvatar"
            @success="onUpdateAvatar"
          >
            <template #upload-button><icon-camera /></template>
          </a-upload>
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
            <a-typography-text>
              {{ $t(`user.info.role.${userInfo.role}`) }}
            </a-typography-text>
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
              <a-typography-paragraph
                v-model:edit-text="userInfo.nickname"
                class="tip"
                editable
                @edit-end="
                  () => onUpdateUserInfo({ nickname: userInfo.nickname })
                "
              >
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
              <a-typography-paragraph
                v-model:edit-text="password"
                class="tip"
                editable
                @edit-end="() => onUpdatePassword(password)"
              >
                ********
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
              <a-typography-paragraph
                v-model:edit-text="userInfo.email"
                class="tip"
                editable
                @edit-end="() => onUpdateUserInfo({ email: userInfo.email })"
              >
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
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { FileItem, Message } from '@arco-design/web-vue';
  import { useUserStore } from '@/store';
  import { UpdateUserInfoAttrs, updateUserInfo } from '@/api/user';
  import { MD5 } from 'crypto-js';

  const { t } = useI18n();
  const userInfo = useUserStore();

  const password = ref('');

  const onCheckAvatar = (file: File) => {
    const { size, type } = file;
    if (!type.startsWith('image/')) {
      Message.error(t('user.avatar.upload.tip.type'));
      return false;
    }
    if (size > 500 * 1024) {
      Message.error(t('user.avatar.upload.tip.size'));
      return false;
    }
    return true;
  };

  const onUpdateAvatar = async (fileItem: FileItem) => {
    userInfo.avatar = fileItem.url || '';
    const base = import.meta.env.VITE_API_BASE_URL;
    onUpdateUserInfo({ avatar: `${base}/${fileItem.response.data}` });
  };

  const onUpdatePassword = async (value: string) => {
    if (!value) return;
    await onUpdateUserInfo({ password: MD5(value).toString() });
    password.value = '';
  };

  const onUpdateUserInfo = async (params: UpdateUserInfoAttrs) => {
    try {
      const { id } = await updateUserInfo({ id: userInfo.id, ...params });
      if (id === userInfo.id) {
        Message.success(t('tips.success.update'));
      }
    } catch (error) {
      // ...
    }
  };
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
