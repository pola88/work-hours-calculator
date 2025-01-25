import { WorkHoursCalculator } from './components/WorkHoursCalculator';

export default function Home() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Work Hours Calculator
      </h1>
      <WorkHoursCalculator />
    </div>
  );
}
