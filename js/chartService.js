let allocationChartInstance = null;
let sectorChartInstance = null;

function generateColors(count) {
  const colors = [];

  for (let i = 0; i < count; i++) {
    const hue = (i * 360) / count;

    colors.push(`hsl(${hue}, 70%, 60%)`);
  }

  return colors;
}

function renderAllocationChart(holdings) {
  const allocations = calculateAllocation(holdings);

  const labels = allocations.map((item) => {
    return item.symbol;
  });

  const values = allocations.map((item) => {
    return item.allocation;
  });
  const chartCanvas = document.getElementById("allocationChart");
  const chartContext = chartCanvas.getContext("2d");

  if (allocationChartInstance) {
    allocationChartInstance.destroy();
  }

  allocationChartInstance = new Chart(chartContext, {
    type: "pie",

    data: {
        labels: labels,

        datasets: [
            {
                data: values,
                backgroundColor: generateColors(values.length),
                borderWidth: 1
            }
        ]
      }
    });

}

function renderSectorChart(holdings) {
    const sectorExposures = calculateSectorExposure(holdings);
    const labels = sectorExposures.map((item) => {
        return item.sector;
    });
    const values = sectorExposures.map((item) => {
        return item.allocation;
    });
    const chartCanvas = document.getElementById("sectorChart");
    const chartContext = chartCanvas.getContext("2d");
    if (sectorChartInstance) {
        sectorChartInstance.destroy();
    }
    sectorChartInstance = new Chart(chartContext, {
        type: "bar",
        data: {
            labels: labels,

            datasets: [
                {
                    label: "Sector Allocation (%)",
                    data: values,
                    backgroundColor: generateColors(values.length)
                }   
            ]
        },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;

                            return `${context.label}: ${value.toFixed(2)}%`;
                        }
                    }
                    }
                }
            }
    });

}