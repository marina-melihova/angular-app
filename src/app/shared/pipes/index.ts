export * from './duration/duration.pipe';
export * from './creation-date/creation-date.pipe';

export const numToString = (num: number) => {
  return num < 10 ? String('0' + num) : String(num);
};
