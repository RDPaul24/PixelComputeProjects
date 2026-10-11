
const noteInput = document.querySelector("#noteInput");
const addButton = document.querySelector("#addButton");
const notesSection = document.querySelector("#notesSection");

let noteCount = 0;

// Function to add a new note
function addNote() {
    let noteText = noteInput.value.trim();

    // Do not add an empty note
    if (noteText === "") {
        return;
    }

    // Create a new note
    let newNote = document.createElement("div");
    newNote.classList.add("note");

    // Alternate between blue and white
    if (noteCount % 2 === 0) {
        newNote.classList.add("blue-note");
    } else {
        newNote.classList.add("white-note");
    }

    // Add the note text
    newNote.textContent = noteText;

    // Create the delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");

    // Delete the note when X is clicked
    deleteButton.addEventListener("click", function() {
        newNote.remove();
    });

    // Add the delete button inside the note
    newNote.appendChild(deleteButton);

    // Display the note on the dashboard
    notesSection.appendChild(newNote);

    // Increase the count for the next note
    noteCount++;

    // Clear the input after adding the note
    noteInput.value = "";
}

// Run the function when the plus button is clicked
addButton.addEventListener("click", addNote);

