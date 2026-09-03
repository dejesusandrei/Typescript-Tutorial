type EventName1 = "user:created";
type EventNameUnion =
  | "user:created"
  | "user:updated"
  | "user:deleted";


type Entity =
  | "user"
  | "task"
  | "message";

type Action =
  | "created"
  | "updated"
  | "deleted";

type EventName = `${Entity}:${Action}`;

type ResourceRoute<T extends string> = `/${T}/${string}`; 

type UserRoute = ResourceRoute<"users">;
type ProductRoute = ResourceRoute<"products">;

const userId = '1234'
const user1: UserRoute = `/users/${userId}`;
const productId = 'p1234'
const product1: ProductRoute = `/products/${userId}`;

// console.log(user1);
// console.log(product1);


type Resource =
  | "users"
  | "tasks"
  | "products";
type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE";
type EndPoint = `${HttpMethod} /${Resource}`;

const endpoint: EndPoint = "GET /users";
const endpoint2: EndPoint = "POST /users";

type Role =
  | "user"
  | "admin";

type Actions =
  | "read"
  | "write"
  | "delete";
type Permission = `${Role}:${Action}`;

const permission: Permission = "admin:deleted";
const permission1: Permission = "user:deleted";