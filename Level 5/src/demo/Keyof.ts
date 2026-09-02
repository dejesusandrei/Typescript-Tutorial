type User = {
  id: string;
  name: string;
  email: string;
};

type UserKey = keyof User;

const user: User ={
  id: "001",
  name: "Andrei",
  email: "email@exmaple.com"
}

function getProperty(user: User, key: UserKey) {
  return user[key];
}

function getProperty1<T, K extends keyof T>(object: T,key: K) {
  return object[key];
}

function getProperty2<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

console.log(getProperty(user, "id"));
console.log(getProperty1(user, "name"));
console.log(getProperty2(user, "email"));