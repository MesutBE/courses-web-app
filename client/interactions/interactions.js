// Event: Add a Course
document.querySelector('#course-form').addEventListener('submit', async (e) => {
    // Prevent actual submit
    e.preventDefault();
debugger
    // Get form values
    // To use FormData you need to make sure all your input elements have a name attribute.
    const formData = new FormData(e.target);

    const courseName = formData.get('name');
    // const id = formData.get('id');

    // Validate
    if (courseName === '') {
        UI.showAlert('Please fill the field', 'danger');
    } else {
        if (courseName.length < 4) {
            UI.showAlert('\"name\" length must be at least 3 characters long,', 'danger')
            return
        }
        const course = {
            name: courseName
        }

        await makeFetch.post(courseName)
        const data = await makeFetch.get();
        
        UI.displayCourses(data);
        
        // Show success message
        UI.showAlert('Course Added', 'success');
        
        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Course
document.querySelector('#course-list').addEventListener('click', async (e) => {
    // debugger
    if (e.target.classList.contains('delete')) {
        // Remove Course from UI
        UI.deleteCourse(e.target);

        // Remove Course from store
        const idText = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        await makeFetch.delete(parseInt(idText));

        const data = await makeFetch.get();
        UI.displayCourses(data);

        // Show success message
        UI.showAlert('Course Removed', 'success');
    }
});

document.querySelector('#search').addEventListener('click', async (e) => {

    const formData = new FormData(document.querySelector('#course-form'));
    const courseId = formData.get('id');

    if (courseId === ''){
        const data = await makeFetch.get();

        UI.displayCourses(data);
        return
    }
    const course = await makeFetch.getCourse(parseInt(courseId));
    
    UI.displayCourses(course)

    const nameField = document.querySelector('#name');
    nameField.value = course.name;

    // Show success message
    UI.showAlert('Course Listed', 'success');
});

document.querySelector('#update').addEventListener('click', async (e) => {

    const formData = new FormData(document.querySelector('#course-form'));
    const courseId = formData.get('id');
    const courseName =formData.get('name');

    if (courseId === '' || courseName === '') {
        return
    }

    const data = await makeFetch.put(courseId, courseName);

    UI.displayCourses(data);

    document.querySelector('#id').value = '';
    document.querySelector('#name').value = '';

    // Show success message
    UI.showAlert('Course Updated', 'warning');
});