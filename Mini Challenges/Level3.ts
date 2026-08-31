type Weapon = {
	id: number;
	name: string;
	damage: number;
};

type Potion = {
	id: number;
	name: string;
	healing: number;
};

const sword: Weapon ={
	id: 1,
	name: "Excalibur", 
	damage: 100
}

const potion: Potion ={
	id: 2, 
	name: "Health Potion", 
	healing: 50,
}

function getItem<T>(item: T): T{
	return item;
}

const weapons: Weapon[] = [
	{
		id: 1,
		name: "Excalibur",
		damage: 100
	},
	{
		id: 2,
		name: "Iron Sword",
		damage: 50
	}
];

const potions: Potion[] = [
	{
		id: 1,
		name: "Health Potion",
		healing: 50
	},
	{
		id: 2,
		name: "Mana Potion",
		healing: 30
	}
];

function getItems<T>(item: T[]): T[]{
	return item;
}

function getFirstItem<T>(item: T[]): T {
	return item[0];
}

function createResponse<T>(data: T) {
	return {
		success: true,
		data: data
	};
}

console.log(createResponse(weapons));
console.log(createResponse(potions));

// console.log(getItem(sword));
// console.log(getItem(potion));
// console.log(getItems(potions));
// console.log(getItems(weapons));
// console.log(getFirstItem(weapons));
// console.log(getFirstItem(weapons));
