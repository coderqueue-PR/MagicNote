console.log("Welcome to note app and this is a note project app.js");
showNotes();

//initially save the notes on local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTittle = document.getElementById('addTittle')
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj ={
        tittle: addTittle.value,
        text : addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTittle.value = "";
    showNotes();

})
 
// function to show elements from localStorage

function showNotes() {  
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } 
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index) {
        html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title"> ${element.tittle}</h5>
        <p class="card-text"> ${element.text}</p>
        <button  id ="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
     
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML = `Your NoteBook is Empty Now!.Write Anything you want`;
    }
}

//function to delete a note
function deleteNote(index) {
    // console.log('I am deleting' , index);    
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } 
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();


}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function () {

    let inputVal = search.value.toLowerCase();
    // console.log('input event fired',inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })


})
