const courses = [
  { name: 'Lingonberry jam', price: 4.0 },
  { name: 'Mushroom and bean casserole', price: 5.5 },
  { name: 'Chili-flavoured wheat', price: 3.0 },
  { name: 'Vegetarian soup', price: 4.8 },
  { name: 'Pureed root vegetable soup with smoked cheese', price: 8.0 },
];
const originalCourses = [...courses];

let course = 'Mushroom and bean casserole';

const validateCourse = (course) => {
  const regexpPattern =
    /^[A-ZÖÄÅ][\s\d a-zöäå \_\-\.\:\;\(\)\{\}\\\/\[\] ]{3,63}$/;
  return regexpPattern.test(course);
};
console.log('RegExp test ->', 'String:', course, validateCourse(course));

console.log('Original courses:', originalCourses);

const sortedCourses = courses.sort((a, b) => {
  return b.price - a.price;
});
console.log('Sorted by price:', sortedCourses);

const filteredCourses = courses.filter((course) => course.price < 5);
console.log('Filtered prices under 5€:', filteredCourses);

const totalPriceCourses = courses.reduce(
  (acc, courses) => acc + courses.price,
  0
);
console.log('All courses total price:', totalPriceCourses);
