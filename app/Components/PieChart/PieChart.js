import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ completedTasks, incompleteTasks }) => {
  const data = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        data: [completedTasks, incompleteTasks],
        backgroundColor: ["#4caf50", "#f44336"],
        borderColor: ["#388e3c", "#d32f2f"],
        borderWidth: 1,
        hoverBackgroundColor: ["#66bb6a", "#e57373"],
        hoverBorderColor: ["#2e7d32", "#c62828"],
        hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            size: 20,
            family: 'Arial', // Font family of the legend text
          },
          padding: 20, // Increase padding to create more space
          usePointStyle: true, // Use point style for legend
          pointStyle: 'circle', // Set point style to circle
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#666',
        borderWidth: 1,
        cornerRadius: 4,
      },
      title: {
        display: true,
        text: 'Tasks Completion Status Overview',
        font: {
          size: 25,
          weight: 'bold',
          family: 'Arial', // Font family of the title
        },
        color: '#fff',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;

