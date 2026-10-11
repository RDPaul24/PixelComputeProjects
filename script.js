//Taking the input, adding button features and section features
//I took small variables to ensure tenacious process doesnt happen
const input = document.querySelector("#noteInput");
const addButton = document.querySelector("#addButton");
const section = document.querySelector("#notesSection");
let noteCount = 0;

//To add a new note
let addNote = () => {
    let text = input.value.trim();
    //Adding only if text present else not
    if (text === "") {
        return;
    }
    //Creating a new note
    let newNote = document.createElement("div");
    newNote.classList.add("note");
    
    //Changing between blue, white and red to randomise
    if (noteCount % 3 === 0) {
        newNote.classList.add("blue-note");
    } else if (noteCount % 2 === 0){
        newNote.classList.add("white-note");
    } else {
        newNote.classList.add("red-note");
    }
    
    //Adding the text content
    newNote.textContent = text;
    //Creating the delete button
    let deletingButton = document.createElement("button");
    deletingButton.textContent = "X";
    deletingButton.classList.add("delete-button");

    //Deleting the note when the button is clicked
    deletingButton.addEventListener("click", function() { newNote.remove(); });

    //Adding the delete button inside the node
    newNote.appendChild(deletingButton);
    //Display node in dashboard
    section.appendChild(newNote);
    //Increase count for the next node
    noteCount++;
    //Clearing input after adding the node
    input.value = "";
}

//Running the function when the plus button is pressed
addButton.addEventListener("click", addNote);

