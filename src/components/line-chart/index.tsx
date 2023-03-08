import { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ChartArea,
  ChartData,
  ChartOptions,
  Plugin,
} from "chart.js";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
  const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  gradient.addColorStop(0.21, "rgba(124, 58, 237, 0.5)");
  gradient.addColorStop(1, "rgba(124, 58, 237, 0)");
  return gradient;
};

type Props = {
  data: Record<string, number>;
};

function LineChart({ data }: Props) {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  const daysArray = Object.keys(data)
    .map((key) => key)
    .reverse();

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      labels: Array(Object.keys(data).length).fill(""),
      datasets: [
        {
          data: Object.values(data),
          borderColor: "#7c3aed",
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "#7c3aed",
          pointStyle: "circle",
          borderJoinStyle: "round",
          animations: {
            backgroundColor: {
              duration: 0,
            },
          },
          fill: true,
          backgroundColor: createGradient(chart.ctx, chart.chartArea),
        },
      ],
    } as ChartData<"line">;

    setChartData(chartData);
  }, [data]);

  const tooltipLine: Plugin<"line"> = {
    id: "tooltipLine",
    beforeTooltipDraw: (chart) => {
      const { tooltip } = chart;
      const ctx = chart.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(tooltip?.caretX ?? 0, chart.chartArea.top);
      ctx.lineTo(tooltip?.caretX ?? 0, chart.chartArea.bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#94A3B8";
      ctx.stroke();
      ctx.restore();
    },
  };

  const tooltipModel: Plugin<"line"> = {
    id: "tooltipModel",
    beforeTooltipDraw: (chart) => {
      const { tooltip } = chart;
      if (!tooltip) return;
      const positionOnTop = chart.chartArea.top + 15;
      tooltip.y = positionOnTop;
    },
  };

  const plugins: Plugin<"line">[] = [tooltipLine, tooltipModel];

  const options: ChartOptions<"line"> = {
    hover: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        animation: false,
        backgroundColor: "white",
        bodyColor: "#0F172A",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        bodyFont: {
          family: "'Inter'",
          lineHeight: 2,
          size: 14,
          style: "normal",
          weight: "500",
        },
        yAlign: "bottom",
        titleColor: "#0F172A",
        callbacks: {
          label: (tooltip) => {
            const value = tooltip.formattedValue;
            const formattedValue =
              value.length > 4 ? value.slice(0, value.length - 1) : value;
            return `${formattedValue}  ${dayjs(daysArray[tooltip.dataIndex])
              .locale("pt-br")
              .format("ddd., DD [de] MMM.")}`;
          },
        },
        boxWidth: 0,
        padding: 8,
        caretSize: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
        },
        grid: {
          tickWidth: 0,
        },
        border: {
          display: false,
        },
      },
    },
  } as ChartOptions<"line">;

  return (
    <Line ref={chartRef} data={chartData} options={options} plugins={plugins} />
  );
}

export default LineChart;
