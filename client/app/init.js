export const init = async () => {
  const res = await fetch('/api/courses');
  const data = await res.json();

  UI.displayCourses(data.courses)
};
