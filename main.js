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

function saveToLocalStorage() {
    localStorage.setItem("openTasks", JSON.stringify(openTasks));
    localStorage.setItem("inProgressTasks", JSON.stringify(inProgresTasks));
    localStorage.setItem("finishedTasks", JSON.stringify(finishedTasks));
}

function createNewTask(listToAdd) { 

    if (listToAdd === 'open') {
        let element = {
            id: openTasks.length,
            title: "",
            description: ""
        };
        openTasks.push(element);
        const id = openTasks.length - 1;
        openModal(id, listToAdd);
    }

    if (listToAdd === 'inProgress') {
        let element = {
            id: inProgresTasks.length,
            title: "",
            description: ""
        };
        inProgresTasks.push(element);
        const id = inProgresTasks.length - 1;
        openModal(id, listToAdd);
    }

}

function toggleModalSelect() {
    const modalSelect = document.querySelector('.modal-select');
    modalSelect.classList.toggle('hide');
}

function changeStatusCard(id, listToRemove, listToAdd) {

    console.log(id)
    console.log(listToRemove)
    console.log(listToAdd)

    let elementToAdd;

    if (listToRemove === 'open') {
        elementToAdd = openTasks.find((element) => element.id === parseInt(id));
        openTasks = openTasks.filter((element) => !(element.id === parseInt(id)));
        console.log(openTasks)
    }

    if (listToRemove === 'inProgress') {
        elementToAdd = inProgresTasks.find((element) => element.id === parseInt(id));
        inProgresTasks = inProgresTasks.filter((element) => !(element.id === parseInt(id)));
    }

    if (listToRemove === 'finished') {
        elementToAdd = finishedTasks.find((element) => element.id === parseInt(id));
        finishedTasks = finishedTasks.filter((element) => !(element.id === parseInt(id)));
    }

    if (listToAdd === 'open') {
        if (elementToAdd) {
            openTasks.push(elementToAdd);
        }
    }

    if (listToAdd === 'inProgress') {
        console.log(elementToAdd)
        if (elementToAdd) {
            inProgresTasks.push(elementToAdd);
            console.log(inProgresTasks)
        }
    }

    if (listToAdd === 'finished') {
        if (elementToAdd) {
            finishedTasks.push(elementToAdd);
        }
    }

    renderOpenList();
    renderInProgressList();
    renderFinishedList();

    saveToLocalStorage();
    closeModal();
}

function openModal(id, listToAdd) {

    let tagModal = "";
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
            <div class="status ${color}"  onclick="toggleModalSelect()">
                <p class="text-status">${tagModal}</p>            
            </div>
            <button id="close-modal" onclick="updateTask(${id}
            , '${listToAdd}')">x</button>
        </div>
        <div class="modal-select hide">
            <div class="select-option">
                <span>Selecione uma opção</span>
            </div>
            <div class="select-option" onclick="changeStatusCard('${id}', '${listToAdd}', 'open')">
                <div class="status red size">
                    <p class="text-status">ABERTO</p>            
                </div>
            </div>
            <div class="select-option" onclick="changeStatusCard('${id}', '${listToAdd}', 'inProgress')">
                <div class="status orange size">
                    <p class="text-status">EM ANDAMENTO</p>            
                </div>
            </div>
            <div class="select-option" onclick="changeStatusCard('${id}', '${listToAdd}', 'finished')">
                <div class="status green size">
                    <p class="text-status">FINALIZADO</p>            
                </div>
            </div>
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
    renderFinishedList(); 
}

function updateTask(id, listToAdd) {
    const inputTitle = document.querySelector('#task-title')
    const inputDescription = document.querySelector('#task-description')
    if (listToAdd === 'open') {
        if(inputTitle.value  === "" && inputDescription.value === "" ) {
            openTasks.splice(id, 1);
            closeModal();
        } else {
            openTasks[id].title = inputTitle.value
            openTasks[id].description = inputDescription.value
        }

    }

    if (listToAdd === 'inProgress') {
        if(inputTitle.value  === "" && inputDescription.value === "" ) {
            inProgresTasks.splice(id, 1);
        } else {
            inProgresTasks[id].title = inputTitle.value
            inProgresTasks[id].description = inputDescription.value
        }
    }

    if (listToAdd === 'finished') {
        if(inputTitle.value  === "" && inputDescription.value === "" ) {
            console.log("teste")
            finishedTasks.splice(id, 1);
        } else {
            finishedTasks[id].title = inputTitle.value
            finishedTasks[id].description = inputDescription.value
        }
    }

    saveToLocalStorage();
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

    renderOpenList();
    renderInProgressList();
    renderFinishedList(); 
}

function renderOpenList() {
    let list = "";

    openTasks.forEach((element, id) => {
            list += `
            <div class="card-task" onclick="openModal(${id}, 'open')">
                <p class="card-description">${element.description}</p>
                <div class="label-task red">
                    <img src="/Assets/img-title.png" class="img-title">
                    <h3 class="title">${element.title}</h3>
                </div>
            </div>
            `;
    });

    divListOne.innerHTML = list;
}


function renderInProgressList() {
    let list = "";

    inProgresTasks.forEach((element) => {
        list += `
        <div class="card-task" onclick="openModal(${element.id}, 'inProgress')">
            <p class="card-description">${element.description}</p>
            <div class="label-task orange">
                <img src="/Assets/img-title.png" class="img-title">
                <h3 class="title">${element.title}</h3>
            </div>
        </div>
        `;
    });
    

    divListTwo.innerHTML = list;

}

function renderFinishedList() {
    let list = "";

    finishedTasks.forEach((element) => {
        list += `
        <div class="card-task" onclick="openModal(${element.id}, 'finished')">
            <p class="card-description">${element.description}</p>
            <div class="label-task green">
                <img src="/Assets/img-title.png" class="img-title">
                <h3 class="title">${element.title}</h3>
            </div>
        </div>
        `;
    });

    divListThree.innerHTML = list;
}

init();
