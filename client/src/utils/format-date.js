export function dateToString(date) {
    const dateObject = new Date(date)

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const day = dateObject.getDate();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}