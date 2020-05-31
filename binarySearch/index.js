'use strict';

const binarySearch = (sortedList, searchedItem) => {
    let low = 0,
        high = sortedList.length - 1;
    while(low <= high) {
        let mid = Math.floor((high + low)/2);
        if (mid === searchedItem) {
            return mid;
        };
        if (searchedItem < mid) {
            high = mid - 1
        } else { low = mid + 1 ;}
    }
    return null;
}


const myList = [1, 3, 5, 7, 9];

console.log(binarySearch(myList, 3)); // 1
console.log(binarySearch(myList, -1)); // null