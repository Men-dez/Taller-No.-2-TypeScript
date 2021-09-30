import { dataCourses } from "./dataCourses.js";
import { dataStudents } from "./dataStudents.js";
var coursesTbody = document.getElementById('courses'); // Nodo tbody que tiene el id="courses"
var infoStudentTbody = document.getElementById('infoStudent'); // Nodo tbody que tiene el id="courses"
var btnfilterByName = document.getElementById('button-filterByName'); // Nodo tbody que tiene el id="button-filterByName"
var btnfilterByCreds = document.getElementById('button-filterByCreds'); // Nodo tbody que tiene el id="button-filterByName"
var inputValue = document.getElementById("search-box");
var inputValueCreds = document.getElementById("creds-box");
var textCreds = document.getElementById('creds'); // Nodo tbody que tiene el id="button-filterByName"
var tableCourses = document.getElementById('tableInfo'); // Nodo tbody que tiene el id="button-filterByName"
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
textCreds.innerHTML = String(getTotalCredits(dataCourses));
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                           <td>" + c.professor + "</td>\n                           <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    students.forEach(function (s) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + s.codigo + "</td>\n                           <td>" + s.cedula + "</td>\n                           <td>" + s.edad + "</td>\n                           <td>" + s.direccion + "</td>\n                           <td>" + s.telefono + "</td>";
        infoStudentTbody.appendChild(trElement);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    var bodyRef = tableCourses.getElementsByTagName('tbody')[0];
    bodyRef.innerHTML = '';
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCreds(nameKey, courses) {
    if (nameKey === '')
        return dataCourses;
    else {
        var temp = nameKey.split("-");
        var min_1 = parseInt(temp[0]);
        var max = parseInt(temp[1]);
        var res = [];
        while (min_1 <= max) {
            res = res.concat(courses.filter(function (c) { return c.credits == min_1; }));
            min_1++;
        }
        return res;
    }
}
function applyFilterByName() {
    var text = inputValue.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    textCreds.innerHTML = String(getTotalCredits(coursesFiltered));
}
function applyFilterByCreds() {
    var text = inputValueCreds.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreds(text, dataCourses);
    console.log(coursesFiltered);
    renderCoursesInTable(coursesFiltered);
    textCreds.innerHTML = String(getTotalCredits(coursesFiltered));
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreds.onclick = function () { return applyFilterByCreds(); };
