import { QueryInfo, fetchQueryInfo } from '@/api/query';
import { provide, inject, ref } from 'vue';
import { useRoute } from 'vue-router';

const ShareDataKey = Symbol('QueryResultKey');

export function provideShareData() {
  const route = useRoute();

  const { id } = route.query;
  const query = ref<QueryInfo>();

  const initPage = async () => {
    if (typeof id !== 'string') {
      return;
    }
    try {
      const data = await fetchQueryInfo(id);
      query.value = data;
    } catch (error) {
      // ...
    }
  };

  initPage();

  const result = {
    query,
  };

  provide(ShareDataKey, result);

  return result;
}

export function injectShareData() {
  return inject(ShareDataKey) as ReturnType<typeof provideShareData>;
}
