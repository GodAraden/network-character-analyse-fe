<template>
  <div class="my-container">
    <Breadcrumb :items="['menu.rule', 'menu.rule.editor']" />
    <a-spin :loading="loading" style="width: 100%">
      <a-card class="general-card">
        <template #title>
          {{ $t(`rule.editor.step.title.${mode}`) }}
        </template>
        <div class="wrapper">
          <a-steps
            v-model:current="step"
            style="width: 580px"
            line-less
            class="steps"
          >
            <a-step :description="$t('rule.editor.step.subTitle.baseInfo')">
              {{ $t('rule.editor.step.title.baseInfo') }}
            </a-step>
            <a-step :description="$t('rule.editor.step.subTitle.channel')">
              {{ $t('rule.editor.step.title.channel') }}
            </a-step>
            <a-step :description="$t('rule.editor.step.subTitle.finish')">
              {{ $t('rule.editor.step.title.finish') }}
            </a-step>
          </a-steps>
          <keep-alive>
            <Basic v-if="step === 1" />
            <Rules v-else-if="step === 2" />
            <Success v-else-if="step === 3" />
          </keep-alive>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import Basic from './components/basic.vue';
  import Rules from './components/rules.vue';
  import Success from './components/success.vue';
  import { provideFormData } from './hooks/useFormData';

  const { step, mode, loading } = provideFormData();
</script>

<script lang="ts">
  export default {
    name: 'RuleEditor',
  };
</script>

<style scoped lang="less">
  .my-container {
    padding: 0 20px 20px 20px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: var(--color-bg-2);
  }

  .steps {
    margin-bottom: 76px;
  }
</style>
