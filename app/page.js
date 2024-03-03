'use client'

import Image from "next/image";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import moment from "moment";


export default function Home() {
  const { control, register, onChange, getValues, watch } = useForm();
  const enteredValues = watch();

  let calculatedDuration = moment();
  const [days, setDays] = useState(-1);
  const [years, setYears] = useState(-1);
  const [months, setMonths] = useState(-1);

  const ageCalculator = (enteredValues, days, months, years) => {
    const enteredDate = new Date(enteredValues.year, enteredValues.month - 1, enteredValues.day);
    const currentDate = new Date();


    let calculatedDifference = moment(enteredDate).diff(currentDate);
    const calculatedDuration = moment.duration(calculatedDifference);
    const roundedDays = calculatedDuration.hours() != 0 ? calculatedDuration.days() - 1 : calculatedDuration.days();

    setMonths(Math.abs(calculatedDuration.months()));
    setDays(Math.abs(roundedDays));
    setYears(Math.abs(calculatedDuration.years()));

  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white w-80 h-96 rounded-3xl rounded-br-[90px] md:w-1/3 md:h-[500px] md:rounded-br-[150px] block">
        <form>
          <div className="mb-10 flex m-10">
            <div>
              <label className="font-[600] text-xs text-[hsl(0,1%,44%)] tracking-widest">DAY</label>
              <input name="day" placeholder="DD" className="flex h-10 w-16 md:h-12 md:w-24 rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none 
				focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mr-2 md:mr-5" {...register("day", { onChange: () => onChange })}></input>
            </div>
            <div>
              <label className="font-[600] text-xs text-[hsl(0,1%,44%)] tracking-widest">MONTH</label>
              <input name="month" placeholder="MM" className="flex h-10 w-16 md:h-12 md:w-24 rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none 
				focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mr-4 md:mr-5" {...register("month", { onChange: () => onChange })}></input>
            </div><div>
              <label className="font-[600] text-xs text-[hsl(0,1%,44%)] tracking-widest">YEAR</label>
              <input name="year" placeholder="YYYY" className="flex h-10 w-20 md:h-12 md:w-36 rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none 
				focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("year", { onChange: () => onChange })}></input>
            </div>
          </div>
        </form>

        <div className="md:mt-10 mt-10">
          <hr className="bg-[hsl(0,0%,86%)] h-0.5 m-10 md:mt-10 md:ml-12 md:mr-16 md:mb-10" />
          <button type="button" onClick={() => ageCalculator(enteredValues)} className="-mt-16 md:-mt-20 scale-75 md:scale-100 h-15 w-15 md:ml-[450px] ml-[130px] flex md:h-20 md:w-20 bg-[hsl(259,100%,65%)] 
        p-[5px] md:p-4 rounded-full hover:bg-black">
            <svg className="scale-[55%] md:scale-100" xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" /></g></svg><span></span>
          </button>
        </div>

        <div className="ml-5 md:ml-10 mt-6 md:mt-6">
          <div className="font-[800] italic text-5xl md:text-7xl text-violet-600">{(years === -1) ? '--' : years} <span className="text-black">years</span></div>
          <div className="font-[800] italic text-5xl md:text-7xl  text-violet-600">{(months === -1) ? '--' : months} <span className="text-black">months</span></div>
          <div className="font-[800] italic text-5xl md:text-7xl text-violet-600">{(days === -1) ? '--' : days} <span className="text-black">days</span></div>
        </div>
      </div>

    </main>
  );
}
