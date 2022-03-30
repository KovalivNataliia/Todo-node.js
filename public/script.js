const url = 'api/todos/';

const button = document.querySelector('.btn');

getTasks();

async function getTasks() {
    const response = await fetch(url);
    todos = await response.json();
    createList(todos);
}


async function postTask(json) {
    await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: json
    });
    getTasks();
}

async function deleteTask(id) {
    const response = await fetch(url + id, {method: 'DELETE'});
    if (response.ok) {
        document.getElementById(id).remove();
    }
}

async function changeStatus(json, id) {
    await fetch(url + id, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: json
    });
    getTasks();
}


button.addEventListener('click', () => {
    const input = document.querySelector('.form-control');
    if (!input.value) {

        input.classList.add('is-invalid');

        input.addEventListener('focus', () => {
            input.classList.remove('is-invalid');
        });

    } else {

        let json = JSON.stringify({
            title: input.value,
        });
        postTask(json);
        input.value = '';
    }

});



function createList(array) {
    document.getElementById('list').innerHTML = '';
    const listElement = document.querySelector('.list-group');

    const tasksList = array
        .sort((a, b) => a.completed - b.completed)
        .map(({_id, title, completed}) => {
            const task = document.createElement('li');
            task.classList.add('list-group-item');
            task.classList.add('d-flex');
            task.setAttribute('id', _id);
    
            const checkboxElement = document.createElement('input');
            checkboxElement.setAttribute('type', 'checkbox');
            checkboxElement.checked = completed;
            checkboxElement.classList.add('form-check-input');
            checkboxElement.classList.add('me-3');

            const deleteButton = document.createElement('a');
            deleteButton.setAttribute('href', '#');
            deleteButton.classList.add('ms-auto');

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('bi');
            deleteIcon.classList.add('bi-trash-fill');

            deleteButton.append(deleteIcon);

            task.append(checkboxElement, title, deleteButton);
    
            return task;
        });

    listElement.append(...tasksList);

    const deleteButtons = document.querySelectorAll('.ms-auto');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            deleteTask(btn.parentNode.id);
        })
    })

    const checkboxItems = document.querySelectorAll('.form-check-input');
    checkboxItems.forEach(checkboxItem => {
        checkboxItem.addEventListener('click', () => {
            let json = JSON.stringify({
                completed: checkboxItem.checked,
            });
            changeStatus(json, checkboxItem.parentNode.id)
        })
    })
}