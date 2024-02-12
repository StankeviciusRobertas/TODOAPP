function getUserId() {
  return sessionStorage.getItem('userId');
}

window.onload = () => {
  const userId = getUserId();
  const userName = sessionStorage.getItem('userName');

  // Display user information
  const userInfoContainer = document.getElementById('user-info');
  userInfoContainer.innerText = `Logged in as: ${userName}`;

  // Fetch and display TODO list
  fetch(`https://localhost:7171/api/ToDo?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch TODO list');
      }
    })
    .then(todoList => {
      const userTasks = todoList.filter(task => task.userId === userId);

      const todoListContainer = document.getElementById('todo-list');
      todoListContainer.innerHTML = '';

      userTasks.forEach(task => {
        const taskContainer = document.createElement('div');
        taskContainer.setAttribute('data-task-id', task.id);

        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
          <p>Type: ${task.type}</p>
          <p>Content: ${task.content}</p>
          <p>End Date: ${task.endDate}</p>
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
          <hr>
        `;

        taskContainer.appendChild(taskElement);
        todoListContainer.appendChild(taskContainer);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

  // Add Task button event listener
  document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskForm = document.getElementById('task-form');
    taskForm.classList.toggle('hidden');
  });

  // Submit Task button event listener
  document.getElementById('submit-task').addEventListener('click', () => {
    const taskType = document.getElementById('task-type').value;
    const taskContent = document.getElementById('task-content').value;
    const endDate = document.getElementById('end-date').value;

    const taskData = {
      userId: userId,
      type: taskType,
      content: taskContent,
      endDate: endDate
    };

    fetch('https://localhost:7171/api/ToDo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Task added successfully');
          // Refresh the TODO list after adding a task
          window.onload();
        } else {
          console.error('Failed to add task');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

  function getUserId() {
    return sessionStorage.getItem('userId');
  }
};

function editTask(taskId) {
  fetch(`https://localhost:7171/api/ToDo/${taskId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch task details for editing');
      }
    })
    .then(task => {
      const editForm = document.createElement('div');
      editForm.innerHTML = `
        <label for="edit-task-type">Edit Type:</label>
        <input type="text" id="edit-task-type" value="${task.type}" required>
        <label for="edit-task-content">Edit Content:</label>
        <input type="text" id="edit-task-content" value="${task.content}" required>
        <label for="edit-end-date">Edit End Date:</label>
        <input type="datetime-local" id="edit-end-date" value="${task.endDate}" required>
        <button onclick="submitEditTask(${task.id})">Submit Edit</button>
      `;

      const todoListContainer = document.getElementById('todo-list');
      const taskContainer = todoListContainer.querySelector(`[data-task-id="${taskId}"]`);

      if (taskContainer) {
        taskContainer.appendChild(editForm);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

window.submitEditTask = (taskId) => {
  const editedType = document.getElementById('edit-task-type').value;
  const editedContent = document.getElementById('edit-task-content').value;
  const editedEndDate = document.getElementById('edit-end-date').value;

  const editedTaskData = {
    userId: getUserId(),
    type: editedType,
    content: editedContent,
    endDate: editedEndDate,
    id: taskId
  };

  fetch(`https://localhost:7171/api/ToDo/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(editedTaskData)
  })
    .then(response => {
      if (response.ok) {
        console.log('Task edited successfully');
        // Refresh the TODO list after editing a task
        window.onload();
      } else {
        console.error('Failed to edit task');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

function deleteTask(taskId) {
  fetch(`https://localhost:7171/api/ToDo/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
  })
    .then(response => {
      if (response.ok) {
        console.log('Task deleted successfully');
        // Refresh the TODO list after deleting a task
        window.onload();
      } else {
        console.error('Failed to delete task');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
