// Перевёл всё в ES 2015.
// Также применил Prettier (Код плохо читаемый)

// Почему везде в коде нестрогое соответствие?
// Ты уверена что такое большое количество parseInt необходимо?
// Мне кажется во многих случаях ты можешь либо вообще убрать его, либо ограничиться проверкой typeof

// Нужно быть аккуратнее с использованием таких имен. Часто подобные наименования зарезервированы фреймворками или самим js.
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;

    this.add = digit => {
      if (this.next == null) {
        this.next = new Node(digit);
      } else {
        this.next.add(digit);
      }
    };

    this.search = digit => {
      if (this.value == digit) {
        return this;
      } else if (this.next != null) {
        return this.next.search(digit);
      }
      return null;
    };

    this.delete = digit => {
      if (this.next != null) {
        if (this.next.value == digit) {
          this.next = this.next.next;
          return true;
        } else {
          return this.next.delete(digit);
        }
      } else {
        return false;
      }
    };
  }
}

class LinkedList {
  constructor(number) {
    this.root = null;

    // Хоть JS и позволяет работать с приведением типов - всё же лучше избегать таких значений.
    // Такое условие (как я понимаю если будет 0 выполнение условия не произойдет) очень рискованно.
    if (parseInt(number, 10)) {
      let arr = number
        .toString()
        .split("")
        .map(function(value) {
          return new Node(value);
        });

      for (var i = 0; i < arr.length; i++) {
        if (i < arr.length - 1) {
          arr[i].next = arr[i + 1];
        }
      }

      this.root = arr[0];
    }

    //Функция как атрибут функции LinkedList
    this.add = digit => {
      if (this.root == null) {
        this.root = new Node(digit);
      } else {
        this.root.add(digit);
      }
    };

    //Печать значений
    this.print = () => {
      let cursor = this.root;
      console.log("List:");
      while (cursor != null) {
        console.log("\t" + cursor.value);
        cursor = cursor.next;
      }
    };

    // Дублирование наименований - плохая практика.
    // Чем подробнее ты будешь называть метод тем благодарнее тебе будут члены команды.
    // На первый взгляд это просто напоминает рекурсию )))

    //Поиск значений
    this.search = digit => {
      if (this.root != null) {
        return this.root.search(digit);
      }
      return null;
    };

    // Эгейн. Понятно что тут это обусловлено скоупом, но всё же лучше не использовать
    // дублирующие названия в именах методов и значений (в классе Node уже есть delete)

    //Удаление значения
    this.delete = digit => {
      if (this.root != null) {
        if (this.root.value == digit) {
          this.root = this.root.next;
          return true;
        } else {
          return this.root.delete(digit);
        }
      } else {
        return false;
      }
    };

    //Копирование значений
    this.copy = () => {
      let linkedList = new LinkedList();

      if (this.root != null) {
        let cursor = this.root;
        do {
          this.add(cursor.value);
          cursor = cursor.next;
        } while (cursor != null);
      }
      return linkedList;
    };

    //Реверс LinkedList
    this.reverse = () => {
      let linkedList = new LinkedList();

      if (this.root != null) {
        let cursor = this.root;

        do {
          let current = new Node();
          current.value = cursor.value;

          if (linkedList.root == null) {
            current.next = null;
            linkedList.root = current;
          } else {
            current.next = linkedList.root;
            linkedList.root = current;
          }
          cursor = cursor.next;
        } while (cursor != null);
      }
      return linkedList;
    };
  }
}

class pair {
  constructor(left, right) {
    // Что происходит при вызове этой функции, если одно из входящих значений равно null?
    // Можно же написать изящнее, сделать общую проверку, к примеру.

    if (left != null) {
      this.left = left.value;
    }
    if (right != null) {
      this.right = right.value;
    }
    this.sum = () => {
      // В одних случаях ты передаешь второй аргумент для parseInt, в других нет. Код не консистентен.
      return parseInt(this.right) + parseInt(this.left);
    };
  }
}

function sum(left, right) {
  let result = new LinkedList();
  let fraction = 0;

  let leftCursor = left.root;
  let rightCursor = right.root;

  let stack = [];
  let temp = [];

  // Тут мне очень не нравится цикл в цикле.
  // Супер грязно выглядит.
  // Тут array.reduce() вполне может решить эту проблему.

  do {
    let element = new pair(leftCursor, rightCursor);
    stack.push(element);
    leftCursor = leftCursor.next;
    rightCursor = rightCursor.next;

    if (rightCursor == null) {
      while (leftCursor != null) {
        temp.push(leftCursor.value);
        leftCursor = leftCursor.next;
      }
      break;
    }

    if (leftCursor == null) {
      while (rightCursor != null) {
        temp.push(rightCursor.value);
        rightCursor = rightCursor.next;
      }
      break;
    }
  } while (leftCursor != null || rightCursor != null);

  stack.forEach(value => {
    let fin;
    let element = value.sum() + fraction;

    if (element >= 10) {
      fin = element % 10;
      fraction = parseInt(element / 10);
    } else {
      fin = element;
      fraction = 0;
    }
    result.add(fin);
  });

  // Старайся приучать себя к строгой типизации. Это очень рискованно в целом, используя js, писать == или !=.
  if (fraction != 0 && temp.length == 0) {
    result.add(fraction);
  } else {
    temp.forEach(t => {
      result.add((parseInt(t) + fraction) % 10);
      fraction = parseInt((parseInt(t) + fraction) / 10);
    });
  }

  return result.reverse();
}

let list = new LinkedList(12345678);

list.add(5);
list.add(100);
list.print();

let found = list.search("1");

if (found == null) {
  console.log("Число не было найдено в списке. Попробуйте еще раз");
} else {
  console.log("Число " + found.value + " было найдено в списке");
}

list.delete(90);
list.print();

let reversedList = list.reverse();
reversedList.print();

let a = new LinkedList(4591).reverse();
a.print();
let b = new LinkedList(5434146).reverse();
b.print();

let c = sum(a, b);
c.print();
