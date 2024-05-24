/* cSpell:disable */

import language from "../lib/language.ts";
import { BurmeDate } from "../lib/burmesedate.js";

/**
 * Translates the given text from one language to another.
 *
 * @param {trs} params - The parameters for translation.
 * @param {string} params.text - The text to be translated.
 * @param {number} params.lang - The language code for translation.
 * @returns {string} The translated text.
 */
type trs = {
  text: string;
  lang: number;
};
const translate = ({ text, lang }: trs) => {
  let fstr: string, rstr: string, re: any;
  let fromLn = 1;
  let toLn = lang;
  let l = language.length;
  for (let i = 0; i < l; i++) {
    fstr = language[i][fromLn];
    re = new RegExp(fstr, "g");
    rstr = language[i][toLn];
    text = text.replace(re, rstr);
  }
  return text;
};

/**
 * Retrieves the Burmese date information for a given date.
 *
 * @param date - The date in the format 'YYYY-MM-DD'.
 * @param lang - The language code for translation.
 * @returns An object containing various Burmese date information:
 *   - julianDayNumber: The Julian day number.
 *   - astroDays: An array of translated astrological days.
 *   - publicHolidays: A string of translated public holidays.
 *   - sasanaYear: The translated Sasana year.
 *   - burmeseYear: The translated Burmese year.
 *   - burmeseMonth: The translated Burmese month.
 *   - burmeseDay: The translated Burmese day.
 *   - burmeseWeekDay: The translated Burmese weekday.
 *   - lunarPhase: The translated lunar phase.
 *   - yatyarzar: The translated Yatyarzar.
 *   - pyatthadar: The translated Pyatthadar.
 *   - dragonHead: The translated Dragon Head.
 *   - sabbath: The translated Sabbath.
 *   - lengthOfBurmeseMonth: The translated length of the Burmese month.
 *   - BURMESE_YEAR_IN_NUMBER: The Burmese year in number.
 *   - warHtutType: The translated War Htut type.
 *   - nameOfBurmeseYear: The translated name of the Burmese year.
 *   - maharbote: The translated Maharbote.
 *   - nakhat: The translated Nakhat.
 * @example
 * const date = "2022-01-01";
   const lang = 1;
   const result = GetMmDateTime(date, lang);
   console.log(result);
 */

export function GetMmDateTime(date: string, lang: number) {
  const y = parseInt(date.split("-")[0]);
  const m = parseInt(date.split("-")[1]);
  const d = parseInt(date.split("-")[2]);
  const julianDayNumber = BurmeDate.w2j(y, m, d);
  const mdt = new BurmeDate(julianDayNumber, 6.5);
  const sasanaYear = translate({ text: mdt.ToMString("&YYYY"), lang: lang });
  const burmeseYear = translate({ text: mdt.ToMString("&yyyy"), lang: lang });
  const burmeseMonth = translate({ text: mdt.ToMString("&M"), lang: lang });
  const burmeseDay = translate({ text: mdt.ToMString("&f"), lang: lang });
  const burmeseWeekDay: string = translate({
    text: mdt.ToString("%W "),
    lang: lang,
  });
  const lunarPhase = translate({ text: mdt.ToMString("&P"), lang: lang });
  const yatyarzar = translate({ text: mdt.yatyaza, lang: lang });
  const pyatthadar = translate({ text: mdt.pyathada, lang: lang });
  const dragonHead = translate({ text: mdt.nagahle, lang: lang });
  const sabbath = translate({ text: mdt.sabbath, lang: lang });
  const lengthOfBurmeseMonth = translate({
    text: mdt.mmlen.toString(),
    lang: lang,
  });
  const BURMESE_YEAR_IN_NUMBER = BurmeDate.j2m(julianDayNumber).my;
  const mmyt = ["common", "little watat", "big watat"][mdt.myt];
  const warHtutType = translate({ text: mmyt, lang: lang });
  const h = mdt.holidays;
  let publicHolidays: string;
  if (h.length === 0) {
    publicHolidays = "";
  } else {
    publicHolidays = h.reduce(function (acc: string, currentValue: string) {
      return (
        translate({ text: acc, lang: lang }) +
        "," +
        translate({ text: currentValue, lang: lang })
      );
    });
  }
  const h2 = mdt.holidays2;
  let hd2: string;
  if (h2.length === 0) {
    hd2 = "";
  } else {
    hd2 = h2.reduce(function (acc: string, currentValue: string) {
      return (
        translate({ text: acc, lang: lang }) +
        "," +
        translate({ text: currentValue, lang: lang })
      );
    });
  }
  const nameOfBurmeseYear = translate({ text: mdt.my_name, lang: lang });
  const maharbote = translate({ text: mdt.mahabote, lang: lang });
  const nakhat = translate({ text: mdt.nakhat, lang: lang });
  let astroDays: string[] = [];
  mdt.astro.forEach((item: string) => {
    const a: string = translate({ text: item, lang: lang });
    astroDays.push(a);
  });

  return {
    julianDayNumber,
    astroDays,
    publicHolidays,
    sasanaYear,
    burmeseYear,
    burmeseMonth,
    burmeseDay,
    burmeseWeekDay,
    lunarPhase,
    yatyarzar,
    pyatthadar,
    dragonHead,
    sabbath,
    lengthOfBurmeseMonth,
    BURMESE_YEAR_IN_NUMBER,
    warHtutType,
    nameOfBurmeseYear,
    maharbote,
    nakhat,
  };
}

