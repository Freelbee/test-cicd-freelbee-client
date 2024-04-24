import moment from 'moment';

export default class DateUtil {

  public static EUROPEAN_DATE_FORMAT = 'DD.MM.YYYY';

  public static getFormatDate (date?: string | null) {
    return date ? moment(date).format(`YYYY-MM-DD`) : null;
  }

  public static getFormatDateWidthTime (date?: string | null) {

    return date ? moment(date).format(`YYYY-MM-DD hh:mm`) : null;
  }


  public static getDateFormatTimeZoneFromBeginDay (date?: Date | null) {
    if(!date) {
      return null;
    }
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  }

  // public static getDateFormatTimeZoneFromBeginDay (date: string) {
  //     return new Date(new Date(date).getTime() - (new Date(date).getTimezoneOffset() * 60000)).toISOString();
  // }

  public static getDayDiff (leftDate: Date, rightDate: Date): number {
    const one_day = 1000 * 60 * 60 * 24;


    const difference_ms = leftDate.getTime() - rightDate.getTime();

    return Math.round(difference_ms / one_day);
  }
}
