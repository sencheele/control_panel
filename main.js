// let studentsList = [];

// Получаем данные из объекта из массива и формируем строку таблицы
function getStudentItem(studentObj)
{
  let item = document.createElement('li');
  item.classList.add('item');
  item.setAttribute('data-id', studentObj.id);

  let name = document.createElement('span');
  name.classList.add('item__text', 'item__text_name');
  name.textContent = studentObj.surname + ' ' + studentObj.name + ' ' + studentObj.lastname;

  let faculty = document.createElement('span');
  faculty.classList.add('item__text', 'item__text_faculty');
  faculty.textContent = studentObj.faculty;

  let date = document.createElement('span');
  date.classList.add('item__text', 'item__text_date');
  let dateArr = studentObj.birthday.split('-');
  date.textContent = dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0];

  let years = document.createElement('span');
  years.classList.add('item__text', 'item__text_years');
  let today = new Date();
  let yearOfStusy = today.getFullYear() - parseInt(studentObj.studyStart);
  yearOfStusy = today.getMonth() > 7 ? yearOfStusy + 1 : yearOfStusy;
  yearOfStusy = yearOfStusy > 4 ? 'Закончил' : yearOfStusy + ' курс';
  years.textContent = studentObj.studyStart + '-' + (parseInt(studentObj.studyStart) + 4).toString() + ' (' + yearOfStusy + ')';

  let btnDel = document.createElement('button');
  btnDel.classList.add('item__del')
  btnDel.innerHTML = `
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.173 6.06948L17.6083 6.14927L16.965 17.729C16.9011 18.8711 15.9556 19.7656 14.812 19.7656H8.18802C7.04413 19.7656 6.09897 18.8711 6.035 17.729L5.39172 6.14927L6.82707 6.06948L7.47035 17.6493C7.49155 18.0298 7.80708 18.3281 8.18802 18.3281H14.812C15.1933 18.3281 15.5085 18.0298 15.5297 17.6489L16.173 6.06948Z" fill="#B3B3B3"/>
      <path d="M14.1435 8.35583C14.4907 8.36805 14.7624 8.65914 14.7502 9.0063L14.4997 16.2247C14.4878 16.5643 14.2086 16.8317 13.8715 16.8317C13.8639 16.8317 13.8568 16.8317 13.8492 16.8313C13.5021 16.8191 13.2304 16.528 13.2426 16.1809L13.4931 8.96245C13.5053 8.61566 13.796 8.34613 14.1435 8.35583Z" fill="#B3B3B3"/>
      <path d="M11.5 8.35547C11.8475 8.35547 12.1289 8.63722 12.1289 8.98438V16.1719C12.1289 16.519 11.8475 16.8008 11.5 16.8008C11.1525 16.8008 10.8711 16.519 10.8711 16.1719V8.98438C10.8711 8.63722 11.1525 8.35547 11.5 8.35547Z" fill="#B3B3B3"/>
      <path d="M9.50655 8.96246L9.75704 16.1809C9.7689 16.528 9.49721 16.8191 9.15041 16.8313C9.14286 16.8313 9.13568 16.8317 9.12813 16.8317C8.79104 16.8317 8.5118 16.5643 8.49994 16.2247L8.24946 9.0063C8.2376 8.65914 8.50929 8.36805 8.85608 8.35583C9.20252 8.34756 9.49433 8.61566 9.50655 8.96246Z" fill="#B3B3B3"/>
      <path d="M18.3281 5.39062C18.7249 5.39062 19.0469 5.71263 19.0469 6.10938C19.0469 6.50612 18.7249 6.82812 18.3281 6.82812H4.67188C4.27513 6.82812 3.95312 6.50612 3.95312 6.10938C3.95312 5.71263 4.27513 5.39062 4.67188 5.39062H18.3281Z" fill="#B3B3B3"/>
      <path d="M12.9375 2.51562C13.9283 2.51562 14.7344 3.3217 14.7344 4.3125V6.10938H13.2969V4.3125C13.2969 4.11448 13.1359 3.95312 12.9375 3.95312H10.0625C9.86413 3.95312 9.70312 4.11448 9.70312 4.3125V6.10938H8.26562V4.3125C8.26562 3.3217 9.0717 2.51562 10.0625 2.51562H12.9375Z" fill="#B3B3B3"/>
    </svg>`;
  btnDel.addEventListener('click', deleteStudent);

  item.append(name, faculty, date, years, btnDel);

  return item;
}

