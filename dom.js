// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application


(function () {
    document.querySelector('html').setAttribute('lang', 'en');
    document.querySelector("#add-todo input[type = text]").setAttribute('aria-label', 'a')


  // This is the dom node where we will keep our todo
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");
/*==================================================================================*/
  var inputSort = document.createElement('button');
  inputSort.textContent = 'Sort'
  inputSort.classList = 'sortStyle';
  addTodoForm.appendChild(inputSort);

  addTodoForm.classList = 'formStyle';
  document.querySelector("#add-todo input[type = text]").classList = 'inputStyle'
  document.querySelector("#add-todo input[type = submit]").classList = 'submitStyle'

  document.querySelector('#todo-container ul').classList = 'ulStyle';

/*==================================================================================*/
  
/*===================== Create A Head For The Page & Some Edits=====================*/
document.querySelector("#add-todo input[type = text]").setAttribute('placeholder', 'Enter Your Task Here');
var heading = document.createElement('h1');
  heading.textContent = '(: Day Organizer :)'
  heading.classList = 'heading';

  var page = document.querySelector('body');
  page.insertBefore(heading, addTodoForm);
/*==================================================================================*/
  
var state = []; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function (todo) {
    var todoNode = document.createElement("li");
    // you will need to use addEventListener

    // add span holding description
    var spanNode = document.createElement("span");
    spanNode.classList = 'spanStyle';
    spanNode.textContent = todo.description;
    todoNode.appendChild(spanNode);
    spanNode.addEventListener("click", toggleModal);

    spanNode.addEventListener('click', function(event){
      // event.target.textContent;
      // console.log(event.target.textContent)
      document.querySelector("#popUpText").textContent = event.target.textContent;
    })

    
    // this adds the delete button
    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.classList = 'deleteStyle';
    deleteButtonNode.textContent = 'Delete';
    deleteButtonNode.addEventListener("click", function (event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markToDoButton = document.createElement('button');
    markToDoButton.classList = 'markStyle';
    markToDoButton.textContent = 'Complete';
    markToDoButton.addEventListener("click", function (event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markToDoButton);
    /*======================================= Create Edit Button======================================*/
var inputEdits = document.createElement('button');
inputEdits.textContent = 'Edit'
inputEdits.classList = 'editStyle';

var formEdits = document.createElement('input');
formEdits.setAttribute('type', 'text');
formEdits.setAttribute('placeholder', 'Enter Your Edits');
formEdits.classList = 'formEdits';

var accept = document.createElement('button');
accept.textContent = 'ACCEPT'
accept.classList = 'acceptButton';

var contentForEdit;
inputEdits.addEventListener("click", function (event) {
  document.querySelector('#popUpText').innerHTML = '';
  document.querySelector('#popUpText').appendChild(formEdits);
  document.querySelector('#popUpText').appendChild(accept);
  contentForEdit = event.target.parentNode.firstChild;
  update(newState);

});
todoNode.appendChild(inputEdits);
accept.addEventListener('click', function(event) {
  if(/[A-Z-a-z]/.test(formEdits.value)){
    contentForEdit.textContent = formEdits.value;
    update(newState);
    document.querySelector('#add-todo input[type = text]').value = ''
  }else{
    alert('Wrong Value')
  }
  

});
accept.addEventListener("click", toggleModal);
inputEdits.addEventListener("click", toggleModal);
/* ============================================================================================= */

    if (todo.done) {
      // spanNode.classList.add('markStyle');
      todoNode.classList.add('nodelistStyle');
      markToDoButton.classList.add('complete');
      markToDoButton.textContent = 'Complete';

    } else {
      // spanNode.classList.remove('markStyle');
      todoNode.classList.remove('nodelistStyle');
      markToDoButton.classList.remove('complete');
      markToDoButton.textContent = 'Not Complete';

    }
    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function (event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();
      // var description = "?"; // event.target ....
      // var inputForm = document.querySelector('#add-todo input[type = text]');

      var description = document.querySelector('#add-todo input[type = text]').value;

      if (/[A-Z-a-z]/.test(description)) {
        description = document.querySelector('#add-todo input[type = text]').value;
        var newState = todoFunctions.addTodo(state, description); // ?? change this!
        update(newState);
        document.querySelector('#add-todo input[type = text]').value = ''
      } else {
        alert('Enter Your Task');
      }

    });
  }

  // you should not need to change this function
  var update = function (newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function (state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();














/*====================================================== */
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);




