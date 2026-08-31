// Challenge 1:
type Product = {
	id: number;
	name: string;
	price: number;
	inStock: boolean;
};

const product: Product = {
	id: 101,
	name: "Wireless Mouse",
	price: 799,
	inStock: false
};

function getProductInfo(product: Product){
	return product.inStock ? `${product.name} costs ₱${product.price} and is available.`:
	`${product.name} costs ₱${product.price} and is currently out of stock.`
}

// Challenge 2:
type Student ={
	id: number;
	name: string;
	grade: number;
	passed: boolean;
};

const student: Student = {
	id: 102,
	name: "Juan Dela Cruz",
	grade: 74,
	passed: false
}

function getStudentResult(student: Student): string {	
	return student.grade >= 75 && student.passed ? `${student.name} passed with a grade of ${student.grade}` :
	`${student.name} failed with a grade of ${student.grade}`
}

// Challenge 3:
type Account = {
	accountNumber: string;
	ownerName: string;
	balance: number;
};

const account: Account = {
	accountNumber: "B101",
	ownerName: "Andrei",
	balance: 5000
};

function deposit(account: Account, amount: number): number{
	return account.balance += amount;
}

function withdraw(account: Account, amount: number): string{
	return account.balance >= amount ? `New balance: ${account.balance -= amount}` :
	`Insufficient balance.`;
}

// Challenge 4:
type UserProfile = {
	id: number;
	username: string;
	email: string;
	age?: number;
}

const user: UserProfile = {
	id: 201,
	username: "Andrei",
	email: "example@gmail.com",
	age: 19
}

const user2: UserProfile = {
	id: 2,
	username: "joshua",
	email: "joshua@email.com"
};

function getProfileSummary(user: UserProfile): string{	
	if(user.age){
		return `Username: ${user.username}\nEmail: ${user.email}\nAge: ${user.age}`;
	}else{
		return `Username: ${user.username}\nEmail: ${user.email}\nAge: Not provided`;
	}
}

// Challenge 5:
type OrderStatus = 
	| "pending"
	| "processing"
	| "shipped"
	| "delivered";

type Order = {
	orderId: number;
	customerName: string;
	status: OrderStatus;
};

function getOrderMessage(order: Order): string {
	switch(order.status) {
		case "pending":
			return `Order ${order.orderId} is waiting for confirmation.`;
		case "processing":
			return `Order ${order.orderId} is currently being processed.`;
		case "shipped":
			return `Order ${order.orderId} has been shipped.`;
		case "delivered":
			return `Order ${order.orderId} has been delivered successfully.`;
	}
}

// Challenge 6:
type CartItem = {
	productName: string;
	price: number;
	quantity: number;
};

const cart: CartItem[] = [
	{
		productName: "Keyboard",
		price: 1500,
		quantity: 2
	},
	{
		productName: "Mouse",
		price: 800,
		quantity: 1
	}
];

function calculateTotal(cart: CartItem[]): number {
	return cart.reduce((acc, value) => {
		return acc + (value.quantity * value.price);
	}, 0);
}

function getSummaryCart(cart: CartItem[]): string{
	const items = cart
		.map(item => `${item.quantity} ${item.productName}`)
		.join(" and ");

	return `Your cart contains ${items}\nTotal: ${calculateTotal(cart)}`;
}

console.log(getSummaryCart(cart));