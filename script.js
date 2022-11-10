(function(){
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createtodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        
        button.textContent = 'Добавить дело';
        button.disabled = true;
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');

        return list;
    }

    function createTodoItem(name, done) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готов';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        if (done === true) {
            item.classList.toggle('list-group-item-success');
        };

        return {
            item,
            doneButton,
            deleteButton,
        };
    }
    
    function createTodoApp(container, title = 'Список дел', storage = 'myTodos', array) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createtodoItemForm();
        let todoList = createTodoList();
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        array.forEach(el => {
            let newTodoItem = createTodoItem(el.name, el.done);
      
            todoList.append(newTodoItem.item);
            newTodoItem.doneButton.addEventListener('click', function() {
              newTodoItem.item.classList.toggle('list-group-item-success');
              for (let todos of array) {
                if (todos.name === el.name) {
                  todos.done = todos.done === false ? true : false;
                }
              }
              localStorage.setItem(storage, JSON.stringify(array));
            });
      
            newTodoItem.deleteButton.addEventListener('click', function() {
              if(confirm('Вы уверены?')) {
                newTodoItem.item.remove();
                for (let i in array) {
                  if (array[i].name === el.name) {
                    array.splice(i, 1)
                  }
                }
                localStorage.setItem(storage, JSON.stringify(array));
              }
            })
          });
        
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }
            
            let todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
                for (let todos of array) {
                    if (todos.name === todoItem.item.firstChild.textContent) {
                      todos.done = todos.done === false ? true : false;
                    }
                }
                localStorage.setItem(storage, JSON.stringify(array));
            });

            todoItem.deleteButton.addEventListener('click', function(){
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    for (let i in array) {
                        if (array[i].name === todoItem.item.firstChild.textContent) {
                            array.splice(i, 1)
                        }
                    }
                    localStorage.setItem(storage, JSON.stringify(array));
                }
            });

            todoList.append(todoItem.item);
            array.push({name: todoItemForm.input.value, done: false});
            localStorage.setItem(storage, JSON.stringify(array));

            todoItemForm.input.value = '';
            
            document.querySelector('.btn').disabled = true;
        });
        
    }
    window.createTodoApp = createTodoApp;
})();