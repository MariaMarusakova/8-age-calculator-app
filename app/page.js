'use client'

import Image from "next/image";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import moment from "moment";


export default function Home() {
  const {control, register, onChange, getValues, watch } = useForm();
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
  const roundedDays = calculatedDuration.hours() != 0 ? calculatedDuration.days()-1: calculatedDuration.days();

  setMonths(Math.abs(calculatedDuration.months()));
  setDays(Math.abs(roundedDays));
  setYears(Math.abs(calculatedDuration.years()));

}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white w-80 h-96 rounded-3xl rounded-br-[90px] md:w-2/5 md:h-[600px] md:rounded-br-[150px] block">
        <form>
          <div className="mb-10 flex m-10">
            <label>DAY</label>
            <input name="day" placeholder="DD" className="flex h-10 w-16 md:h-10 md:w-24 rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none 
				focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("day", {onChange: () => onChange})}></input>

            <label>MONTH</label>
            <input name="month" placeholder="MM" className="flex h-10 w-16 md:h-10 md:w-24 rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none 
				focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("month", {onChange: () => onChange})}></input>

            <label>YEAR</label>
            <input name="year" placeholder="YYYY" className="flex h-10 w-32 md:h-10 md:w-24 rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none 
				focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("year", {onChange: () => onChange})}></input>          
        
        </div>
        </form>
        <button type="button" onClick={() => ageCalculator(enteredValues)} className="h-15 w-15 md:ml-96 flex md:h-20 md:w-20 bg-[hsl(259,100%,65%)] p-[5px] md:p-4 rounded-full hover:bg-black">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg><span></span></button>

        <div className="ml-10 mt-14">
          <div className="font-[800] italic text-8xl text-violet-600">{( years === -1 )? '--' : years} <span className="text-black">years</span></div>
          <div className="font-[800] italic text-8xl  text-violet-600">{( months === -1 )? '--' : months} <span className="text-black">months</span></div>
          <div className="font-[800] italic text-8xl  text-violet-600">{( days === -1 )? '--' : days} <span className="text-black">days</span></div>
        </div>
      </div>

    </main>
  );
}
