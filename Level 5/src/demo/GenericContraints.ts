function getLength<T extends {length: number} >(value: T): number {
  return value.length;
}
getLength("Andrei"); // returns 6
getLength([1, 2, 3]); // returns 3
// getLength(100); // Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.

function merge<T extends object, U extends object>(first: T, second: U) {
  return { ...first, ...second };
}
const result = merge(
  { name: "Andrei" },
  { age: 21 }
); // returns { name: string, age: number }


type HasId = {
  id: string;
};

function printId<T extends HasId>(item: T): string {
  return item.id;
}
const user = {
  id: "user-001",
  name: "Andrei",
  email: "andrei@example.com"
};
printId(user); // returns "user-001"
const product = {
  id: "product-001",
  name: "Laptop",
  price: 50000
};
printId(product); // returns "product-001"

// =====

function getId<T extends {id: string}>(item: T): string {
  return item.id;
}
const user1 = {
  id: "u001",
  name: "Andrei"
};
const product1 = {
  id: "p001",
  name: "Laptop",
  price: 50000
};
getId(user1); // return u001
getId(product1); // return p001

// ==================
// Real-world Example — API Data

type User = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const users: User[] = [
  {
    id: "u1",
    name: "Andrei"
  },
  {
    id: "u2",
    name: "John"
  }
];

const tasks: Task[] = [
  {
    id: "t1",
    title: "Learn TypeScript",
    completed: false
  }
];

const products: Product[] = [
  {
    id: "p1",
    name: "Laptop",
    price: 50000
  }
];


// Usable for User, Task and Product types
function findById<T extends {id: string}>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

function findByName<T extends {name: string}>(items: T[], name: string): T | undefined {
  return items.find(item => item.name === name);
}

function getName<T extends {name: string}>(items: T): string | undefined {
  return  items.name;
}

const user2 = findById(users, "u1"); // returns { id: "u1", name: "Andrei" }
const product2 = findById(products, "p1"); // returns { id: "p1", name: "Laptop", price: 50000 }
const task = findById(tasks, "t1"); // returns { id: "t1", title: "Learn TypeScript", completed: false }
