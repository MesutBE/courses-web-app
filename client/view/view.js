// UI Class: Handle UI Tasks
class UI {
    static displayBooks(courses) {
        const list = document.querySelector('#course-list');
        list.innerHTML = '';
        courses.forEach((course) => UI.addBookToList(course));
    }

    // Add books
    static addBookToList(course) {
        const list = document.querySelector('#course-list');

        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${course.id}</td>
      <td>${course.title}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

        list.appendChild(row);
    }

    static deleteBook(el) {
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
        document.querySelector('#title').value = '';
    }
}

module.exports = UI;