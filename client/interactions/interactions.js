const UI = require('../view/view.js');
const fetch = require('../app/fetch.js');

// Event: Add a Book
document.querySelector('#course-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    // To use FormData you need to make sure all your input elements have a name attribute.
    const formData = new FormData(e.target);

    const courseName = formData.get('name');
    // const id = formData.get('id');

    // Validate
    if (name === '') {
        UI.showAlert('Please fill the field', 'danger');
    } else {
        const course = {
            name: courseName
        }

        // Add Course to UI
        UI.addBookToList(course);

        // Add Course to store
        
        fetch.post(courseName)
        UI.displayBooks(fetch.get());

        // Show success message
        UI.showAlert('Course Added', 'success');

        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Course
document.querySelector('#course-list').addEventListener('click', (e) => {
    // debugger
    if (e.target.classList.contains('delete')) {
        // Remove Course from UI
        UI.deleteBook(e.target);

        // Remove Course from store
        fetch.delete(e.target.parentElement.previousElementSibling.textContent);
        UI.displayBooks(fetch.get());

        // Show success message
        UI.showAlert('Book Removed', 'success');
    }
});