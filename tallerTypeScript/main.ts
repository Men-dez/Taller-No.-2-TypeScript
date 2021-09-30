import { Course } from "./course.js";
import { dataCourses } from "./dataCourses.js";
import { Student } from "./student.js";
import { dataStudents } from "./dataStudents.js";


const coursesTbody: HTMLElement = document.getElementById('courses')!; // Nodo tbody que tiene el id="courses"
const infoStudentTbody: HTMLElement = document.getElementById('infoStudent')!; // Nodo tbody que tiene el id="courses"

const btnfilterByName: HTMLElement = document.getElementById('button-filterByName')!; // Nodo tbody que tiene el id="button-filterByName"
const btnfilterByCreds: HTMLElement = document.getElementById('button-filterByCreds')!; // Nodo tbody que tiene el id="button-filterByName"

const inputValue: HTMLInputElement = (document.getElementById("search-box") as HTMLInputElement);
const inputValueCreds: HTMLInputElement = (document.getElementById("creds-box") as HTMLInputElement);

const textCreds: HTMLElement = document.getElementById('creds')!; // Nodo tbody que tiene el id="button-filterByName"
const tableCourses: HTMLElement = document.getElementById('tableInfo')!; // Nodo tbody que tiene el id="button-filterByName"

renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
textCreds.innerHTML = String(getTotalCredits(dataCourses));

function renderCoursesInTable(courses: Course[]): void {
  courses.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentsInTable(students: Student[]): void {
  students.forEach(s => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${s.codigo}</td>
                           <td>${s.cedula}</td>
                           <td>${s.edad}</td>
                           <td>${s.direccion}</td>
                           <td>${s.telefono}</td>`;
    infoStudentTbody.appendChild(trElement);
  });
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}

function clearCoursesInTable(){
  let bodyRef = tableCourses.getElementsByTagName('tbody')[0]; 
  bodyRef.innerHTML = '';
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
  } 

  function searchCourseByCreds(nameKey: string, courses: Course[]) {
    if (nameKey === '') return dataCourses
    else {
      let temp = nameKey.split("-");
      let min = parseInt(temp[0]);
      let max = parseInt(temp[1]);
      let res: Course[] = []

      while(min<=max){
        res = res.concat(courses.filter(c => c.credits == min));
        min++;
      }

      return res;
      
    }
  } 

function applyFilterByName() { 
  let text = inputValue.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  textCreds.innerHTML = String(getTotalCredits(coursesFiltered));
}
  
function applyFilterByCreds() { 
  let text = inputValueCreds.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreds(text, dataCourses);
  console.log(coursesFiltered)
  renderCoursesInTable(coursesFiltered);
  textCreds.innerHTML = String(getTotalCredits(coursesFiltered));
}

btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCreds.onclick = () => applyFilterByCreds();