// Рендер таблицы
function renderStudentsTable(studentsArray)
{
  let list = document.querySelector('.list');

  while (list.children.length > 1)
  {
    list.removeChild(list.lastChild);
  }

  for (const item of studentsArray)
  {
    list.append(getStudentItem(item));
  }
}

// Рендер строки таблицы
function renderStudentItem(item)
{
  document.querySelector('.wrapper-list').style.display = 'block';
  let list = document.querySelector('.list');
  list.append(item);
}

async function getListStudents()
{
  return fetch('http://localhost:3000/api/students')
    .then(response => response.json())
    .then(data => data);
}

getListStudents()
  .then(studentsList => {
    console.log('studentsList = ' + studentsList);

    if (studentsList.length > 0)
    {
      document.querySelector('.wrapper-list').style.display = 'block';
      renderStudentsTable(studentsList);
    }
    else
    {
      document.querySelector('.wrapper-list').style.display = 'none';
    }
  });

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
function getCurrentDate()
{
  let today = new Date();
  let maxDate = String(today.getFullYear()) + '-' + ((today.getMonth() + 1) < 10 ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + (today.getDate() < 10 ? '0' + String(today.getDate()) : String(today.getDate()));

  let inputDate = document.getElementById('dateBirth');
  inputDate.setAttribute('max', maxDate);

  let inputYear = document.getElementById('year');
  inputYear.setAttribute('max', today.getFullYear());
}

getCurrentDate();

function removeSpaceInInputs(event)
{
  event.target.value = event.target.value.trim();
}

document.getElementById('surname').addEventListener('input', removeSpaceInInputs);
document.getElementById('lastName').addEventListener('input', removeSpaceInInputs);
document.getElementById('patronymic').addEventListener('input', removeSpaceInInputs);
document.getElementById('faculty').addEventListener('input', removeSpaceInInputs);

async function checkForm(event)
{
  event.preventDefault();

  hideErrors();

  const formData = new FormData(event.target);

  let checkSymbolsInput = false;
  let checkForeignInput = false;

  for (const [name, value] of formData.entries())
  {
    if (name !== 'dateBirth' && name !== 'year')
    {
      for (const char of value)
      {
        if (!((char.charCodeAt() >= 1040 && char.charCodeAt() <= 1103) || char.charCodeAt() === 1025 || char.charCodeAt() === 1105 || (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)))
        {
          checkSymbolsInput = true;
        }

        if ((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122))
        {
          checkForeignInput = true;
        }
      }
    }
  }

  outputErrors(checkSymbolsInput, checkForeignInput);

  if (checkSymbolsInput === false && checkForeignInput === false)
  {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: (formData.get('lastName'))[0].toUpperCase() + (formData.get('lastName')).slice(1),
        surname: (formData.get('surname'))[0].toUpperCase() + (formData.get('surname')).slice(1),
        lastname: (formData.get('patronymic'))[0].toUpperCase() + (formData.get('patronymic')).slice(1),
        birthday: formData.get('dateBirth'),
        studyStart: formData.get('year'),
        faculty: (formData.get('faculty')).toUpperCase(),
      }),
    });

    const data = await response.json();
    console.log(data);

    renderStudentItem(getStudentItem(data));
    event.target.reset();
  }
}

function outputErrors(symbol, foreign)
{
  let wrapperList = document.querySelector('.wrapper-errors');

  if (symbol === true)
  {
    let symbolErrorMessage = document.createElement('span');
    symbolErrorMessage.textContent = 'Поля содержат недопустимые символы!'
    wrapperList.appendChild(symbolErrorMessage);
  }

  if (foreign === true)
  {
    let foreignErrorMessage = document.createElement('span');
    foreignErrorMessage.textContent = 'Поля содержат латинские символы!'
    wrapperList.appendChild(foreignErrorMessage);
  }
}

