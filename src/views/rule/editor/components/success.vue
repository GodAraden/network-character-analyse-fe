<template>
  <div class="success-wrap">
    <a-result
      status="success"
      :title="$t(`rule.editor.${mode}.success.title`)"
      :subtitle="$t(`rule.editor.${mode}.success.subTitle`)"
    />
    <a-space :size="16">
      <a-button key="view" type="primary" @click="() => viewInfo(formData.id)">
        {{ $t('rule.editor.button.view') }}
      </a-button>
      <a-button key="again" type="secondary" @click="resetForm">
        {{ $t('rule.editor.button.again') }}
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { injectFormData } from '../hooks/useFormData';

  const { mode, formData, viewInfo, resetForm } = injectFormData();
</script>

<style scoped lang="less">
  .success-wrap {
    text-align: center;
  }
  :deep(.arco-result) {
    padding-top: 0;
  }
</style>
