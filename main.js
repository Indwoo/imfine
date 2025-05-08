const data = [
  { id: 'a', value: 30 },
  { id: 'b', value: 80 },
  { id: 'c', value: 45 }
];

function rerenderAll() {
  renderChart();
  renderEditTable();
}

function renderChart() {
  const chart = document.getElementById('chart');

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

  const numSteps = maxY / step;
  for (let i = numSteps; i >= 0; i--) {
    const label = document.createElement('div');
    label.className = 'y-label';
    label.textContent = i * step;
    axis.appendChild(label);
  }
}

function renderEditTable() {
  const tbody = document.getElementById('edit-table');

  data.forEach((item, index) => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = item.id;

    const tdValue = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'number';
    input.value = item.value;
    input.dataset.index = index;
    tdValue.appendChild(input);

    const tdAction = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.textContent = '삭제';
    delBtn.onclick = () => {
      data.splice(index, 1);
      rerenderAll();
    };
    tdAction.appendChild(delBtn);

    tr.appendChild(tdId);
    tr.appendChild(tdValue);
    tr.appendChild(tdAction);
    tbody.appendChild(tr);
  });
}

document.getElementById('apply').onclick = () => {
  const inputs = document.querySelectorAll('#edit-table input');
  inputs.forEach(input => {
    const index = input.dataset.index;
    const newVal = parseInt(input.value, 10);
    if (!isNaN(newVal)) {
      data[index].value = newVal;
    }
  });
  rerenderAll();
};



window.onload = () => {
  rerenderAll();
};