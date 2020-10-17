function sum(a, b) {
  return a + b;
}

function postTask(task) {
  return fetch("/tasks", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ description: task.description }),
  }).then((response) => response.json());
}

function getTasks() {
  return fetch("http://localhost:4001/tasks").then((response) =>
    response.json()
  );
}

function updateTask(task) {
  return fetch(`/tasks/${task.id}`, {
    method: "put",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ status: task.status }),
  }).then((response) => response.json());
}

function deleteTask(task) {
  return fetch(`/tasks/${task.id}`, {
    method: "delete",
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => response.json());
}

async function setTaskDone(event) {
  event.preventDefault();

  // The one to be updated
  const task = {};

  // Get the values from the form
  const formData = new FormData(event.target);
  for (const pair of formData.entries()) {
    task[pair[0]] = pair[1];
  }

  try {
    const result = await updateTask({ ...task, status: "done" });

    const taskNode = document.getElementById(`task-list-item-${task.id}`);

    taskNode.innerHTML = `
      <div class="card-body">
        <p class="card-text">${result.data.description}</p>
        <p class="card-text">${result.data.status}</p>
      </div>
    `;
  } catch (e) {
    // TODO: Handle the error properly
    throw new Error("Task could not be updated");
  }
}

async function removeTaskFromList(event) {
  event.preventDefault();
  // The one to be deleted
  const task = {};

  // Get the values from the form
  const formData = new FormData(event.target);
  for (const pair of formData.entries()) {
    task[pair[0]] = pair[1];
  }

  try {
    const result = await deleteTask(task);

    const taskNode = document.getElementById(
      `task-list-item-${result.data.id}`
    );

    taskNode.parentNode.removeChild(taskNode);
  } catch (e) {
    // TODO: Handle the error properly
    throw new Error("Task could not be deleted");
  }
}

function addTask(task) {
  let html = `
  <div id="task-list-item-${task.id}" class="card my-3">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
      <p class="card-text">${task.status}</p>
      ${
        task.status === "pending"
          ? `<form id="task-list-item-${task.id}-form-done" method="post">
        <input type="hidden" name="id" value="${task.id}" />
        <input type="hidden" name="description" value="${task.description}" />
        <button type="submit" class="btn btn-primary">Done</button>
      </form>`
          : ""
      }
      <form id="task-list-item-${task.id}-form-delete" method="post">
        <input type="hidden" name="id" value="${task.id}" />
        <button type="submit" class="btn btn-danger">Delete</button>
      </form>
    </div>
  </div>
  `;
  const node = document.createRange().createContextualFragment(html);
  if (task.status === "pending") {
    const doneForm = node.querySelector(`#task-list-item-${task.id}-form-done`);
    doneForm.addEventListener("submit", setTaskDone);
  }
  const deleteForm = node.querySelector(
    `#task-list-item-${task.id}-form-delete`
  );
  deleteForm.addEventListener("submit", removeTaskFromList);
  document.getElementById("task_list").prepend(node);
}

async function loadTasks() {
  try {
    const result = await getTasks();

    result.data.forEach((task) => {
      addTask(task);
    });
  } catch (e) {
    // TODO: Handle the error properly
    throw new Error("Tasks could not be loaded");
  }
}

async function storeTask() {
  try {
    const description = document.getElementById("task_description").value;
    const result = await postTask({ description });
    // Manually update HTML
    document.getElementById("task_description").value = "";

    addTask(result.data);
  } catch (e) {
    // TODO: Handle the error properly
    throw new Error("Task could not be added");
  }
}

// Just to load the tasks

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});
