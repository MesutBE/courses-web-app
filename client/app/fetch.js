// makeFetch object that includes fetch methods.
const makeFetch = {

    get: async () => {
        const res = await fetch('/api/courses');
        const data = await res.json();
        console.log(data);
    },

    getCourse: async (id) => {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        console.log(data);
    },

    post: async (courseName) => {
        const res = await fetch('/api/courses', {
            method: 'POST',
            body: JSON.stringify({ name: courseName }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();
        return data;
    },

    delete: async (id) => {
        const res = await fetch(`/api/courses/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
    },

    put: async (id) => {
        const res = await fetch(`/api/courses/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name: courseName }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();
        console.log(data);
    }
};


module.exports = makeFetch;