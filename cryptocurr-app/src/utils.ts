export const percentFormatter = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 2,
  style: "percent"
});

export const numberFormatter = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 3
});

export const createDateFormatter = (options?: Intl.DateTimeFormatOptions) => {
  const formatter = new Intl.DateTimeFormat("tr-TR", options);
  
  return (date: Date | number) => formatter.format(date);
}
