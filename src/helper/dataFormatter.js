const dateFormatter = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
    const month = dateObj.getMonth() < 10 ? `0${dateObj.getMonth()}` : dateObj.getMonth();
    return `${day}/${month}/${dateObj.getFullYear()}`;
}

const runtimeFormatter = (runtime) => {
    const hour = Math.floor(runtime/60);
    const minute = runtime - (hour * 60);
    return `${hour}h ${minute}m`;
}

export { dateFormatter, runtimeFormatter }