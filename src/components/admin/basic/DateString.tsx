const DateString = (str: string | undefined | null) => {
    if (typeof(str) === "string") {
        return str.replace(/-/g, '.');
    } else {
        return "";
    }
}

export default DateString;