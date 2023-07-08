const todosArray = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
console.log(todosArray);

const btnEl = document.getElementById("btn");
const todoEl = document.querySelector(".todo-container");

const handleSubmit = () => {
         event.preventDefault();
 }

    
 btnEl.addEventListener("click", () => {
    
    const inputEl = document.getElementById("input");
    if(inputEl.value == "") {
        const taskText = document.getElementById("task-text");
        taskText.innerText = "Enter your task";
    } else {
        
    createTodo(inputEl);
    }
   // createNoteEl()
     });
 
function createNoteEl(){
    let todos = "";
    for (let i = 0; i < todosArray.length; i++) {
        const taskText = document.getElementById("task-text")
        if(todos == "") {
            taskText.innerText = "Tasks"
        } //else{
        //     taskText.innerText = ""
        // }
        todos += `
        <div class="flex flex-jc-sb todo">
        
        <p class="flex">
            <input type="checkbox" name="todo" id="checkbox" class="checkbox">
          <textarea name="task" id="task" class="task" disabled>${todosArray[i]}</textarea>
        </p>

        <div class="icon flex">
        <i class="fa-solid fa-pen-to-square edit"></i>
        <i class="fa-solid fa-trash del"></i>
        </div>
        <div class="update-todo">
            <button class="save">Save</button>
            <button class="cancel">Cancel</button>
        </div>
    </div>
            `
    }
    todoEl.innerHTML = todos;     

    activateDelete()
    activateEdit()
    activateSaveBtn()
    activateCancelBtn()
    activateComplete()
    }



    const activateEdit = () => {
        const editBtn = document.querySelectorAll(".edit");
        const upadateTodo = document.querySelectorAll(".update-todo");
        const taskEl = document.querySelectorAll(".task");

        editBtn.forEach((eb, i)=>{
            eb.addEventListener("click", ()=>{
                upadateTodo[i].style.display = "block";
                taskEl[i].disabled = false;
            })
        })
    }

    const activateSaveBtn = () => {
        const saveBtn = document.querySelectorAll(".save");
        const taskEl = document.querySelectorAll(".task");
        saveBtn.forEach((sb, i) => {
            sb.addEventListener("click", ()=>{
                updateItem(taskEl[i].value, i)
            })
        })
    }

    const activateCancelBtn = () => {
        const cancelBtn = document.querySelectorAll(".cancel");
        const upadateTodo = document.querySelectorAll(".update-todo");
        const taskEl = document.querySelectorAll(".task");
        cancelBtn.forEach((cb, i)=>{
            cb.addEventListener("click", ()=>{
                upadateTodo[i].style.display = "none";
                taskEl[i].disabled = true;
            })
        })

    }

   

    const updateItem = (text, i) =>{
        todosArray[i] = text;
        localStorage.setItem("todos", JSON.stringify(todosArray))
        location.reload()
    }
    
    const activateDelete = () => {
       let deleteBtn = document.querySelectorAll(".del");
       deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => {
            deleteItem(i)
        })
       })
    }

    
    const activateComplete = () =>{
        const completeBtn = document.querySelectorAll(".checkbox");
        const editBtn = document.querySelectorAll(".edit");
        const todoList = document.querySelectorAll(".todo");
        const taskEl = document.querySelectorAll(".task");

        completeBtn.forEach((cbt, i)=>{
            cbt.addEventListener("input", ()=>{
                taskEl[i].style.backgroundColor = "#a35709";
                editBtn[i].style.display = "none";
                localStorage.setItem("todos", JSON.stringify(todosArray));

            })
        })
        
    }

    function deleteItem(i){
        todosArray.splice(i, 1);
        localStorage.setItem("todos", JSON.stringify(todosArray));
        location.reload()
    }
    

function createTodo(todo){
    todosArray.push(todo.value);
    localStorage.setItem("todos", JSON.stringify(todosArray));
    location.reload();
}

window.onload = function() {
    createNoteEl()
}
