import { useEffect, useState } from 'react';

export function useWorkHoursCalculation(
  month: number,
  year: number,
  dailyHours: number,
  hourlyRate: number,
  nonWorkingDays: Date[],
) {
  const [businessDays, setBusinessDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [nonWorkingDaysCount, setNonWorkingDaysCount] = useState(0);
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    const calculateWorkHours = () => {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      let businessDaysCount = 0;
      let nonWorkingDaysCount = 0;

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() !== 0 && d.getDay() !== 6) {
          // Check if it's not a weekend
          if (
            !nonWorkingDays.some(
              (nwd) => nwd.toDateString() === d.toDateString(),
            )
          ) {
            businessDaysCount++;
          } else {
            nonWorkingDaysCount++;
          }
        }
      }

      const totalHoursWorked = businessDaysCount * dailyHours;
      const calculatedSalary = totalHoursWorked * hourlyRate;

      setBusinessDays(businessDaysCount);
      setTotalHours(totalHoursWorked);
      setNonWorkingDaysCount(nonWorkingDaysCount);
      setSalary(calculatedSalary);
    };

    calculateWorkHours();
  }, [month, year, dailyHours, hourlyRate, nonWorkingDays]);

  return { businessDays, totalHours, nonWorkingDaysCount, salary };
}
