/*
 Acknowledgement
 The algorithm and calculations of this package are totally base on "Modern Myanmar Calendrical Calculations" by Yan Naing Aye.
 
 I just converted it into a package for use in Javascript runtimes.
 
 Information of the original creator Yan Naing Aye
 WebSite: https://yan9a.github.io/mcal/
 MIT License: (https://opensource.org/licenses/MIT)
 Copyright: (c) 2018 Yan Naing Aye
 Doc: http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
 */

/**
 * ## The beginning of the Julian date of the Burmese calendar 0 ME.
 *
 * **This constant was calculated and estimated by Yan Naing Aye.**
 *
 * **I mention it as Y9A in my package in honor of him.**
 */
const Y9A: number = 1954168.050623;
/**
 * ## Type Defination for Julian date to Western date function input
 *
 *  ### jd - julian date
 *  ### ct - calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
 *  ### SG - Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])Gregorian start in British calendar (1752/Sep/14)
 */
interface J2W {
  jd: any;
  calendarType?: number;
  sg?: number;
}
/**
 *  ## Type Defination for Julian date to Western date function returns
 *
 *  ### Gregorian calendar's date and time
 */
interface J2WReturns {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}
/**
 * ## Julian date to Western date
 *
 * This function converts a Julian date to a Western date.
 *
 * @param {J2W} options - An object containing the Julian date, calendar type, and the
 *                        beginning of the Gregorian calendar in JDN.
 * @returns {J2WReturns} - An object containing the year, month, day, hour, minute, and second
 *                          of the Western date.
 */
function j2w(options: J2W): J2WReturns {
  // Default values for calendar type and beginning of the Gregorian calendar in JDN
  const ct = options.calendarType ?? 0;
  const SG = options.sg ?? 2361222;
  const jd = options.jd;
  var j, jf, y, m, d, h, n, s;

  // Calculate the Western date based on the calendar type
  if (ct == 2 || (ct == 0 && jd < SG)) {
    var b, c, f, e;

    // Calculate the Julian date
    j = Math.floor(jd + 0.5);
    jf = jd + 0.5 - j;
    b = j + 1524;

    // Calculate the year, month, and day
    c = Math.floor((b - 122.1) / 365.25);
    f = Math.floor(365.25 * c);
    e = Math.floor((b - f) / 30.6001);
    m = e > 13 ? e - 13 : e - 1;
    d = b - f - Math.floor(30.6001 * e);

    // Calculate the year
    y = m < 3 ? c - 4715 : c - 4716;
  } else {
    j = Math.floor(jd + 0.5);
    jf = jd + 0.5 - j;
    j -= 1721119;
    y = Math.floor((4 * j - 1) / 146097);
    j = 4 * j - 1 - 146097 * y;
    d = Math.floor(j / 4);
    j = Math.floor((4 * d + 3) / 1461);
    d = 4 * d + 3 - 1461 * j;
    d = Math.floor((d + 4) / 4);
    m = Math.floor((5 * d - 3) / 153);
    d = 5 * d - 3 - 153 * m;
    d = Math.floor((d + 5) / 5);
    y = 100 * y + j;
    if (m < 10) {
      m += 3;
    } else {
      m -= 9;
      y = y + 1;
    }
  }

  // Calculate the hour, minute, and second
  jf *= 24;
  h = Math.floor(jf);
  jf = (jf - h) * 60;
  n = Math.floor(jf);
  s = (jf - n) * 60;

  // Return the Western date
  return { year: y, month: m, day: d, hour: h, minute: n, second: s };
}
/**
 * ## Calculates the Atat Time and Akya Time of the Thingyan festival based on the given Burmese year.
 *
 * ### Input
 *    - **my - The Burmese year for which the Atat Time and Akya Time are calculated.**
 *
 * ### Returns
 *   - **An object containing the Julian Date (jd) and Julian Day Number (jdn) for the Atat Time (ja, da) and Akya Time (jk, dk) respectively.**
 *
 */
