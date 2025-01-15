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

// Register necessary components
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChatOutcomes: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const context = chartRef.current.getContext("2d");
      if (context) {
        const config: ChartConfiguration<"bar", number[], string> = {
          type: "bar",
          data: {
            labels: ["John", "Jane", "Doe"],
            datasets: [
              {
                data: [34, 64, 23],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                ],
                borderWidth: 1,
              },
            ],
          },
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
  }, []);

  return (
    <div
      className="relative w-full h-full lg:col-span-1 lg:row-start-2 lg:row-end-2"
    >
      <p className="text-center uppercase pb-1">Outcomes</p>
      <canvas style={{
        width: "100%",
        height: "100%",
        maxHeight: '600px',
      }}
        ref={chartRef} />
    </div>
  );
};

export default BarChatOutcomes;
