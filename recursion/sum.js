'use strict';

const sum = list => {
    if (list.length === 0) {
        return 0;
    } else {
        return list[0] + sum(list.slice(1));
    }

}

const myList = [1, 3, 5, 7, 9];

console.log(sum(myList));