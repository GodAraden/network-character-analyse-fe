<template>
  <a-form
    ref="formRef"
    class="form"
    :model="formData"
    :disabled="disabled"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-form-item
      field="name"
      validate-trigger="input"
      :label="$t('rule.editor.basic.label.name')"
      :rules="[
        {
          required: true,
          message: $t('rule.editor.basic.error.name.required'),
        },
        {
          match: /^.{1,20}$/,
          message: $t('rule.editor.basic.error.name.pattern'),
        },
      ]"
    >
      <a-input
        v-model="formData.name"
        :placeholder="$t('rule.editor.basic.placeholder.name')"
      />
    </a-form-item>
    <a-form-item
      field="base"
      validate-trigger="input"
      :label="$t('rule.editor.basic.label.base')"
      :rules="[
        {
          required: true,
          message: $t('rule.editor.basic.error.base.required'),
        },
        {
          match: /^https?:\/\/([a-zA-Z0-9-]+\.?)*\/?$/,
          message: $t('rule.editor.basic.error.base.pattern'),
        },
      ]"
    >
      <a-input
        v-model="formData.base"
        :placeholder="$t('rule.editor.basic.placeholder.base')"
      />
    </a-form-item>
    <a-form-item
      field="depth"
      validate-trigger="input"
      :label="$t('rule.editor.basic.label.depth')"
      :rules="[
        {
          required: true,
          message: $t('rule.editor.basic.error.depth.required'),
        },
      ]"
    >
      <a-input-number
        v-model="formData.depth"
        mode="button"
        :min="1"
        :max="3"
        :precision="0"
      />
    </a-form-item>
  </a-form>
  <a-button type="primary" @click="onNextClick">
    {{ $t('rule.editor.button.next') }}
  </a-button>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { injectFormData } from '../hooks/useFormData';

  const { step, disabled, formData } = injectFormData();

  const formRef = ref<FormInstance>();

  const onNextClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      step.value += 1;
    }
  };
</script>

<style scoped lang="less">
  .my-container {
    padding: 20px;
    .keep-margin {
      margin-bottom: 20px;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: var(--color-bg-2);
  }

  .form {
    width: 500px;
  }
</style>
