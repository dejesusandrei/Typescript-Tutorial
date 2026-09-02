function oneGeneric<T>(item: T): T {
  return item;
}
const result = oneGeneric("Andrei"); // returns a string

function pair<T, U>(first: T, second: U) {
  return { first, second };
}
const pariResult = pair("Andrei", 30); // returns { first: string, second: number }

function merge<T extends object, U extends object>(first: T, second: U) {
  return {
    ...first,
    ...second,
  };
}
const user = {name: "Andrei"};
const account = {email: "andrei@gmail.com"};
const resultMerge = merge(user, account); // returns { name: string, email: string }

// Three generic types
function example<T, U, V>(
  a: T,
  b: U,
  c: V
) {
  return { a, b, c };
}
const resultThree = example(
  "Andrei",
  21,
  true
); // returns { a: string, b: number, c: boolean }