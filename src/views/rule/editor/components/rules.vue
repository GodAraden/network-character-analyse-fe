<template>
  <a-form
    ref="formRef"
    class="form"
    :model="formData"
    :disabled="disabled"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <div
      v-for="(item, index) of formData.rules"
      :key="index"
      class="border-dashed p-4 my-4"
    >
      <a-form-item class="mb-0" name="rules">
        <template #label>
          <p
            :title="`规则项 - ${item.name || '#' + (index + 1)}`"
            class="text-center whitespace-nowrap overflow-hidden text-ellipsis"
          >
            规则项 - {{ item.name || `#${index + 1}` }}
          </p>
          <p class="text-center">
            <a-button
              type="text"
              status="danger"
              :disabled="formData.rules.length <= 1"
              @click="handleDelete(index)"
            >
              移除
            </a-button>
          </p>
        </template>
        <a-form-item
          validate-trigger="input"
          :field="`rules[${index}].name`"
          :label="$t('rule.editor.rules.label.name')"
          :rules="[
            {
              required: true,
              message: $t('rule.editor.rules.error.name.required'),
            },
            {
              match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
              message: $t('rule.editor.rules.error.name.pattern'),
            },
          ]"
        >
          <a-input
            v-model="item.name"
            :placeholder="$t('rule.editor.rules.placeholder.name')"
          />
        </a-form-item>
        <a-form-item
          validate-trigger="input"
          :field="`rules[${index}].path`"
          :label="$t('rule.editor.rules.label.path')"
          :rules="[
            {
              required: true,
              message: $t('rule.editor.rules.error.path.required'),
            },
            {
              match: /^(\/[a-zA-Z0-9-]*)*$/,
              message: $t('rule.editor.rules.error.path.pattern'),
            },
          ]"
        >
          <a-input
            v-model="item.path"
            :placeholder="$t('rule.editor.rules.placeholder.path')"
          />
        </a-form-item>
        <a-form-item
          validate-trigger="input"
          :field="`rules[${index}].method`"
          :label="$t('rule.editor.rules.label.method')"
          :rules="[
            {
              required: true,
              message: $t('rule.editor.rules.error.method.required'),
            },
          ]"
        >
          <a-select
            v-model="item.method"
            :placeholder="$t('rule.editor.rules.placeholder.method')"
          >
            <a-option v-for="method in ['get', 'post']" :key="method">
              {{ method }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          validate-trigger="input"
          :field="`rules[${index}].parameter`"
          :label="$t('rule.editor.rules.label.parameter')"
          :rules="[
            {
              required: true,
              message: $t('rule.editor.rules.error.parameter.required'),
            },
            {
              validator: jsonValidator,
              message: $t('rule.editor.rules.error.parameter.pattern'),
            },
          ]"
        >
          <a-textarea
            v-model="item.parameter"
            :placeholder="$t('rule.editor.rules.placeholder.parameter')"
          />
        </a-form-item>
        <a-form-item
          validate-trigger="input"
          :field="`rules[${index}].resolve`"
          :label="$t('rule.editor.rules.label.resolve')"
          :rules="[
            {
              required: true,
              message: $t('rule.editor.rules.error.resolve.required'),
            },
            {
              validator: jsonValidator,
              message: $t('rule.editor.rules.error.resolve.pattern'),
            },
          ]"
        >
          <a-textarea
            v-model="item.resolve"
            :placeholder="$t('rule.editor.rules.placeholder.resolve')"
          />
        </a-form-item>
        <a-form-item
          class="mb-0"
          validate-trigger="input"
          :field="`rules[${index}].order`"
          :label="$t('rule.editor.rules.label.order')"
          :rules="[
            {
              required: true,
              message: $t('rule.editor.rules.error.order.required'),
            },
          ]"
        >
          <a-input-number v-model="item.order" mode="button" :precision="0" />
        </a-form-item>
      </a-form-item>
    </div>
    <a-button :disabled="disabled" @click="handleAdd">添加规则</a-button>
  </a-form>
  <a-space class="mt-4">
    <a-button type="secondary" @click="goPrev">
      {{ $t('rule.editor.button.prev') }}
    </a-button>
    <a-button type="primary" :disabled="disabled" @click="onNextClick">
      {{ $t('rule.editor.button.submit') }}
    </a-button>
  </a-space>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { jsonValidator } from '@/utils/json';
  import { injectFormData } from '../hooks/useFormData';

  const { step, disabled, onSubmit, formData } = injectFormData();

  const formRef = ref<FormInstance>();

  const handleAdd = () => {
    formData.value.rules.push({
      name: '',
      path: '',
      method: 'get',
      parameter: '',
      resolve: '',
      order: formData.value.rules.length + 1,
    });
  };
  const handleDelete = (index: number) => {
    formData.value.rules.splice(index, 1);
  };

  const goPrev = () => {
    step.value -= 1;
  };

  const onNextClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) onSubmit();
  };
</script>

<style scoped lang="less">
  .my-container {
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

  .steps {
    margin-bottom: 36px;
  }

  .form {
    width: 840px;

    .border-dashed {
      :deep(.arco-form-item-content-flex) {
        flex-direction: column;
      }

      :deep(.arco-form-item-label) {
        flex: 1;
      }
    }
  }
</style>
