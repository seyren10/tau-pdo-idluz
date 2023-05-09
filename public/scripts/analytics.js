console.log(evaluation);
const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart2");
const chartData = {
  labels: [
    "Responsiveness",
    "Reliability",
    "Communication",
    "Courtesy",
    "Integrity",
    "Access and Facilities",
  ],
  datasets: [
    {
      label: "Average",
      data: [...Object.values(evaluation)].map((d) => Math.round(d)),
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      borderWidth: 0,
    },
  ],
};

const maxValue = Math.max(...Object.values(evaluation));
const chartData2 = {
  labels: [
    "Responsiveness",
    "Reliability",
    "Communication",
    "Courtesy",
    "Integrity",
    "Access and Facilities",
  ],
  datasets: [
    {
      data: [...Object.values(evaluation)].map(
        (d) => `${(d / maxValue) * 100}`
      ),
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      borderWidth: 0,
    },
  ],
};
const footer = (data) => {
  switch (data[0].parsed) {
    case 1:
      return "Very Dissatisfied";
    case 2:
      return "Dissatisfied";
    case 3:
      return "Neither Satisfied nor Dissatisfied";
    case 4:
      return "Satisfied";
    case 5:
      return "Very Satisfied";
  }
  return [...data];
};
// Create the chart
const chart = new Chart(ctx, {
  type: "doughnut",
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Client's Feedback Chart (Average)",
      },
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          footer: footer,
        },
      },
    },
  },
});

// Create the chart
const chart2 = new Chart(ctx2, {
  type: "bar",
  data: chartData2,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Client's Feedback Chart (Percentage)",
      },
      legend: {
        display: false,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }

            if (context.parsed.y !== null) {
              label += `${context.parsed.y}%`;
            }

            return label;
          },
        },
      },
    },
  },
});
