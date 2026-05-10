const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const celebration = document.querySelector("#celebration");

let totalTasks = 0;
let completedTasks = 0;

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    totalTasks++;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = taskText;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.classList.add("complete-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✖";
    deleteBtn.classList.add("delete-btn");

    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonContainer);

    taskList.appendChild(li);

    taskInput.value = "";

    completeBtn.addEventListener("click", function () {

        if (!li.classList.contains("completed")) {
            li.classList.add("completed");
            completedTasks++;
        } else {
            li.classList.remove("completed");
            completedTasks--;
        }

        updateProgress();
    });

    deleteBtn.addEventListener("click", function () {

        if (li.classList.contains("completed")) {
            completedTasks--;
        }

        totalTasks--;

        li.remove();

        updateProgress();
    });

    updateProgress();
}

function updateProgress() {

    let progress = 0;

    if (totalTasks > 0) {
        progress = (completedTasks / totalTasks) * 100;
    }

    progressBar.style.width = `${progress}%`;
    progressText.innerText = `${Math.round(progress)}% Completed`;

    if (totalTasks > 0 && completedTasks === totalTasks) {
        celebration.style.display = "block";
launchConfetti();
    } else {
        celebration.style.display = "none";
    }
}

function launchConfetti() {

    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.backgroundColor =
            `hsl(${Math.random() * 360}, 100%, 50%)`;

        confetti.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        confetti.style.setProperty(
            "--random",
            Math.random()
        );

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}