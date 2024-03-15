// eslint-disable-next-line import/prefer-default-export
export const jsonValidator = (
  value: string,
  callback: (error?: string) => void
) => {
  try {
    if (!value) return;
    JSON.stringify(JSON.parse(value));
  } catch (e) {
    callback('Parsing JSON Error');
  }
};
