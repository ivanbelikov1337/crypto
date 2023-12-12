import {changeColorSmall, changeColorLarge, } from "./fix";
import {CategoryScale, Chart, BarController,LogarithmicScale, Filler, LinearScale, LineElement, PointElement} from "chart.js";
import 'chartjs-adapter-moment';

Chart.register(CategoryScale, BarController,LogarithmicScale, Filler, LinearScale, LineElement, PointElement);
export const options: any = {
    layout: {
        padding: 1
    },
    responsive: true,
    animation: true,

    scales: {
        x: {
            type: 'linear',
            display: false,
        },
        y: {

            display: false,

        }
    }
}

export const chartData = (sparkLine: string[]) => {
    const data: any = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,],
        datasets: [
            {
                pointRadius: 1,
                data: sparkLine,
                fill: false,
                backgroundColor: changeColorSmall(sparkLine!),
                borderColor: changeColorSmall(sparkLine!),
            },
        ],
    };
    return data
}

export const optionsLarge: any = {
    layout: {
        padding: 1
    },

    animation: true,
    scales: {
        x: {
            display: true
        },
        y: {
            type: 'logarithmic',
            display: true,
        }
    }
}

export const chartDataLarge = (sparkLine: any[],labels: any[]) => {

    const data: any = {
        labels: labels.reverse(),
        datasets: [
            {
                pointRadius: 1,
                borderWidth: 2,
                data: sparkLine.reverse(),
                fill: true,
                backgroundColor: changeColorLarge(sparkLine!),
                borderColor: changeColorLarge(sparkLine!),
            },
        ],
    };
    return data
}