import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts';

interface IHistoricalData {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps {
    coinId: string;
}
function Chart({ coinId } : ChartProps) {
    const { isLoading, data } = useQuery<IHistoricalData[]>(["ohlcv", coinId], 
    () => fetchCoinHistory(coinId),
    {
        refetchInterval: 5000,
    });
    return <div>{isLoading ? "Loading chart..." : 
    <ApexChart 
        type="line"
        series={[
            {
                name: "Price",
                data: data?.map(price => price.close)
            },
        ]}
        options={{
            stroke: {
                curve: "smooth",
                width: 4, 
            },
            grid: {
                show: false,
            },
            theme: {
                mode: "light"
            },
            chart:{
                height: 300,
                width: 500,
                toolbar: {
                    show: false,
                },
                background: "transparent"
            },
            yaxis: {
                show: false,
            },
            xaxis: {
                axisTicks : {
                    show: false,
                },
                axisBorder: { 
                    show: false,
                },
                labels: {
                    show : false,
                },
                type: "datetime",
                categories: data?.map(price => price.time_close),
            },
            fill: {
                type: "gradient",
                gradient: { gradientToColors: ["blue"], stops: [1, 100]}
            },
            colors: ["red"],
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`
                }
            }
        }}  />}
    </div>
}

export default Chart;