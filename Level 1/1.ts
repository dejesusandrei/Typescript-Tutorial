// lesson 1: TypeScript Basics & Type Inference

// Beginner:
const username: string = "Andrei";
const age: number = 19;
const isStudent: boolean = true;

// This is valid TypeScript.
// But notice that TypeScript already knows the types from the values.
// So in production, we'd usually write:

const username1 = "Andrei";
const age1 = 20;
const isStudent1 = true;

// Lesson 2: Where Explicit Types Actually Matter

// Javascipt
// function getFullName(firstName, lastName) {
//     return `${firstName} ${lastName}`;
// }

function getFullName(firstName: string, lastName:string): string{
	return `${firstName} ${lastName}`
}

// Lesson 3: Industry Example — User

const user1 = {
  uid: "user_001",
  firstName: "Andrei",
  lastName: "De Jesus",
  email: "andrei@example.com",
  isOnline: true,
};

// Instead

export type User = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  isOnline: boolean;
};

const user: User = {
	uid: "user_001",
  firstName: "Andrei",
  lastName: "De Jesus",
  email: "andrei@example.com",
  isOnline: true,
}

// Lesson 4: Industry Example — Function + User

function getDisplayName(user: User): string{
  return `${user.firstName} ${user.lastName}`
}

function getUserStatus(user: User): string{
  return user.isOnline ? "Online" : 'Offline';
}

function isUserOnline(user: User): boolean{
  return user.isOnline;
}

// Lesson 5: Industry Example — Chat Message

type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
  isRead: boolean;
};

const message: Message = {
  id: "msg_001",
  senderId: "user_001",
  text: "dadaddhfhgadgadgfigfhaigaighiahgaghgageaigrhragrg",
  createdAt: Date.now(),
  isRead: false,
};

function getMessagePreview(message: Message){
  return message.text.length > 30 ? 
    `${message.text.slice(0,30)}...` :
    message.text;
}

console.log(getMessagePreview(message));

const userList: User[] = [user];

// return a users object
function searchUsers(users: User[], searchTerm: string) {
  const search = searchTerm.trim().toLowerCase();
  return users.filter((user) =>{
    const fullName = getDisplayName(user).toLowerCase();
    return fullName.includes(search);
  });
}

// return a string name
function searchUserName(users: User[], searchTerm: string){
  const search = searchTerm.trim().toLowerCase();
  return users.filter((user) =>{
    const fullName = getDisplayName(user).toLowerCase();
    return fullName.includes(search);
  }).map(user => getDisplayName(user))
}

console.log(searchUsers(userList, "andrei"));
console.log(searchUserName(userList, "andrei"));


// Lesson 9: Industry Example — State

// returns User or Null
function getCurrentUser(users: User[], uid: string): User | null {
  return users.find(u => u.uid === uid) || null;
}
// returns User or Null
const currUser: User | null = getCurrentUser(userList, "user_001");


// Lesson 10: Avoid any

// Bad practices
const exUser: any = { firstName: "Andrei" };
// 🚨 NO TypeScript Error! (But it prints 'undefined' at runtime)
// console.log(user.firstNme); 
// 🚨 NO TypeScript Error! (Prank/nonsense properties allowed)
// console.log(user.randomProperty); 
// 💥 CRASH AT RUNTIME! 
// TypeScript won't stop you from doing this, but your app crashes when a user opens it:
// user.deleteAccount(); 
// Uncaught TypeError: user.deleteAccount is not a function

// const exUSer: User = { firstName: "Andrei" };
// ❌ TypeScript catches typos instantly while you type!
// console.log(user.firstNme); 
// Error: Property 'firstNme' does not exist on type 'User'. Did you mean 'firstName'?
// ❌ TypeScript prevents you from accessing things that aren't real!
// console.log(user.bankAccountBalance); 
// Error: Property 'bankAccountBalance' does not exist on type 'User'.

