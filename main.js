const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const divListOne = document.querySelector('.listOne')
const divListTwo = document.querySelector('.listTwo')
const divListThree = document.querySelector('.listThree')
const divList = document.querySelector('.list')

let openTasks = [];
let inProgresTasks = [];
let finishedTasks = [];

function createNewTask(listToAdd) { 

    let element = {
        id: "",
        title: "",
        description: ""
    };

    if (listToAdd === 'open') {
        openTasks.push(element);
        const id = openTasks.length - 1;
        openModal(id, listToAdd);
    }

    if (listToAdd === 'inProgress') {
        inProgresTasks.push(element);
        const id = inProgresTasks.length - 1;
        openModal(id, listToAdd);
    }

}

function openModal(id, listToAdd) {

    let  tagModal = "";
    let color = ""
    if (listToAdd === 'open') {
        tagModal = 'ABERTO '
        color = "red"
    }

    if (listToAdd === 'inProgress') {
        tagModal = 'EM ANDAMENTO'
        color = "orange"
    }

    if (listToAdd === 'finished') {
        tagModal = 'FINALIZADO'
        color = "green"
    }
    
    modal.innerHTML = `
    <div class="modal-header">
            <div class="status ${color}">
                <p class="text-status">${tagModal}</p>            
            </div>
            <button id="close-modal" onclick="updateTask(${id}
            , '${listToAdd}')">x</button>
        </div>
        <div class="modal-body">
        <textarea id="task-title" placeholder="TÍTULO"></textarea>
        <div class="line-description">
        <div class="div-text-line">
            <p class="text-line">Sua tarefas</p>
            </div>
            <div class="lineOne"></div>
            <div class="lineTwo"></div>
            </div>
        <textarea id="task-description" placeholder="Digite para começar"></textarea>
        </div>
    `
    
    const inputTitle = document.querySelector('#task-title')
    const inputDescription = document.querySelector('#task-description')

    if (listToAdd === 'open') {
        inputTitle.value = openTasks[id].title
        inputDescription.value = openTasks[id].description
    }

    if (listToAdd === 'inProgress') {
        inputTitle.value =  inProgresTasks[id].title
        inputDescription.value = inProgresTasks[id].description
    }

    if (listToAdd === 'finished') {
        inputTitle.value = finishedTasks[id].title
        inputDescription.value = finishedTasks[id].description
    }

    modal.classList.remove("hide");
    fade.classList.remove("hide");
}

function closeModal() {
    
    modal.classList.add("hide");
    fade.classList.add("hide");

    renderOpenList();
    renderInProgressList();

}

function updateTask(id, listToAdd) {
    const inputTitle = document.querySelector('#task-title')
    const inputDescription = document.querySelector('#task-description')

    if (listToAdd === 'open') {
        if(inputTitle.value  === "" && inputDescription.value === "" ) {
            openTasks.splice(id, 1);
            closeModal();
            return;
        }

        openTasks[id].title = inputTitle.value
        openTasks[id].description = inputDescription.value
        openTasks[id].id = id;
    }

    if (listToAdd === 'inProgress') {
        if(inputTitle.value  === "" && inputDescription.value === "" ) {
            inProgresTasks.splice(id, 1);
            closeModal();
            return;
        }

        inProgresTasks[id].title = inputTitle.value
        inProgresTasks[id].description = inputDescription.value
        inProgresTasks[id].id = id;
    }

    if (listToAdd === 'finished') {
        if(inputTitle.value  === "" && inputDescription.value === "" ) {
            finishedTasks.splice(id, 1);
            closeModal();
            return;
        }

        finishedTasks[id].title = inputTitle.value
        finishedTasks[id].description = inputDescription.value
        finishedTasks[id].id = id;
    }

    localStorage.setItem("openTasks", JSON.stringify(openTasks));
    localStorage.setItem("inProgressTasks", JSON.stringify(inProgresTasks));
    localStorage.setItem("finishedTasks", JSON.stringify(finishedTasks));

    closeModal();
}

function init() {
    const openTasksData = localStorage.getItem("openTasks");
    const inProgressTasksData = localStorage.getItem("inProgressTasks");
    const finishedTasksData = localStorage.getItem("finishedTasks");

    if (openTasksData) {
        openTasks = JSON.parse(openTasksData);
    }

    if (inProgressTasksData) {
        inProgresTasks = JSON.parse(inProgressTasksData);
    }

    if (finishedTasksData) {
        finishedTasks = JSON.parse(finishedTasksData);
    }

    // Now, you have the tasks loaded from local storage
    renderOpenList();
    renderInProgressList();
    // You can add rendering for the finished tasks as well, if needed
}

// Call init() to load tasks when the page loads
init();


function renderOpenList() {
    let list = "";

    openTasks.forEach((element) => {
        list += `
        <div class="openTasks" onclick="openModal(${element.id}, 'open')" draggable="true">
            <p class="text-description">${element.description}</p>
            <div class="red-area">
                <img src="/Assets/img-title.png" class="img-title">
                <h3 class="title">${element.title}</h3>
            </div>
        </div>
        `;
    });

    divListOne.innerHTML = list;

    // implementar LocalStorage - Dica AQUI - DiCA Salvar Arrays
}

function renderInProgressList() {
    let list = "";

    inProgresTasks.forEach((element) => {
        list += `
        <div class="inProgressTasks" onclick="openModal(${element.id}, 'inProgress')" draggable="true">
            <div class="green-area" ></div>
            <p class="description">${element.description}</p>
            <div class="footer-title">
                <img src="/Assets/img-title.png" class="img-title">
                <h3 class="title">${element.title}</h3>
            </div>
        </div>
        `;
    });

    divListTwo.innerHTML = list;

    // implementar LocalStorage - Dica AQUI - DiCA Salvar Arrays
}

// implementar recupearar do LocalStorage - Dica fazer fuinção init() que roda na aberrtura da pagina
// Setar valor dessas variaveis com o que está no localStorage
// let openTasks = [];
// let inProgresTasks = [];
// let finishedTasks = [];

// Como implementar drag n drop com html e js 

