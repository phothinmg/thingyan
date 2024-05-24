/**
 * Interface representing the properties of ThinGyan object.
 * Contains YearTo, YearFrom, AkyoDay, AkyaDayTime, AkyatDay, AkyatDay2, AtatDayTime, and NewYearDay.
 */
interface ThinGyan {
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
declare function thingyan(my: number): ThinGyan;

export { type ThinGyan, thingyan };
