const data = [
  { id: 'a', value: 30 },
  { id: 'b', value: 80 },
  { id: 'c', value: 45 }
];

const renderChart = () => {
  const chart = document.getElementById('chart');
  chart.innerHTML = '';

  data.forEach(item => {
    const container = document.createElement('div');
    container.className = 'bar-container';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${item.value * 2}px`;

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = item.id;

    container.appendChild(bar);
    container.appendChild(label);
    chart.appendChild(container);
  });
};

window.onload = renderChart;