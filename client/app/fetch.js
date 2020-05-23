// makeFetch object that includes fetch methods.
const makeFetch = {

    get: async () => {
        try {
            const res = await fetch('/api/courses');
            const data = await res.json();

            return data.courses;
        } catch (err) {
            console.error(err);
        }
    },

    getCourse: async (id) => {
        try{
            const res = await fetch(`/api/courses/${id}`);
            const data = await res.json();
            
            return data;
        }catch(err){
            console.error(err);
        }
    },

    post: async (courseName) => {
        try {
            const res = await fetch('/api/courses', {
                method: 'POST',
                body: JSON.stringify({ name: courseName }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const data = await res.json();

            return data;
            } catch (err) {
                console.error(err);
            }
    },

    delete: async (id) => {
        try {
            const res = await fetch(`/api/courses/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    },

    put: async (id, courseName) => {
        try {
            const res = await fetch(`/api/courses/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name: courseName }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const data = await res.json();
            
            return data;
        } catch (err) {
            console.error(err);
        }
    }
};
