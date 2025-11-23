const input = document.getElementById('input-box');
const addBtn = document.getElementById('addTask');
const tasks = document.getElementById('list-container');

const totalCounterDisplay = document.getElementById('totalCounter');
const completedCounterDisplay = document.getElementById('completedCounter');

document.getElementById("close-button").addEventListener("click", () => {
    document.getElementById('popup').classList.remove('popup-show');
});

// Count Tasks
function recountTasks() {
    const allTasks = tasks.querySelectorAll('li');
    const completedTasks = tasks.querySelectorAll('li.checked');

    totalCounterDisplay.textContent = `Total Tasks: ${allTasks.length}`;
    completedCounterDisplay.textContent = `Completed Tasks: ${completedTasks.length}`;
}

tasks.addEventListener('click', (e) => {
    const li = e.target.closest('li')
    if(!li) return;

    // Delete Tasks
    if (e.target.classList.contains("delete-button")) {
        e.stopPropagation();
        li.remove();
        saveData();
        recountTasks();
        return;
    }

    // Edit Tasks
    if (e.target.classList.contains("edit-button")) {
        e.stopPropagation();
        input.value = li.firstChild.textContent;
        li.remove();
        saveData();
        recountTasks();
        return;
    }
    
    // Toggle Completed
    if(e.target.tagName === 'LI'){
        li.classList.toggle('checked');
        saveData()
        recountTasks()
    }

});

// Add New Tasks
addBtn.addEventListener('click', ()=> {
     const newTask = input.value.trim()
     if(newTask === ''){
         document.getElementById('popup').classList.add('popup-show');
        return
     }

     const li = document.createElement('li');
     li.innerHTML = newTask

     const dltBtn = document.createElement('span')
     dltBtn.classList.add('delete-button')
     dltBtn.textContent = '\u00d7'

     const editBtn = document.createElement('span')
     editBtn.classList.add('edit-button')
     editBtn.textContent = '\u270E'

     li.appendChild(dltBtn)
     li.appendChild(editBtn)
     tasks.appendChild(li);

     input.value = '';

     saveData()
     recountTasks();
});

// Local Storage 
function saveData() {
    localStorage.setItem("tasks", tasks.innerHTML);
}

function showData(){
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks.innerHTML = saved;
    }
}


showData();
recountTasks();
