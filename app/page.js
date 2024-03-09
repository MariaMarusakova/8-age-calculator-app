'use client'

import Image from "next/image";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import moment from "moment";
const { DateTime } = require("luxon");


export default function Home({ formData }) {
  const { control, register, onChange, getValues, watch, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const enteredValues = watch();

  let calculatedDuration = moment();
  const [days, setDays] = useState(-1);
  const [years, setYears] = useState(-1);
  const [months, setMonths] = useState(-1);

  const onSubmit = (data) => {
    const enteredDate = new Date(enteredValues.year, enteredValues.month - 1, enteredValues.day);
    const reactReturnedDate = enteredDate.toString();
    ageCalculator(enteredValues);
  }

  const ageCalculator = (enteredValues) => {
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
      <div className="bg-white w-80 h-96 rounded-3xl rounded-br-[90px] md:w-2/5 md:h-[500px] md:rounded-br-[150px] block">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-10 flex m-10">
            <div>
         {/*    flex h-10 w-16 md:h-12 md:w-28 rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none 
				focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mr-2 md:mr-5 md:mb-1 */}

              <label className={errors?.day?.message ? ["font-[600] text-xs text-red-700 tracking-widest"] : "font-[600] text-xs text-[hsl(0,1%,44%)] tracking-widest"}>DAY</label>
              <input id="day" placeholder="DD" 
              className={errors?.day?.message ? 
              "flex h-10 w-16 md:h-12 md:w-28 rounded-md border-2 px-4 py-1.5 text-sm md:text-lg  border-red-700 mr-2 md:mr-5 md:mb-1":
              "flex h-10 w-16 md:h-12 md:w-28 rounded-md border-2 px-4 py-1.5 text-sm md:text-lg  ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mr-2 md:mr-5 md:mb-1"} 
              type="text"
                {...register("day", {
                  pattern: {
                    value: /^0[1-9]|[12][0-9]|3[01]/,
                    message: "Must be a valid day",
                  },
                  required: "This field is required",
                  validate: (day) => {
                    const date = DateTime.local(
                      Number(getValues("year")),
                      Number(getValues("month")),
                      Number(day)
                    );
                    return date.c !== null || "Must be a valid date";
                  }, 
                  onChange: () => onChange
                })}>
              </input>
              <p className='text-red-700 text-[9px] md:text-[11px] italic w-12 md:w-28'>{errors.day?.message}</p>

            </div>
            <div>
              <label className={errors?.month?.message || errors?.day?.message === "Must be a valid date" ? "font-[600] text-xs text-red-700 tracking-widest" : "font-[600] text-xs text-[hsl(0,1%,44%)] tracking-widest"}>MONTH</label>
              <input name="month" placeholder="MM" className={errors?.month?.message || errors?.day?.message === "Must be a valid date"? 
              "flex h-10 w-16 md:h-12 md:w-28 rounded-md border-2 px-4 py-1.5 text-sm md:text-lg border-red-700 mr-2 md:mr-5 md:mb-1":
              "flex h-10 w-16 md:h-12 md:w-28 rounded-md border-2 px-4 py-1.5 text-sm md:text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mr-2 md:mr-5 md:mb-1"} 
              {...register("month", {
                  required: "This field is required", validate: (value) =>
                    (value < 13 & value > 0) || "Must be a valid month", onChange: () => onChange
                })}></input>
              <p className='text-red-700 text-[9px] md:text-[11px] italic w-16 md:w-28'>{errors.month?.message}</p>

            </div><div>
              <label className={errors?.year?.message || errors?.day?.message === "Must be a valid date" ? "font-[600] text-xs text-red-700 tracking-widest" : "font-[600] text-xs text-[hsl(0,1%,44%)] tracking-widest"}>YEAR</label>
              <input name="year" placeholder="YYYY" className={errors?.year?.message || errors?.day?.message === "Must be a valid date"? 
              "flex h-10 w-20 md:h-12 md:w-28 rounded-md border-2 px-4 py-1.5 text-sm md:text-lg border-red-700 mr-2 md:mr-5 md:mb-1":
              "flex h-10 w-20 md:h-12 md:w-28 rounded-md border-2 px-4 py-1.5 text-sm md:text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mr-2 md:mr-5 md:mb-1"} 
              {...register("year", {
                  required: "This field is required", onChange: () => onChange,
                  validate: (value) =>
                    value < 2025 || "Must be in the past"
                })}></input>
              <p className='text-red-700 text-[11px] italic w-16 md:w-28'>{errors.year?.message}</p>

            </div>
          </div>



          <div className="md:mt-10 mt-10">
            <hr className="bg-[hsl(0,0%,86%)] h-0.5 m-10 md:mt-10 md:ml-12 md:mr-16 md:mb-10" />
            <button type="submit" className="-mt-16 md:-mt-20 scale-75 md:scale-100 h-15 w-15 md:ml-[550px] ml-[130px] flex md:h-20 md:w-20 bg-[hsl(259,100%,65%)] 
        p-[5px] md:p-4 rounded-full hover:bg-black">
              <svg className="scale-[55%] md:scale-100" xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" /></g></svg><span></span>
            </button>
          </div>

        </form>

        <div className="ml-5 md:ml-10 mt-6 md:mt-6">
          <div className="font-[800] italic text-5xl md:text-7xl text-violet-600">{(years === -1 || !years) ? '--' : years} <span className="text-black">years</span></div>
          <div className="font-[800] italic text-5xl md:text-7xl  text-violet-600">{(months === -1 || !months) ? '--' : months} <span className="text-black">months</span></div>
          <div className="font-[800] italic text-5xl md:text-7xl text-violet-600">{(days === -1 || !days) ? '--' : days} <span className="text-black">days</span></div>
        </div>
      </div>

    </main>
  );
}
