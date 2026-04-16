const API = 'http://localhost:5000/api/tasks';

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${task.title}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>`;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();
  if (!title) return;
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  input.value = '';
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadTasks();
}

document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

loadTasks();
