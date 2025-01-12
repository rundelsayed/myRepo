let tasks = []; // Store all tasks as an array
const star = document.querySelector(".star");
let completedTaskCount = 0; // Track the number of completed tasks

// Function to handle task addition
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskCategory = document.getElementById("task-category").value;
  const taskText = taskInput.value.trim();
 
  if (taskText) {
    const task = {
      text: taskText,
      category: taskCategory,
      completed: false,
    };
   
    tasks.push(task);
    renderTasks();
    taskInput.value = ''; // Clear input field
  }
}

// Function to update the star size and brightness based on completed tasks
function updateStarSize() {
  // Increase the star's size and brightness with each completed task
  const scale = 1 + (completedTaskCount * 0.3); // Grow 30% for each completed task
  const opacity = 0.2 + (completedTaskCount * 0.3); // Increase brightness with each completed task

  star.style.transform = `scale(${scale})`;
  star.style.opacity = opacity;

  // No limits on size and opacity, so no max checks are needed
}

// Function to filter tasks by category
function filterTasks() {
  const categoryFilter = document.getElementById("category-filter").value;
  renderTasks(categoryFilter);
}

// Function to render tasks based on filter
function renderTasks(filter = 'all') {
  const tasksContainer = document.querySelector('.tasks');
  tasksContainer.innerHTML = ''; // Clear current task list

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.category === filter);

  filteredTasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
   
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      
      // Update the count of completed tasks
      if (task.completed) {
        completedTaskCount++; // Increment count when a task is checked
      } else {
        completedTaskCount--; // Decrement count when a task is unchecked
      }

      updateStarSize(); // Update star size and brightness when a task is checked/unchecked
      renderTasks(); // Re-render tasks after update
    });

    const taskLabel = document.createElement("span");
    taskLabel.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter(t => t !== task);
      if (task.completed) {
        completedTaskCount--; // Adjust completed task count if a completed task is deleted
      }
      renderTasks(); // Re-render tasks after deletion
    });

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskLabel);
    taskDiv.appendChild(deleteButton);

    tasksContainer.appendChild(taskDiv);
  });

  updateStarSize(); // Update the star size and brightness after rendering the tasks
}

// Event listener for adding a task
document.querySelector(".add-task-btn").addEventListener("click", addTask);

// Initialize the tasks rendering
renderTasks();
