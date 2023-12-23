export const intervalMapping = {
    "1minute":"1 Minute",
    "30minute":"30 Minutes",
    "day":"Day",
    "week":"Week",
    "month":"Month",
}

export const durationMapping = {
    "1minute":{
        qty:"1", //1800 candles
        unit:"week"
    },
    "30minute":{
        qty:"6", //1920
        unit:"month"
    },
    "day":{
        qty:"4", //1040
        unit:"year"
    },
    "week":{
        qty:"10", //520
        unit:"year"
    },
    "month":{
        qty:"30", // 360
        unit:"year"
    },
}

export const ADD_STOCKS = 'add_multiple_stocks';
export const ADD_STOCK = 'add_single_stocks';
export const REMOVE_STOCK = 'remove_single_stocks';