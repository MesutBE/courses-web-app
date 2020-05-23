// UI Class: Handle UI Tasks
class UI {
    static displayCourses(courses) {
        if (typeof courses !== 'object') {return};
        const list = document.querySelector('#course-list');
        list.innerHTML = '';
        if (Array.isArray(courses)){
            courses.forEach((course) => UI.addCourseToList(course));
        }else{
            UI.addCourseToList(courses);
        }
    }

    // Add Courses
    static addCourseToList(course) {
        const list = document.querySelector('#course-list');

        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${course.id}</td>
      <td>${course.name}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

        console.log('addCourseToList run..');
        list.appendChild(row);
    }

    static deleteCourse(el) {
        el.parentElement.parentElement.remove();
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#course-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 1000);
    }

    static clearFields() {
        document.querySelector('#id').value = '';
        document.querySelector('#name').value = '';
    }
}
