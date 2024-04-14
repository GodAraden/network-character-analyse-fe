import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';
import i18n from '@/locale';

export interface HttpResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    if (res.status !== 0 || !res.data) {
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error: AxiosError<HttpResponse>) => {
    const res = error.response?.data;
    const tip = i18n.global.t(`tips.error.${res?.message}`);
    Message.error({
      content: tip,
      duration: 5 * 1000,
    });
    if (res) res.message = tip;
    return Promise.reject(res);
  }
);
