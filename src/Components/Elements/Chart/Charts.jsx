import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

// Mendaftarkan komponen chart.js yang diperlukan
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, ArcElement, LinearScale);

const BarChart = () => {
  // Data dan opsi untuk chart
  const data = {
    labels: ['Cluster 1', 'Cluster 2', 'Cluster 3'],
    datasets: [
      {
        label: 'Jumlah Data',
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue', 'green'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Jumlah Data per Cluster',
      },
    },
  };

  return (
    <div>
      <h2>Chart Example in React</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

const DoughnutChart = () => {
  // Data untuk grafik
  const data = {
    labels: ['Cluster 1', 'Cluster 2', 'Cluster 3'],
    datasets: [
      {
        label: 'Jumlah Data',
        data: [300, 150, 100], // Nilai untuk setiap label
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Warna untuk tiap segmen
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Opsi konfigurasi grafik
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Posisi legend
      },
      tooltip: {
        enabled: true, // Tooltip aktif
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export { BarChart, DoughnutChart };
