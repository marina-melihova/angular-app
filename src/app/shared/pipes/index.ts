export * from './convert-time/convert-time.pipe';
export * from './display-date/display-date.pipe';

export const numToString = (num: number) => {
  return num < 10 ? String('0' + num) : String(num);
};
