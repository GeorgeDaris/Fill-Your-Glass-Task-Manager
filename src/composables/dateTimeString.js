// import { computed } from 'vue';

// export function useDateTimeString = computed(() => {
//   let month = useMonthToNumber(props.date.month);
//   if (month < 10) {
//     month = "0" + String(month);
//   }
//   return `${props.date.year}-${month}-${props.date.day}`;
// });

// Converts a date into a date-time readable time string

import useMonthToNumber from "./monthToNumber";
export function dateTimeString(year, month, date) {
  let monthNum = useMonthToNumber(month);
  monthNum = String(monthNum).padStart(2, "0");
  let paddedDate = String(date).padStart(2, "0");
  return `${year}-${monthNum}-${paddedDate}`;
}
