
export const dateToEpoch2 = (thedate)=> {
    
    return thedate.setHours(0,0,0,0);
 }
 export const timeDiffCalc=(dateFuture, dateNow) =>{
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;


    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    console.log('calculated hours', hours); 

    return hours;
  }