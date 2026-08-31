// Lesson 1: Generics
// Learn how to create reusable, type-safe functions and components.

export type User = {
  uid: string | number;
  firstName: string;
};

const userList: User[] = [
  { uid: "001", firstName: "Andrei" },
  { uid: 2, firstName: "Maria" }
];

function getFirst<T>(items: T[]): T{
	return items[0];
}

// automatically typed as string
// console.log(getFirst(userList));

// 1. Array containing both strings and numbers
const mixedList = ["Andrei", 100, "Maria", 200];

// gets the type of string | number
// console.log(getFirst(mixedList));

const firstItem = getFirst(mixedList);

// T can ONLY be string or number
function getFirstStringOrNumber<T extends string | number>(items: T[]): T {
  return items[0];
}
// getFirst([1, 2, 3]);       // ✅ Valid
// getFirst(["a", "b"]);      // ✅ Valid
// getFirst([true, false]);   // ❌ Type Error: 'boolean' is not allowed!


//? Lesson 2: Type Guards

// ❌ ERROR: .toUpperCase() doesn't exist on 'number'
// firstItem.toUpperCase(); 
// ✅ SAFE: Check the type first (Type Narrowing)
// if (typeof firstItem === "string") {
//   console.log(firstItem.toUpperCase()); // Safe to use string methods here!
// } else {
//   console.log(firstItem.toFixed(2));    // Safe to use number methods here!
// }

function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
// printValue(firstItem);


//? Lesson 3: Utility Types

// All fields become optional (uid?: string, firstName?: string, etc.)
const updateData: Partial<User> = {
  firstName: "Andrew" // ✅ Valid! You don't have to provide email, uid, or lastName.
};
// console.log(updateData.firstName);

// * REQUIRED
type RequiredOptionalUser = {
  uid: string;       // Was required -> stays required
  firstName: string; // Was optional -> NOW REQUIRED
  lastName: string;  // Was optional -> NOW REQUIRED
};

// Enforcing complete data before submission
// Required<OptionalUser> forces firstName and lastName to be provided
const strictUser: Required<RequiredOptionalUser> = {
  uid: "user_001",
  firstName: "Andrei",
  lastName: "De Jesus" // ❌ Omitting this causes a TypeScript Error!
};

// * Nakalagay ang parehong hinihingi ng Pick
const userFullName: Pick<User, 'firstName'> = {
  firstName: "Andrei"
};
// console.log(userFullName.firstName);

// * If you want to pass user data to a public profile or front-end component
// * you want to remove sensitive or unneeded fields like passwordHash and uid
type userOmit = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string; // Sensitive data!
};

// Removes "passwordHash" and "uid" from User
type PublicUserProfile = Omit<userOmit, "passwordHash" | "uid">;
const userProfile: PublicUserProfile = {
  firstName: "Andrei",
  lastName: "De Jesus",
  email: "andrei@example.com"
};

// * Once an object is typed with Readonly<T>, 
// * TypeScript prevents you from changing or reassigning any of its values after creation.
type readOnlyUser = {
  uid: string;
  name: string;
};

// All properties inside User become read-only:
const immutableUser: Readonly<readOnlyUser> = {
  uid: "user_001",
  name: "Andrei De Jesus"
};
// ✅ VALID: Reading properties works fine
// console.log(immutableUser.name); // Prints: "Andrei"
// ❌ ERROR: Attempting to modify a property is blocked by TypeScript!
// immutableUser.name = "Juan"; 
// Error: Cannot assign to 'name' because it is a read-only property.
// immutableUser.uid = "user_002"; 
// Error: Cannot assign to 'uid' because it is a read-only property.


// * Record<K, T> is a built-in TypeScript Utility Type 
// * used to construct an object type where keys are of type K and values are of type T.
// * K (Keys): Must be string, number, symbol, or a union of specific literal strings.
// * T (Values): Can be any data type (strings, numbers, objects, functions, etc.)
// Key: string (User ID), Value: string (Email address)
const userEmails: Record<string, string> = {
  "user_001": "andrei@example.com",
  "user_002": "maria@example.com"
};
// console.log(userEmails["user_001"]); // "andrei@example.com"

//? Lesson 5: Typeof

// Isang ordinaryong JavaScript object
const defaultUser = {
  id: 101,
  username: "andrei_dev",
  isAdmin: false
};
// Ginagamit ang typeof para makuha ang Type mula sa defaultUser:
type typeOfUser = typeof defaultUser;
/*
Ang naging resulta ng User type sa likod ng scenes:
type User = {
  id: number;
  username: string;
  isAdmin: boolean;
}
*/
// Pwede mo na siyang gamitin sa ibang variable:
const newUser: typeOfUser = {
  id: 102,
  username: "maria_code",
  isAdmin: true
};

//? Lesson 6: Indexed Access Types
type RegistrationForm = {
  username: string;
  age: number;
  isAgreedToTerms: boolean;
};
// Ginagamit ang RegistrationForm["age"] para makuha ang type nito (na 'number')
function validateAge(age: RegistrationForm["age"]){
	if(age < 18){
		return 'Minor pa';
	}
}
validateAge(20);// ✅ Gagana (dahil number)
// validateAge("twenty"); // ❌ Error! Dahil sinabi sa RegistrationForm na number dapat ang age.


//? Lesson 7: Generics With Constraints
// Generics (<T>) = Flexible (Tanggap kahit ano).
// Constraints (extends) = Nagpapakita ng minimum requirement para manatiling safe ang code habang flexible pa rin.
function getId <T extends {id: string | number}>(value: T): string | number{
	return value.id;
}
// ✅ Pasok! May 'id' na string, kahit may dagdag na 'name'
const user = { id: "usr_123", name: "Andrei" };
// console.log(getId(user)); 

// ✅ Pasok pa rin! May 'id' na string, kahit ibang object ito
const product = { id: 999, price: 500, title: "Shirt" };
// console.log(getId(product));


//? Lesson 8: Generic Interfaces & Types
// T represents the dynamic shape of the data payload
type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
type gUser = {
  id: number;
  name: string;
  email: string;
};
type Message = {
  id: string;
  text: string;
  timestamp: string;
};
// Data becomes User
type UserResponse = ApiResponse<User>;
// Data becomes Message
type MessageResponse = ApiResponse<Message>;
type UserResponseUnderTheHood = {
  data: {
    id: number;
    name: string;
    email: string;
  };
  success: boolean;
  message: string;
};


// Lesson 9: Discriminated Unions
type discriUser = { id: string; name: string };

type RequestState =
  | { status: "loading" }
  | { status: "success"; data: discriUser[] }
  | { status: "error"; error: string };

function renderUI(state: RequestState) {
  switch (state.status) {
    case "loading":
      return "Spinner loading...";
    case "success":
      return `Loaded ${state.data.length} users.`;
    case "error":
      return `Error occurred: ${state.error}`;
  }
}
// console.log(renderUI({ status: "loading" })); 
// Output: "Spinner loading..."
// console.log(renderUI({ 
//   status: "success", 
//   data: [{ id: "1", name: "Andrei" }] 
// }));

// ? Lesson 10: Async TypeScript

async function getUser(uid: string | number): Promise<User | null>{
	const res = await fetch(`/api/users/${uid}`);

	if (res.status === 404) {
    return null; // ✅ Valid dahil kasama ang null sa Promise type
  }

	const data: User = await res.json();
	return data;
}