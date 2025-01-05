// элементы в DOM можно получить при помощи функции querySelector
const minWeight = document.querySelector('.minweight__input'); // поле с минимальным весом
const maxWeight = document.querySelector('.maxweight__input'); // поле с максимальным весом
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
    alert('Введены некоректные значения');
    minWeight.value = "";
    maxWeight.value = "";
    return fruits;
  };
  let result = fruits.filter((item) => {
    if (parseInt(maxWeight.value) < parseInt(minWeight.value)) {
      [maxWeight.value, minWeight.value] = [minWeight.value, maxWeight.value]; // Значения меняются местами если max меньше min.
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

// сравнение двух элементов по цвету
const comparationColor = (a, b) => {
  const priority = ['зеленый', 'желтый', 'фиолетовый', 'светло-коричневый', 'розово-красный']
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 > priority2;
};

//функция сортировки пузырьком
const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
  for (let i = 0; i < n-1; i++) {
     for (let j = 0; j < n-1; j++) {
      if (comparation(arr[j], arr[j+1])) {
        let temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
      }
     }
   return arr;
   }
  },
// функция быстрой сортировки
  quickSort(arr, comparation) {
    
      // Условие остановки, выхода из рекурсии, возвращаем массив с 1 элементом
      if (arr.length < 2) {return arr};
      // Выбираем опорный элемент
      let pivot = arr[0];
      // Определяем массивы для тех, что меньше и больше опорного
      const left = [];
      const right = [];
      // Проходим циклом по всем элементам из массива и разносим их в созданные ранее массивы согласно условию, больше опорного — в правый, меньше — в левый
      for (let i = 1; i < arr.length; i++) {
        if (comparationColor(pivot > arr[i])) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
      // Рекурсивно повторяем процесс для новых двух массивов, текущий опорный элемент — кладём как первый в правый массив
      arr = [...sortAPI.quickSort(left, comparationColor), pivot, ...sortAPI.quickSort(right, comparationColor)];
      return arr;
    
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
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
  } else sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});


sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  fruits = sortAPI.quickSort(fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // создание и добавление нового фрукта в массив fruits
  if (kindInput.value === "" || colorInput.value === "" || weightInput.value === "") {
    alert('Заполните все поля!')
  } else {
    if ((weightInput.value < 0) || isNaN(weightInput.value)) {
      alert('Введите корректное значение веса (целое положительное число)!')
      weightInput.value = "";
    } else {
      fruits.push({ "kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value });
      display();
      kindInput.value = "";
      colorInput.value = "";
      weightInput.value = "";
    }
  }
  display();
});
