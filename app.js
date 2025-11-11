const form = document.querySelector('#todo-form');
const input = document.querySelector('#task-input');
const validation = document.querySelector('#validation');
const list = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const remaining = document.querySelector('#tasks-remaining');
const clearCompletedButton = document.querySelector('#clear-completed');

const STORAGE_KEY = 'chatgpt.todo-list.tasks';
let tasks = loadTasks();

render();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = input.value.trim();

  if (!title) {
    showValidation('Please type something meaningful before adding the task.');
    return;
  }

  addTask(title);
  input.value = '';
  showValidation('');
});

list.addEventListener('change', (event) => {
  if (event.target.matches("input[type='checkbox']")) {
    toggleTask(event.target.closest('li').dataset.id);
  }
});

list.addEventListener('click', (event) => {
  if (event.target.closest('.remove-button')) {
    const id = event.target.closest('li').dataset.id;
    removeTask(id);
  }
});

clearCompletedButton.addEventListener('click', () => {
  if (!tasks.some((task) => task.completed)) return;
  tasks = tasks.filter((task) => !task.completed);
  persist();
  render();
});

function addTask(title) {
  const newTask = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
    title,
    completed: false,
  };

  tasks = [...tasks, newTask];
  persist();
  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  persist();
  render();
}

function removeTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  persist();
  render();
}

function render() {
  list.innerHTML = '';

  if (!tasks.length) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }

  tasks.forEach((task) => {
    list.appendChild(renderTask(task));
  });

  updateRemaining();
}

function renderTask(task) {
  const item = document.createElement('li');
  item.className = 'task-item';
  item.dataset.id = task.id;

  const content = document.createElement('div');
  content.className = 'task-content';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `task-${task.id}`;
  checkbox.checked = task.completed;

  const label = document.createElement('label');
  label.htmlFor = checkbox.id;

  const title = document.createElement('p');
  title.className = `task-title${task.completed ? ' completed' : ''}`;
  title.textContent = task.title;

  label.appendChild(title);

  content.append(checkbox, label);

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-button';
  removeButton.setAttribute('aria-label', `Remove ${task.title}`);
  removeButton.textContent = '×';

  item.append(content, removeButton);
  return item;
}

function updateRemaining() {
  const count = tasks.filter((task) => !task.completed).length;
  remaining.textContent = count;
}

function showValidation(message) {
  validation.textContent = message;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to read stored tasks', error);
    return [];
  }
}
