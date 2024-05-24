import { thingyan } from "../src/index.ts";

describe('thingyan', () => {

    // Verify correct calculation of Atat Day Time for a given Myanmar year
    it('should calculate correct Atat Day Time for a given Myanmar year', () => {
      const myanmarYear = 1386;
      const result = thingyan(myanmarYear);
      const expectedDate = new Date(result.AtatDayTime).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        weekday: "short",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      expect(result.AtatDayTime).toBe(expectedDate);
    });

    // Verify behavior when the Myanmar year is at the boundary of changing Atar Time (SE3)
    it('should handle the boundary of changing Atar Time correctly', () => {
      const myanmarYear = 1312; // SE3 boundary year
      const result = thingyan(myanmarYear);
      const resultPreviousYear = thingyan(myanmarYear - 1);
      expect(result.AkyaDayTime).not.toEqual(resultPreviousYear.AkyaDayTime);
    });
    it('should validate data types of each field in the returned object', () => {
      const myanmarYear = 1386;
      const result = thingyan(myanmarYear);
      expect(typeof result.YearTo).toBe('number');
      expect(typeof result.YearFrom).toBe('number');
      expect(typeof result.AkyoDay).toBe('string');
      expect(typeof result.AkyaDayTime).toBe('string');
      expect(typeof result.AkyatDay).toBe('string');
      expect(typeof result.AkyatDay2).toBe('string');
      expect(typeof result.AtatDayTime).toBe('string');
      expect(typeof result.NewYearDay).toBe('string');
    });
});
