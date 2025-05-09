const data = [
  { id: 'a', value: 30 },
  { id: 'b', value: 80 },
  { id: 'c', value: 45 }
];

function rerenderAll() {
  renderChart();
  renderEditTable();
  updateJsonEditor();
}

//차트 렌더링
function renderChart() {
  const chart = document.getElementById('chart');
  chart.innerHTML = '';

  const values = data.map(d => d.value);
  const step = getAutoStep(Math.max(...values)); // step 동적 계산
  const maxY = getMaxY(values, step);
  renderYAxis(maxY, step);

  data.forEach(item => {
    const container = document.createElement('div');
    container.className = 'bar-container';

    const valueLabel = document.createElement('div');
    valueLabel.className = 'bar-value';
    valueLabel.textContent = item.value;

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${(item.value / maxY) * 100}%`;
    bar.textContent = '';

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = item.id;

    container.appendChild(bar);
    container.appendChild(label);
    container.appendChild(valueLabel);
    chart.appendChild(container);
  });
}

// Y축 Max 값
function getMaxY(valueList, step = 25) {
  const maxVal = Math.max(...valueList);
  return Math.ceil(maxVal / step) * step;
}

// Y축 Auto Scaling (기본값 25)
function getAutoStep(maxVal, maxSteps = 8) {
  const baseStep = 25;
  const estimatedSteps = Math.ceil(maxVal / baseStep);

  if (estimatedSteps > maxSteps) {
    return Math.ceil(maxVal / maxSteps / baseStep) * baseStep;
  }

  return baseStep;
}

// Y축 렌더링
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

// 값 편집 렌더링
function renderEditTable() {
  const tbody = document.getElementById('edit-table');
  tbody.innerHTML = '';

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

// 값 편집 Apply 버튼
document.getElementById('apply').onclick = () => {
  const idInput = document.getElementById('add-id');
  const valueInput = document.getElementById('add-value');
  const newId = idInput.value.trim();
  const newValue = parseInt(valueInput.value.trim(), 10);

  if (newId && !isNaN(newValue)) {
    if (data.some(item => item.id === newId)) {
      alert('중복된 ID입니다!');
      return;
    }
    data.push({ id: newId, value: newValue });
    idInput.value = '';
    valueInput.value = '';
  }

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

// 값 고급 편집 Apply 버튼
document.getElementById('apply-json').onclick = () => {
  const editor = document.getElementById('json-editor');
  try {
    const parsed = JSON.parse(editor.value);

    if (!Array.isArray(parsed)) {
      throw new Error('JSON의 배열 형식을 준수하세요!');
    }

    const valid = parsed.every(item =>
      typeof item.id === 'string' &&
      typeof item.value === 'number'
    );
    if (!valid) {
      throw new Error('{ id: string, value: number } 형식을 준수해주세요!');
    }

    data.length = 0;
    parsed.forEach(item => data.push(item));
    rerenderAll();
  } catch (e) {
    alert('잘못된 형식입니다 : ' + e.message);
  }
};

function updateJsonEditor() {
  const editor = document.getElementById('json-editor');
  editor.value = JSON.stringify(data, null, 2);
}

window.onload = () => {
  rerenderAll();
};