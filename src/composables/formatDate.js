//accepts a date and formats it with the below options. It returns it as an object from which you can select the weekday. month, day, or year.
export function useFormatDate(date) {
  const formatedDate = {
    weekday: "",
    month: "",
    day: 0,
    year: 0,
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

  const formatDate = () => {
    const parts = dateTimeFormat.formatToParts(date);
    const partValues = parts.map((p) => p.value);

    formatedDate.weekday = partValues[0];
    formatedDate.month = partValues[2];
    formatedDate.day = partValues[4];
    formatedDate.year = partValues[6];
  };

  formatDate();
  return formatedDate;
}
