var a = new Date(2024, 4, 24, 13, 57, 22).toLocaleString("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

import { type ThinGyan,  thingyan } from "../dist";
console.log(thingyan(1300));
/* 

{
  YearFrom: 1385,
  YearTo: 1386,
  AkyoDay: 'Sat, Apr 13, 2024',
  AkyaDayTime: 'Sun, Apr 14, 2024, 12:24:44 AM',
  AkyatDay: 'Mon, Apr 15, 2024',
  AkyatDay2: '',
  AtatDayTime: 'Tue, Apr 16, 2024, 04:29:25 AM',
  NewYearDay: 'Wed, Apr 17, 2024'
}
*/
