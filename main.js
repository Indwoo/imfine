const data = [
  { id: 'a', value: 30 },
  { id: 'b', value: 80 },
  { id: 'c', value: 45 }
];

function renderChart() {
  const chart = document.getElementById('chart');
  chart.innerHTML = '';

  const maxY = getMaxY(data.map(d => d.value));
  renderYAxis(maxY);

  data.forEach(item => {
    const container = document.createElement('div');
    container.className = 'bar-container';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${(item.value / maxY) * 100}%`;
    bar.textContent = ''; 

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = item.id;

    container.appendChild(bar);
    container.appendChild(label);
    chart.appendChild(container);
  });
}

function getMaxY(valueList, step = 25) {
  const maxVal = Math.max(...valueList);
  return Math.ceil(maxVal / step) * step;
}

function renderYAxis(maxY, step = 25) {
  const axis = document.getElementById('y-axis');
  axis.innerHTML = '';

  const numSteps = maxY / step;
  for (let i = numSteps; i >= 0; i--) {
    const label = document.createElement('div');
    label.className = 'y-label';
    label.textContent = i * step;
    axis.appendChild(label);
  }
}

window.onload = renderChart;