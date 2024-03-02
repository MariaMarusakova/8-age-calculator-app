import moment from "moment";

export const AgeCalculator = (enteredValues) => {

    const enteredDate = new Date(enteredValues.year, enteredValues.month - 1, enteredValues.day);
    const currentDate = new Date();
    
    let calculatedDifference = moment(enteredDate).diff(currentDate);
    const calculatedDuration = moment.duration(calculatedDifference);
    const days = calculatedDuration.hours() != 0 ? calculatedDuration.days()+1: calculatedDuration.days();

    console.log("-----------------------------------------------------------");

    console.log("Years:", calculatedDuration.years());
    console.log("Months:", calculatedDuration.months());
    console.log("Days:", days);
    console.log("Hours:", calculatedDuration.hours());
    console.log("Minutes:", calculatedDuration.minutes());
    console.log("Seconds:", calculatedDuration.seconds());

    console.log("-----------------------------------------------------------");

    return calculatedDuration;

}