function thingyanTime(my: number): {
  ja: number;
  jk: number;
  da: number;
  dk: number;
} {
  // solar year (365.2587565)
  const SY: number = 1577917828 / 4320000;
  // Burmese year of changing Atar Time.
  const SE3: number = 1312;
  // Julian Date(jd) of Atat Time for given Burmese Year
  const ja: number = SY * my + Y9A;
  // Julian Day Number(jdn) of Atat Time for given Burmese Year
  const da: number = Math.round(ja);
  // Length of Thingyan festival in days.
  const atarTime: number = my >= SE3 ? 2.169918982 : 2.1675;
  // Julian Date(jd) of Akya Time for given Burmese Year.
  const jk: number = ja - atarTime;
  // Julian Day Number(jdn) of Akya Time for given Burmese Year
  const dk: number = Math.round(jk);
  return { ja, jk, da, dk };
}
/**
 * Interface representing the properties of ThinGyan object.
 * Contains YearTo, YearFrom, AkyoDay, AkyaDayTime, AkyatDay, AkyatDay2, AtatDayTime, and NewYearDay.
 */
export interface ThinGyan {
  YearTo: number;
  YearFrom: number;
  AkyoDay: string;
  AkyaDayTime: string;
  AkyatDay: string;
  AkyatDay2: string;
  AtatDayTime: string;
  NewYearDay: string;
}
/**
 * ## Calculates the dates and times for the Mahar Thingyan festival based on the given Myanmar year.
 * 
 * @param my - The Myanmar year for which the festival dates and times are calculated.
 * @returns - An object containing the festival dates and times.
 * 
 * ```js
 * const thingyan = thingyan(1386);
 * console.log(thingyan.AtatDayTime)
 * ```
 */
export function thingyan(my: number): ThinGyan {
  // Calculate the Myanmar year from which the festival dates are calculated.
  const YearTo: number = my;
  // Calculate the Myanmar year to which the festival dates are calculated.
  const YearFrom: number = my - 1;

  // Calculate the Julian Date and Julian Day Number for the festival dates.
  const tgTime = thingyanTime(YearTo);

  // Calculate the Atat Time for the given Myanmar year.
  const atat = j2w({ jd: tgTime.ja });
  // Format the Atat Time as a string.
  const AtatDayTime: string = new Date(
    atat.year,
    atat.month - 1,
    atat.day,
    atat.hour,
    atat.minute,
    atat.second
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Calculate the Akya Time for the given Myanmar year.
  const akya = j2w({ jd: tgTime.jk });
  // Format the Akya Time as a string.
  const AkyaDayTime: string = new Date(
    akya.year,
    akya.month - 1,
    akya.day,
    akya.hour,
    akya.minute,
    akya.second
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Calculate the day of the Akyo Time for the given Myanmar year.
  const akyo = j2w({ jd: tgTime.dk - 1 });
  // Format the Akyo Time day as a string.
  const AkyoDay: string = new Date(
    akyo.year,
    akyo.month - 1,
    akyo.day
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
  });

  // Calculate the day of the Akyat Time for the given Myanmar year.
  const akyat = j2w({ jd: tgTime.dk + 1 });
  // Format the Akyat Time day as a string.
  const AkyatDay: string = new Date(
    akyat.year,
    akyat.month - 1,
    akyat.day
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
  });

  // Check if there is a second Akyat Time and calculate its day if there is.
  let AkyatDay2: string;
  if (tgTime.da - tgTime.dk > 2) {
    const akyat2 = j2w({ jd: tgTime.da - 1 });
    AkyatDay2 = new Date(
      akyat2.year,
      akyat2.month - 1,
      akyat2.day
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      weekday: "short",
    });
  } else {
    AkyatDay2 = "";
  }

  // Calculate the day of the New Year Day following the festival.
  const newyear = j2w({ jd: tgTime.da + 1 });
  // Format the New Year Day as a string.
  const NewYearDay: string = new Date(
    newyear.year,
    newyear.month - 1,
    newyear.day
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
  });

  // Return the festival dates and times.
  return {
    YearFrom,
    YearTo,
    AkyoDay,
    AkyaDayTime,
    AkyatDay,
    AkyatDay2,
    AtatDayTime,
    NewYearDay,
  };
}
