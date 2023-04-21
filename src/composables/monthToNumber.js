export function useMonthToNumber(month) {
  let monthNum;
  monthNum = new Date(Date.parse(month + "1, 2001")).getMonth() + 1;
  return monthNum;
}