function hideErrors()
{
  let wrapperList = document.querySelector('.wrapper-errors');
  wrapperList.replaceChildren();
}

document.getElementById('formStudents').addEventListener('submit', checkForm);

// Этап 6. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
let sortName = -1;
let sortFaculty = -1;
let sortDate = -1;
let sortYears = -1;

async function sortNameFunc()
{
  sortName *= -1;

  let newStudentList = await getListStudents()

  for (let i = 0; i < newStudentList.length - 1; i++)
  {
    for (let j = 0; j < newStudentList.length - i - 1; j++)
    {
      let firstFio = newStudentList[j].surname + ' ' + newStudentList[j].lastName + ' ' + newStudentList[j].patronymic;
      let secondFio = newStudentList[j + 1].surname + ' ' + newStudentList[j + 1].lastName + ' ' + newStudentList[j + 1].patronymic;

      firstFio = firstFio.toLowerCase();
      secondFio = secondFio.toLowerCase();

      if (firstFio > secondFio)
      {
        let temporaryVar = newStudentList[j];
        newStudentList[j] = newStudentList[j + 1];
        newStudentList[j + 1] = temporaryVar;
      }
    }
  }

  if (sortName === -1)
  {
    newStudentList.reverse();
  }

  renderStudentsTable(newStudentList);
}

async function sortFacultyFunc()
{
  sortFaculty *= -1;

  let newStudentList = await getListStudents()

  for (let i = 0; i < newStudentList.length - 1; i++)
  {
    for (let j = 0; j < newStudentList.length - i - 1; j++)
    {
      let firstFaculty = newStudentList[j].faculty;
      let secondFaculty = newStudentList[j + 1].faculty;

      firstFaculty = firstFaculty.toLowerCase();
      secondFaculty = secondFaculty.toLowerCase();

      if (firstFaculty > secondFaculty)
      {
        let temporaryVar = newStudentList[j];
        newStudentList[j] = newStudentList[j + 1];
        newStudentList[j + 1] = temporaryVar;
      }
    }
  }

  if (sortFaculty === -1)
  {
    newStudentList.reverse();
  }

  renderStudentsTable(newStudentList);
}

async function sortDateBirth()
{
  sortDate *= -1;

  let newStudentList = await getListStudents()

  for (let i = 0; i < newStudentList.length - 1; i++)
  {
    for (let j = 0; j < newStudentList.length - 1; j++)
    {
      if (Number(newStudentList[j].birthday.split('-')[0]) < Number(newStudentList[j + 1].birthday.split('-')[0]))
      {
        let temporaryVar = newStudentList[j];
        newStudentList[j] = newStudentList[j + 1];
        newStudentList[j + 1] = temporaryVar;
      }
    }
  }

  for (let i = 0; i < newStudentList.length - 1; i++)
  {
    for (let j = 0; j < newStudentList.length - 1; j++)
    {
      if (Number(newStudentList[j].birthday.split('-')[0]) === Number(newStudentList[j + 1].birthday.split('-')[0]))
      {
        if (Number(newStudentList[j].birthday.split('-')[1]) < Number(newStudentList[j + 1].birthday.split('-')[1]))
        {
          let temporaryVar = newStudentList[j];
          newStudentList[j] = newStudentList[j + 1];
          newStudentList[j + 1] = temporaryVar;
        }
      }
    }
  }

  for (let i = 0; i < newStudentList.length - 1; i++)
  {
    for (let j = 0; j < newStudentList.length - 1; j++)
    {
      if (Number(newStudentList[j].birthday.split('-')[0]) === Number(newStudentList[j + 1].birthday.split('-')[0]))
      {
        if (Number(newStudentList[j].birthday.split('-')[1]) === Number(newStudentList[j + 1].birthday.split('-')[1]))
        {
          if (Number(newStudentList[j].birthday.split('-')[2]) < Number(newStudentList[j + 1].birthday.split('-')[2]))
          {
            let temporaryVar = newStudentList[j];
            newStudentList[j] = newStudentList[j + 1];
            newStudentList[j + 1] = temporaryVar;
          }
        }
      }
    }
  }

  if (sortDate === -1)
  {
    newStudentList.reverse();
  }

  renderStudentsTable(newStudentList);
}

