import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Graph001 = (props) => {
  const canvasRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    // Initialize the chart when the component mounts
    const ctx = canvasRef.current.getContext("2d");
    chartInstance = new Chart(ctx, {
      type: "line",

      data: {
        labels: [], // array of x-axis labels
        datasets: [
          {
            label: "Real-time Data",
            data: [], // array of y-axis data points
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: "start",
            cubicInterpolationMode: "monotone",
            stepped: props.stepped,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            // display: true,
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Value",
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      chartInstance.destroy();
    };
  }, []);

  // Function to update the chart with new data
  const updateChart = (x, y) => {
    chartInstance.data.labels.push(x);
    // chartInstance.data.datasets[0].data.push(y);
    chartInstance.data.datasets.forEach((dataset) => {
      dataset.data.push(y);
    });
    chartInstance.update();
    if (chartInstance.data.labels.length > 10) {
      chartInstance.data.labels.shift();
      chartInstance.data.datasets[0].data.shift();
    }
    chartInstance.update();
  };

  // Simulate real-time data updates (you can replace this with your own data source)
  useEffect(() => {
    const interval = setInterval(() => {
      const x = new Date().toLocaleTimeString();
      const y = Math.random() * 100;
      updateChart(x, y);
    }, 1000);

    // Cleanup function to stop the data updates when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Graph001;
