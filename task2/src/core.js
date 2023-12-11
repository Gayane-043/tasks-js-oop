//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) 
{
    return(n | 0) === n;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() 
{
    return [...Array(10).keys()].map((i) => i * 2 + 2);
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) 
{
    let sum = 0;
    for (let i = 0; i <= n; ++i) sum += i;
    return sum;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) 
{
    return n === 0 ? 0 : n + recSumTo(n - 1);
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) 
{
    return n === 0 ? 1 : factorial(n - 1) * n;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) 
{
    if (n === 2 || n === 1) return true;
    return n / 2 === 2 ? true : n > 2 ? isBinary(n / 2) : false;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) 
{
    if (n === 1 || n === 2) return 1;
    let first = 1;
    let second = 1;
    for (let i = 3; i <= n; ++i)
    {
        let tmp = first;
        first = second;
        second = second + tmp;
    }
    return second;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) 
{
    if (arguments.length === 1 && isFinite(initialValue)) 
    {
        return function (newValue) 
        {
            return initialValue;
        };
    }
    if (arguments.length === 2 && isFinite(initialValue) && typeof operatorFn === 'function') 
    {
        return function (newValue) 
        {
            initialValue = operatorFn(initialValue, newValue);
            return initialValue;
        };
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) 
{
    let r = start - step;
    return function ()
    {
        p += step;
        return p;
    }
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) 
{
    if (Object.is(firstObject, secondObject)) return true;
    if ((firstObject !== Object(firstObject)) || (secondObject !== Object(secondObject)) || (firstObject === null) || (secondObject === null)) return firstObject === secondObject;
    else 
    {
        if (Object.keys(firstObject).length != Object.keys(secondObject).length) return false;
        for (let h in firstObject)
        {
            if (secondObject.hasOwnProperty(h))
            {
                if (!deepEqual(firstObject[h], secondObject[h])) return false;
            }
            else return false;
        }
        return true;
    }
}

module.exports = 
{
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};