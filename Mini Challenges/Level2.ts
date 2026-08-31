type CharacterClass = 
	| "warrior"
	| "mage"
	| "archer";

	type CharacterStatus =
	| "active"
	| "defeated"
	| "offline";

type Character = {
	id: number;
	name: string;
	level: number;
	class: CharacterClass;
	status: CharacterStatus;
	health: number;
	nickname?: string;
};

const characters: Character[] = [
  {
    id: 1,
    name: "Arthur",
    level: 10,
    class: "warrior",
    status: "active",
    health: 100,
    nickname: "Artie"
  },
  {
    id: 2,
    name: "Merlin",
    level: 12,
    class: "mage",
    status: "offline",
    health: 65 // WALANG nickname (dahil optional)
  },
  {
    id: 3,
    name: "Legolas",
    level: 21,
    class: "archer",
    status: "active",
    health: 40,
    nickname: "Lego"
  },
  {
    id: 4,
    name: "Florence",
    level: 20,
    class: "warrior",
    status: "defeated",
    health: 0
  }
];

function getCharacterStatus(character: Character): string {
	switch(character.status) {
		case "active":
			return `${character.name} is currently ${character.status} with ${character.health} HP`;
		case "defeated":
			return `${character.name} has been ${character.status}`;
		case "offline":
			return `${character.name} is currently ${character.status}`;
	}
}

function getCharacterInfo(character: Character): string{
	return character.nickname ? `${character.name} - ${character.class} - Level ${character.level}\nNickname: ${character.nickname}` :
	`${character.name} - ${character.class} - Level ${character.level}\nNickname: None`
}

function getActiveCharacters(character: Character[]): Character[] {
	return character.filter((character) =>{
		return character.status === 'active';
	});
}

function getHighLevelCharacters(character: Character[]): Character[] {
	return character.filter(character => {
		return character.level >= 20;
	});
}

function getTotalHealth(character: Character[]): number {
	return character.reduce((acc, value) => {
		return acc + value.health;
	}, 0);
}

function generateGameReport(character: Character[]): string {
	return `=== GAME REPORT === \n\nTotal Characters: ${character.length}\nActive Characters: ${getActiveCharacters(character).length}\nHigh Level Character: ${getHighLevelCharacters(character).length}\nTotal Health: ${getTotalHealth(character)}`
}


console.log(generateGameReport(characters));
// console.log(getActiveCharacters(characters));
// console.log(getHighLevelCharacters(characters));
// console.log(getTotalHealth(characters));
// console.log(getCharacterStatus(characters));
// console.log(getCharacterInfo(characters));
