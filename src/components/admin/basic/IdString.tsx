const IdString = (str: string | undefined | null): string => {
    if (typeof str === "string") {
        const atIndex = str.indexOf('@');
        if (atIndex !== -1) {
            return str.slice(0, atIndex);
        }
        return str;
    } else {
        return "";
    }
}

export default IdString;