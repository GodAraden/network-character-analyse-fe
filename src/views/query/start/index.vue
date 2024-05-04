<template>
  <div class="my-container">
    <Breadcrumb :items="['menu.query', 'menu.query.start']" />
    <a-card class="general-card">
      <template #title>
        {{ $t('menu.query.start') }}
      </template>
      <a-form ref="formRef" class="form" :disabled="loading" :model="formData">
        <a-form-item
          field="ruleId"
          validate-trigger="change"
          :label="$t('query.start.form.label.ruleId')"
          :rules="[
            {
              required: true,
              message: $t('query.start.form.error.ruleId.required'),
            },
          ]"
        >
          <a-select
            v-model="formData.ruleId"
            allow-search
            :placeholder="$t('query.start.form.placeholder.ruleId')"
          >
            <a-option v-for="item in options" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          field="name"
          validate-trigger="input"
          :label="$t('query.start.form.label.name')"
          :rules="[
            {
              required: true,
              message: $t('query.start.form.error.name.required'),
            },
            {
              match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
              message: $t('query.start.form.error.name.pattern'),
            },
          ]"
        >
          <a-input
            v-model="formData.name"
            :placeholder="$t('query.start.form.placeholder.name')"
          />
        </a-form-item>
        <a-form-item
          field="parameter"
          validate-trigger="input"
          :label="$t('query.start.form.label.parameter')"
          :rules="[
            {
              required: true,
              message: $t('query.start.form.error.parameter.required'),
            },
            {
              validator: jsonValidator,
              message: $t('query.start.form.error.parameter.pattern'),
            },
          ]"
        >
          <a-textarea
            v-model="formData.parameter"
            :placeholder="$t('query.start.form.placeholder.parameter')"
          />
        </a-form-item>
        <a-form-item
          field="resolve"
          validate-trigger="input"
          :label="$t('query.start.form.label.resolve')"
          :rules="[
            {
              required: true,
              message: $t('query.start.form.error.resolve.required'),
            },
            {
              validator: jsonValidator,
              message: $t('query.start.form.error.resolve.pattern'),
            },
          ]"
        >
          <a-textarea
            v-model="formData.resolve"
            :placeholder="$t('query.start.form.placeholder.resolve')"
          />
        </a-form-item>
      </a-form>
    </a-card>

    <div class="actions">
      <a-space>
        <a-button @click="() => (formData = {} as StartQueryReq)">
          {{ $t('query.start.reset') }}
        </a-button>
        <a-button type="primary" :loading="loading" @click="onSubmitClick">
          {{ $t('query.start.submit') }}
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';
  import { StartQueryReq, startQuery } from '@/api/query';
  import { jsonValidator } from '@/utils/json';
  import { RuleRecord, fetchRuleList } from '@/api/rule';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';

  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();

  const formData = ref<StartQueryReq>({} as StartQueryReq);
  const formRef = ref<FormInstance>();
  const options = ref<RuleRecord[]>([]);
  const { loading, setLoading } = useLoading();

  const onSubmitClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      setLoading(true);
      try {
        const { id } = await startQuery(formData.value);
        if (id) {
          Message.success(t('query.start.submitSuccess', { id }));
          setTimeout(() => router.push({ name: 'QueryManagement' }), 3000);
        }
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    }
  };

  const bootstrap = async () => {
    try {
      const { data } = await fetchRuleList({});
      options.value = data.list;
    } catch (error) {
      //
    }
  };

  const { ruleId, record } = route.query;
  if (typeof ruleId === 'string') formData.value.ruleId = ruleId;
  if (typeof record === 'string') formData.value.name = record;

  bootstrap();
</script>

<script lang="ts">
  export default {
    name: 'QueryStart',
  };
</script>

<style scoped lang="less">
  .my-container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }

  .form {
    width: 600px;
    margin: 16px auto 32px;
  }
</style>
