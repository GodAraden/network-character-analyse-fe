import {
  RuleItem,
  RuleRecord,
  createRule,
  fetchRuleInfo,
  updateRule,
} from '@/api/rule';
import useLoading from '@/hooks/loading';
import { inject, provide, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const FormDataKey = Symbol('FormDataKey');

export function provideFormData() {
  const route = useRoute();
  const router = useRouter();
  const { mode = 'create', id } = route.query;

  const step = ref(1);
  const disabled = ref(false);
  const formData = ref<RuleRecord>({
    depth: 1,
    rules: [{ order: 1 } as RuleItem],
  } as RuleRecord);
  const { loading, setLoading } = useLoading(false);

  const bootstrap = async (ruleId: string) => {
    loading.value = true;
    try {
      const { data } = await fetchRuleInfo({ id: ruleId });
      formData.value = data;
    } catch (error) {
      // ...
    } finally {
      loading.value = false;
    }
  };

  const getPureRule = (rule: RuleRecord, delRuleId = true) => {
    if (delRuleId) delete rule.id;
    rule.rules.forEach((item) => {
      delete item.id;
      delete item.ruleId;
    });
    return rule;
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (mode === 'create') {
        const res = await createRule(getPureRule(formData.value));
        if (res.id) {
          step.value = 3;
          formData.value.id = res.id;
        }
      } else if (mode === 'update') {
        const isUpdated = await updateRule(getPureRule(formData.value, false));
        if (isUpdated) {
          step.value = 3;
        }
      }
    } catch (err) {
      // ..
    } finally {
      setLoading(false);
    }
  };

  const viewInfo = (ruleId: string) => {
    router.push({ name: 'RuleEditor', query: { mode: 'view', id: ruleId } });
  };

  const resetForm = () => {
    router.push({ name: 'RuleEditor' });
  };

  if (mode === 'view') disabled.value = true;
  if (typeof id === 'string') bootstrap(id);

  const result = {
    step,
    mode,
    disabled,
    formData,
    onSubmit,
    loading,
    viewInfo,
    resetForm,
  };

  provide(FormDataKey, result);

  return result;
}

export function injectFormData() {
  return inject(FormDataKey) as ReturnType<typeof provideFormData>;
}