/**
 * Calculates the Thingyan time based on the given year.
 * Thingyan is Myanmar New Year
 * @param my - The year for which the Thingyan time needs to be calculated.
 * @returns An object containing the calculated Thingyan times:
 *  - ja: The Thingyan time based on the solar year.
 *  - jk: The Thingyan time based on the lunar year.
 *  - da: The rounded Thingyan time based on the solar year.
 *  - dk: The rounded Thingyan time based on the lunar year.
 */
function thingyanTime(my: number) {
  var SY = 1577917828 / 4320000; //solar y (365.2587565)
  var LM = 1577917828 / 53433336; //lunar m (29.53058795)
  var MO = 1954168.050623; //beginning of 0 ME
  var SE3 = 1312; //beginning of 3rd Era
  var ja = SY * my + MO;
  let jk;
  if (my >= SE3) {
    jk = ja - 2.169918982;
  } else {
    jk = ja - 2.1675;
  }
  return { ja: ja, jk: jk, da: Math.round(ja), dk: Math.round(jk) };
}

/**
 * Calculates the dates and times for the Mahar Thingyan festival based on the given Myanmar year.
 *
 * @param my - The Myanmar year for which to calculate the festival dates and times.
 * @returns An object containing the calculated dates and times for the festival.
 *          - YearTo: The Myanmar year for the end of the festival.
 *          - YearFrom: The Myanmar year for the start of the festival.
 *          - AtatTime: The date and time for the Atat Pwe ceremony.
 *          - AkyaTime: The date and time for the Akya Pwe ceremony.
 *          - AkyoDay: The day before the Akya Pwe ceremony.
 *          - AkyaDay: The day of the Akya Pwe ceremony.
 *          - AkyatDay: The day after the Akya Pwe ceremony.
 *          - AkyatDay2: The second day after the Akya Pwe ceremony (if applicable).
 *          - AtatDay: The day of the Atat Pwe ceremony.
 *          - NewYearDay: The day of the Myanmar New Year.
 * @example
 * const festivalDates = MaharThingyan(1385);
   console.log(festivalDates);
 */

export function MaharThingyan(my: number) {
  const YearTo = my + 1,
    YearFrom = my,
    emName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    ppp = thingyanTime(YearTo),
    att = BurmeDate.j2w(ppp.ja),
    AtatTime =
      att.y +
      "-" +
      emName[att.m - 1] +
      "-" +
      att.d +
      " " +
      att.h +
      ":" +
      att.n +
      ":" +
      Math.floor(att.s),
    akt = BurmeDate.j2w(ppp.jk),
    AkyaTime = `${akt.y}-${emName[akt.m - 1]}-${akt.d} ${akt.h}:${
      akt.n
    }:${Math.floor(akt.s)}`,
    akd = BurmeDate.j2w(ppp.dk),
    akyod = BurmeDate.j2w(ppp.dk - 1),
    AkyoDay = `${akyod.y}-${emName[akyod.m - 1]}-${akyod.d}`,
    AkyaDay = `${akd.y}-${emName[akd.m - 1]}-${akd.d}`,
    akyatd = BurmeDate.j2w(ppp.dk + 1),
    AkyatDay = `${akyatd.y}-${emName[akyatd.m - 1]}-${akyatd.d}`,
    atd = BurmeDate.j2w(ppp.da),
    AtatDay = `${atd.y}-${emName[atd.m - 1]}-${atd.d}`,
    nyd = BurmeDate.j2w(ppp.da + 1),
    NewYearDay = `${nyd.y}-${emName[nyd.m - 1]}-${nyd.d}`;
  let AkyatDay2: string;
  if (ppp.da - ppp.dk > 2) {
    const sakdd = BurmeDate.j2w(ppp.da - 1);
    AkyatDay2 = `${sakdd.y}-${emName[sakdd.m - 1]}-${sakdd.d}`;
  } else {
    AkyatDay2 = "";
  }
  return {
    YearTo,
    YearFrom,
    AtatTime,
    AkyaTime,
    AkyoDay,
    AkyaDay,
    AkyatDay,
    AkyatDay2,
    AtatDay,
    NewYearDay,
  };
}
