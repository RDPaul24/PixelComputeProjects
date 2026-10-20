const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("task-date");
const timeInput = document.getElementById("task-time");
const searchInput = document.getElementById("search-input");
const taskSections = document.getElementById("task-sections");

const editPanel = document.getElementById("edit-panel");
const editDate = document.getElementById("edit-date");
const editInput = document.getElementById("edit-input");
const cancelEdit = document.getElementById("cancel-edit");

const validationModal = document.getElementById("validation-modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");
const modalOK = document.getElementById("modal-ok");

let tasks = [];
let editingTaskId = null;

try {
    tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

    if (!Array.isArray(tasks)) {
        tasks = [];
    }
} catch {
    tasks = [];
}

const saveTasks = () => {
    try {
        localStorage.setItem("todoTasks", JSON.stringify(tasks));
    } catch {
        showModal("Could not save tasks in local storage.");
    }
}

const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

const formatTime = (time) => {
    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
}

const showModal = (message) => {
    modalMessage.textContent = message;
    validationModal.hidden = false;
    modalOK.focus();
}

const closeModal = () => {
    validationModal.hidden = true;
}

cconst createElement = (tag, className, text = "") => {
    const element = document.createElement(tag);

    element.className = className;
    element.textContent = text;

    return element;
}

const createButton = (text, className, action, id) => {
    const button = createElement("button", className, text);

    button.type = "button";
    button.dataset.action = action;
    button.dataset.id = id;

    return button;
}

const createTask = (task) => {
    const item = createElement("div", "task-item");
    const content = createElement("div", "task-content");
    const description = createElement("p", "task-detail");
    const name = createElement("span", "task-name", task.text);
    const time = createElement("strong", "task-time", formatTime(task.time));
    const actions = createElement("div", "task-actions");

    description.append(name, document.createTextNode(" at "), time);

    content.append(description);

    actions.append(
        createButton("Edit", "edit-button", "edit", task.id),
        createButton("Delete", "delete-button", "delete", task.id)
    );

    item.append(content, actions);

    return item;
}

const createTaskSection = (title, taskList, showDates = true) => {
    const section = createElement("section", "task-section");
    const heading = createElement("h2", "section-title", title);

    section.append(heading);

    const sortedTasks = [...taskList].sort((a, b) => {
        return a.date.localeCompare(b.date) ||
               a.time.localeCompare(b.time);
    });

    if (!showDates) {
        sortedTasks.forEach(task => {
            section.append(createTask(task));
        });

        return section;
    }

    let currentDate = "";
    let currentTaskList;

    sortedTasks.forEach(task => {
        if (task.date !== currentDate) {
            currentDate = task.date;

            const daySection = createElement("div", "task-day");
            const dateHeading = createElement(
                "h3",
                "task-date",
                formatDate(task.date)
            );

            currentTaskList = createElement("div", "task-items");

            daySection.append(dateHeading, currentTaskList);
            section.append(daySection);
        }

        currentTaskList.append(createTask(task));
    });

    return section;
}

const displayTasks = () => {
    taskSections.replaceChildren();

    const searchText = searchInput.value.trim().toLowerCase();

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchText)
    );

    if (filteredTasks.length === 0) {
        const message = searchText
            ? "No tasks match your search."
            : "No tasks yet. Add your first task above.";

        taskSections.append(
            createElement("div", "empty-state", message)
        );

        return;
    }

    const today = getToday();

    const dueTasks = filteredTasks.filter(task => task.date < today);
    const todayTasks = filteredTasks.filter(task => task.date === today);
    const upcomingTasks = filteredTasks.filter(task => task.date > today);

    if (dueTasks.length > 0) {
        taskSections.append(
            createTaskSection("Due Tasks", dueTasks)
        );
    }

    if (todayTasks.length > 0) {
        taskSections.append(
            createTaskSection("Today", todayTasks, false)
        );
    }

    if (upcomingTasks.length > 0) {
        taskSections.append(
            createTaskSection("Upcoming Tasks", upcomingTasks)
        );
    }
}

const addTask = (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    if (!text || !date || !time) {
        showModal("Please fill in all fields.");
        return;
    }

    tasks.push({
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        text: text,
        date: date,
        time: time
    });

    saveTasks();
    taskForm.reset();
    displayTasks();
    taskInput.focus();
}

const editTask = (id) => {
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    editingTaskId = id;
    editDate.textContent = formatDate(task.date);
    editInput.value = task.text;
    editPanel.hidden = false;
    editInput.focus();
}

const saveEditedTask = (event) => {
    event.preventDefault();

    const newText = editInput.value.trim();

    if (!newText) {
        showModal("Please enter a task description.");
        return;
    }

    const task = tasks.find(task => task.id === editingTaskId);

    if (!task) {
        closeEditor();
        return;
    }

    task.text = newText;

    saveTasks();
    closeEditor();
    displayTasks();
}

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);

    if (editingTaskId === id) {
        closeEditor();
    }

    saveTasks();
    displayTasks();
}

const closeEditor = () => {
    editingTaskId = null;
    editPanel.hidden = true;
}

taskForm.addEventListener("submit", addTask);

taskSections.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const id = button.dataset.id;

    if (button.dataset.action === "edit") {
        editTask(id);
    } else if (button.dataset.action === "delete") {
        deleteTask(id);
    }
});

editPanel.addEventListener("submit", saveEditedTask);
cancelEdit.addEventListener("click", closeEditor);

searchInput.addEventListener("input", displayTasks);

modalClose.addEventListener("click", closeModal);
modalOK.addEventListener("click", closeModal);

validationModal.addEventListener("click", event => {
    if (event.target.classList.contains("modal-backdrop")) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !validationModal.hidden) {
        closeModal();
    }
});

displayTasks();
