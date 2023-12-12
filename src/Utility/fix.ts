//This function return color for schedule.
export const changeColorLarge = (sparkline: string[]) => {
    if (sparkline) {
        return sparkline[0] > sparkline[sparkline.length - 1] ? ['rgb(222,10,10, 0.4)'] : ['rgba(0,250,5,0.4)']
    }
}

//This function also  return color for schedule.
export const changeColorSmall = (sparkline: string[]) => {
    if (sparkline) {
        return sparkline[0] > sparkline[19] ? "red" : "green"
    }
}

//This function also return color for schedule.
export const switherPercent = (percent: number ) => {
    return percent > 0 ? "#16FF0066" : "#ff0000"
}

//This function divides a number into thousands and places commas between them


export const fixPrice = (price?: string | number | undefined  ) => {

    return price! >= 1 ? new Intl.NumberFormat('en-US').format(price as number).slice(0, -1) :
        Number.parseFloat(price as string).toFixed(5)

}


//This function converts the received time in seconds.
export const convertTime = (timeStamp: number | undefined) => {
    return timeStamp ? new Date(timeStamp * 1000).toLocaleTimeString("en-US") :
        [0, 2, 4, 6, 8, 10, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44,]

}
export const convertData = (timeStamp: number | undefined ) => {
    return timeStamp ? new Date(timeStamp * 1000).toLocaleDateString("en-US") :
        [0, 2, 4, 6, 8, 10, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44,]

}
