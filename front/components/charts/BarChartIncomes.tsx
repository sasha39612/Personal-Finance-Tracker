'use client';
import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration,
} from "chart.js";
import { IncomeCharts } from "@/lib/types";

// Register necessary components
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChartIncomes = ({ incomeFetch }: { incomeFetch: IncomeCharts }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Deep clone incomeFetch to avoid mutation errors
      const clonedData = JSON.parse(JSON.stringify(incomeFetch));
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const context = chartRef.current.getContext("2d");
      if (context) {
        const config: ChartConfiguration<"bar", number[], string> = {
          type: "bar",
          data: clonedData,
          options: {
            responsive: true,
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: false, // hides entire legend
              }
            }
          },
        };

        chartInstanceRef.current = new ChartJS(context, config);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [incomeFetch]);

  return (
    <div
      className="relative w-full h-full lg:col-span-1 lg:row-start-2 lg:row-end-2"
    >
      <p className="text-center uppercase pb-1">Incomes</p>
      <canvas style={{
        width: "100%",
        height: "100%",
        maxHeight: '600px',
      }}
        ref={chartRef} />
    </div>
  );
};

export default BarChartIncomes;
