'use client'

import Image from "next/image";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { AgeCalculator } from "./ageCalculator";
import moment from "moment";


export default function Home() {
  const {control, register, onChange, getValues, watch } = useForm();
  const enteredValues = watch();
  let calculatedDuration = moment;
  console.log(calculatedDuration);


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
        <button type="button" onClick={calculatedDuration = () => AgeCalculator(enteredValues)} className="bg-[hsl(278,68%,11%)] flex h-10 w-72 rounded-md py-1.5 text-lg mb-7 text-[hsl(270,3%,87%)] px-28">Submit</button>
        <DevTool control={control} />

        <div>
          <div>{calculatedDuration.years() || '--'} years</div>
          <div>{calculatedDuration.months() || '--'} months</div>
          <div>{calculatedDuration.days() || '--'} days</div>
        </div>
      </div>

    </main>
  );
}
