function convertDateToDateStringForCalendar(date: Date): string{
    const dateString = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,"0")}-${date.getDate().toString().padStart(2,"0")}`

    return dateString;
}

export {
    convertDateToDateStringForCalendar
};
