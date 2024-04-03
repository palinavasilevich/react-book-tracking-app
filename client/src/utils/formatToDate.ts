import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export const formatToDate = (date?: Date | Dayjs) => {
  return dayjs(date).format("L");
};
