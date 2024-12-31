// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = '';
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  for (let i = 0; i < fruits.length; i++) {
    const newLi = document.createElement('li');
    newLi.classList.add('fruit__item');
    if (fruits[i].color == 'фиолетовый') {
      newLi.classList.add('fruit_violet');
    } else
    if (fruits[i].color == 'зеленый') {
      newLi.classList.add('fruit_green');
    } else 
    if (fruits[i].color == 'розово-красный') {
      newLi.classList.add('fruit_carmazin'); 
    } else
    if (fruits[i].color == 'желтый') {
      newLi.classList.add('fruit_yellow');
    }  else
    if (fruits[i].color == 'светло-коричневый') {
      newLi.classList.add('fruit_lightbrown') 
    }
    fruitsList.appendChild(newLi);

    const div = document.createElement("div");
    div.classList.add('fruit__info');
    newLi.appendChild(div);  // добавляем div в родительский элемент li при помощи document.appendChild
    div.innerHTML = `
        <div>index: ${i + 1}</div>
        <div>kind: ${fruits[i].kind}</div>
        <div>color: ${fruits[i].color}</div>
        <div>weight: ${fruits[i].weight}</div>
        `;
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let newFruits = [...fruits];
  while (fruits.length > 0) {
    let randomFruit = getRandomInt(0, fruits.length - 1); // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    result.push(fruits[randomFruit]);  
    fruits.splice(randomFruit, 1);  
  }
  fruits = result;
  if (fruits.every((el, index) => el === newFruits[index])) {
    alert("Новый массив идентичен первоначальному. Перемешайте ещё раз!"); // перемешиваем новый массив с предупреждением в alert.  
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  if (isNaN(maxWeight.value) || isNaN(minWeight.value) || maxWeight.value == '' || minWeight.value == '' || maxWeight.value < 0 || minWeight.value < 0) {
    alert ('Введите более корректные значения веса');
    minWeight.value = "";
    maxWeight.value = "";
    return fruits;
  };
 let result = fruits.filter((item) => {
  if (parseInt(maxWeight.value) < parseInt(minWeight.value)) {
    [maxWeight.value, minWeight.value] = [minWeight.value, maxWeight.value];
  }
  return ((item.weight >= parseInt(minWeight.value)) && (item.weight <= parseInt(maxWeight.value)));
});
fruits = result;
};
 
filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
