todoInput = document.querySelector('.todo-input');
todoForm = document.querySelector('.todo-form');
todoitemsList = document.querySelector('.todo-items');


let todos = [];

todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

// to add todo item
function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      complete: false
    }

    todos.push(todo);
    addToLocalStorage(todos);

    todoInput.value = '';
  }
}

function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));

  renderTodos(todos);
}

// to render todo list
function renderTodos(todos) {
  todoitemsList.innerHTML = '';

  todos.forEach(function (item) {
    const checked = item.complete ? 'checked' : null;

    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('key', item.id);

    if (item.complete === true)
      li.classList.add('checked');

    li.innerHTML = `
    <input type="checkbox" class="checkbox" ${checked}>
    ${item.name}
    <button class="delete-button">X</button>`;

    todoitemsList.append(li);
  })
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');

  if (reference) {
    todos = JSON.parse(reference);

    renderTodos(todos);
  }
}

function toggle(id) {
  console.log('toggle called');

  todos.forEach(function (item) {
    if (item.id == id) {
      item.complete = !item.complete;
    }
  });
  console.log(todos);
  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

getFromLocalStorage();

todoitemsList.addEventListener('click', function (e) {
  if (e.target.type === 'checkbox')
    toggle(e.target.parentElement.getAttribute('key'))

  if (event.target.classList.contains('delete-button'))
    deleteTodo(event.target.parentElement.getAttribute('key'));
});