async function sortYearsOfStudy()
{
  sortYears *= -1;

  let newStudentList = await getListStudents()

  for (let i = 0; i < newStudentList.length - 1; i++)
  {
    for (let j = 0; j < newStudentList.length - 1; j++)
    {
      if (parseInt(newStudentList[j].studyStart) < parseInt(newStudentList[j + 1].studyStart))
      {
        let temporaryVar = newStudentList[j];
        newStudentList[j] = newStudentList[j + 1];
        newStudentList[j + 1] = temporaryVar;
      }
    }
  }

  if (sortYears === -1)
  {
    newStudentList.reverse();
  }

  renderStudentsTable(newStudentList);
}

document.getElementById('sort-name').addEventListener('click', sortNameFunc);
document.getElementById('sort-faculty').addEventListener('click', sortFacultyFunc);
document.getElementById('sort-date').addEventListener('click', sortDateBirth);
document.getElementById('sort-years').addEventListener('click', sortYearsOfStudy);

// Этап 7. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
function searchOfTable(event)
{
  async function searchName(event)
  {
    let searchValue = event.target.value;
    searchValue = searchValue.toLowerCase();
    let newStudentList = await getListStudents()
    let matches = [];

    for (const item of newStudentList)
    {
      let line = item.surname + ' ' + item.name + ' ' + item.lastname;
      line = line.toLowerCase();

      if (line.includes(searchValue)) matches.push(item);
    }

    renderStudentsTable(matches);
  }

  async function searchFaculty(event)
  {
    let searchValue = event.target.value;
    searchValue = searchValue.toLowerCase();
    let newStudentList = await getListStudents()
    let matches = [];

    for (const item of newStudentList)
    {
      let line = item.faculty;
      line = line.toLowerCase();

      if (line.includes(searchValue)) matches.push(item);
    }

    renderStudentsTable(matches);
  }

  async function searchStart(event)
  {
    event.target.value = event.target.value.trim();

    if (isNaN(event.target.value[event.target.value.length - 1]))
    {
      event.target.value = event.target.value.slice(0, -1);
    }

    let searchValue = event.target.value;
    let newStudentList = await getListStudents()
    let matches = [];

    for (const item of newStudentList)
    {
      let line = item.studyStart.toString();

      if (line.includes(searchValue)) matches.push(item);
    }

    renderStudentsTable(matches);
  }

  async function searchEnd(event)
  {
    event.target.value = event.target.value.trim();

    if (isNaN(event.target.value[event.target.value.length - 1]))
    {
      event.target.value = event.target.value.slice(0, -1);
    }

    let searchValue = event.target.value;
    let newStudentList = await getListStudents()
    let matches = [];

    for (const item of newStudentList)
    {
      let line = (Number(item.studyStart) + 4).toString();

      if (line.includes(searchValue)) matches.push(item);
    }

    renderStudentsTable(matches);
  }

  const radios = document.querySelectorAll('input[name="radio"]');

  if (radios[0].checked) searchName(event);
  if (radios[1].checked) searchFaculty(event);
  if (radios[2].checked) searchStart(event);
  if (radios[3].checked) searchEnd(event);
}

document.getElementById('search').addEventListener('input', searchOfTable);

// Удаление студента
async function deleteStudent(event)
{
  let item = (event.currentTarget).parentElement;
  let idStudent = item.getAttribute('data-id');
  console.log(idStudent);

  await deleteOfStudents(idStudent);
  hideStudent(item);
}

async function deleteOfStudents(idStudent)
{
  const response = await fetch(`http://localhost:3000/api/students/${idStudent}`, {
    method: 'DELETE',
  })

  const data = await response.json();
  console.log(data);
}

function hideStudent(item)
{
  item.remove();

  let list = document.querySelector('.list');

  if ((list.children).length < 2)
    document.querySelector('.wrapper-list').style.display = 'none';
}
