const UI = require('../view/view.js')
export const init = async () => {
  const res = await fetch('/api/courses');
  const data = await res.json();

  UI.displayBooks(data)
  console.log(data);
};
