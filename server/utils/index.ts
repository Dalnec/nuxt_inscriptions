export const generate_cod = (prefix: string, obj: any) => {
  let number = !!obj ? obj.id : 0;
  number++;
  if (number > 99999) {
    return `${prefix}${number}`;
  } else {
    return `${prefix}${("00000" + number).slice(-5)}`;
  }
};

export function format_date(strdate: string, has_time: boolean) {
  const date = new Date(strdate);
  console.log("tools", date);

  const finalDate =
    date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

  if (has_time) {
    const time = date.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${finalDate} ${time}`;
  }
  return finalDate;
}

export function format_time(strdate: string) {
  const date = new Date(strdate);
  const time = date.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
}
