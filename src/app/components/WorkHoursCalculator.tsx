'use client';

import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useWorkHoursCalculation } from '@/hooks/useWorkHoursCalculation';
import parseNumber from '@/lib/parseNumber';
import { cn } from '@/lib/utils';

export function WorkHoursCalculator() {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [dailyHours, setDailyHours] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [nonWorkingDays, setNonWorkingDays] = useState<Date[]>([]);

  const onSelect = (selectedDates: Date[] | undefined) => {
    if (selectedDates) {
      setNonWorkingDays(selectedDates);
    } else {
      setNonWorkingDays([]);
    }
  };

  const { businessDays, totalHours, nonWorkingDaysCount, salary } =
    useWorkHoursCalculation(
      month,
      year,
      dailyHours,
      hourlyRate,
      nonWorkingDays,
    );

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Calculate Work Hours and Salary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='month'>Month</Label>
            <Select
              value={month.toString()}
              onValueChange={(value) => setMonth(parseNumber(value))}
            >
              <SelectTrigger id='month'>
                <SelectValue placeholder='Select month' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {format(new Date(0, i), 'MMMM')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='year'>Year</Label>
            <Input
              id='year'
              type='number'
              defaultValue={year}
              onChange={(e) => setYear(parseNumber(e.target.value))}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='dailyHours'>Daily Work Hours</Label>
            <Input
              id='dailyHours'
              type='number'
              defaultValue={dailyHours}
              onChange={(e) =>
                setDailyHours(parseNumber(e.target.value, 'float'))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='hourlyRate'>Hourly Rate</Label>
            <Input
              id='hourlyRate'
              type='number'
              defaultValue={hourlyRate}
              onChange={(e) =>
                setHourlyRate(parseNumber(e.target.value, 'float'))
              }
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label>Select Non-Working Days</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !nonWorkingDays.length && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {nonWorkingDays.length > 0 ? (
                  nonWorkingDays.length > 1 ? (
                    `${nonWorkingDays.length} days selected`
                  ) : (
                    format(nonWorkingDays[0], 'PPP')
                  )
                ) : (
                  <span>Pick non-working days</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='multiple'
                selected={nonWorkingDays}
                onSelect={onSelect}
                month={new Date(year, month - 1)}
                fromMonth={new Date(year, month - 1)}
                toMonth={new Date(year, month - 1)}
                className='rounded-md border'
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='grid grid-cols-2 gap-4 pt-4'>
          <Card>
            <CardHeader className='p-4'>
              <CardTitle className='text-lg'>Business Days</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>{businessDays}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='p-4'>
              <CardTitle className='text-lg'>Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>{totalHours}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='p-4'>
              <CardTitle className='text-lg'>Non-Working Days</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>{nonWorkingDaysCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='p-4'>
              <CardTitle className='text-lg'>Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>${salary.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
