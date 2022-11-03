import dayjs from "dayjs/esm";
import 'dayjs/esm/locale/zh-cn' // load on demand
import weekday from "dayjs/esm/plugin/weekday";
import localeData from "dayjs/esm/plugin/localeData";
import isoWeek from "dayjs/esm/plugin/isoWeek";

dayjs.locale('zh-cn') // use Spanish locale globally
dayjs.extend(localeData)
dayjs().localeData()
dayjs.extend(weekday)
dayjs.extend(isoWeek)

const localLocale = dayjs
export default localLocale

