export const chartData = {
    data: {
      labels: null,
      datasets: [
        {
          fill: false,
          label: 'USD',
          data: null,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: '#fff',
          },
        },
        y: {
          ticks: {
            color: '#fff',
          },
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#fff',
          },
        },
        title: {
          display: true,
          text: null,
          color: '#fff',
          font: {
            size: 30
          }
        },
      },
    },
  }
