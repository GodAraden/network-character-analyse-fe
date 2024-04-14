import debug from './env';

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup();
};

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    status: 0,
    msg: '请求成功',
  };
};

export const failResponseWrap = (data: unknown, msg: string) => {
  return {
    data,
    status: 500,
    msg,
  };
};
