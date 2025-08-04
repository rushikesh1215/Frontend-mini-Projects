document.addEventListener("DOMContentLoaded", function () {
  const todoform = document.querySelector(".todo-form");
  const todoinput = document.querySelector(".todo-input");
  const todosubmit = document.querySelector(".todo-submit");
  const todolist = document.querySelector(".todo-list");

  let editmode = false;
  let edititem = null;
  let todos = [];

  // Load todos from localStorage on page load
  loadTodos();

  todoform.addEventListener("submit", function (event) {
    event.preventDefault();
    const todotext = todoinput.value.trim();
    if (todotext !== "") {
      if (editmode && edititem) {
        const index = edititem.getAttribute("data-index");
        todos[index] = todotext;
        saveTodos();
        renderTodos();
        todosubmit.innerText = "Add Todo";
        editmode = false;
        edititem = null;
      } else {
        todos.push(todotext);
        saveTodos();
        renderTodos();
      }
      todoinput.value = "";
    } else {
      alert("Please enter a valid todo");
    }
  });

  todolist.addEventListener("click", function (event) {
    const target = event.target;
    const todoitem = target.closest("li");
    const index = todoitem.getAttribute("data-index");

    if (target.classList.contains("remove-btn")) {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    } else if (target.classList.contains("edit-btn")) {
      editmode = true;
      edititem = todoitem;
      todoinput.value = todos[index];
      todosubmit.innerText = "Edit Todo";
      todoinput.focus();
    }
  });

  function renderTodos() {
    todolist.innerHTML = "";
    todos.forEach((todo, index) => {
      const item = document.createElement("li");
      item.setAttribute("data-index", index);

      const span = document.createElement("span");
      span.textContent = todo;

      const editBtn = document.createElement("button");
      editBtn.textContent = "edit";
      editBtn.classList.add("edit-btn");

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "remove";
      removeBtn.classList.add("remove-btn");

      item.appendChild(span);
      item.appendChild(editBtn);
      item.appendChild(removeBtn);
      todolist.appendChild(item);
    });
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const stored = localStorage.getItem("todos");
    if (stored) {
      todos = JSON.parse(stored);
      renderTodos();
    }
  }
});
