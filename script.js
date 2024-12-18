let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["Dague"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name: "Dague",
        power: 10
    },

    {
        name: "Double dague",
        power: 30
    },

    {
        name: "Épée en fer",
        power: 50
    },

    {
        name: "Épée en argent",
        power: 100
    }
];

const monsters = [
    {
        name: "Slime",
        level: 2,
        health : 15
    },

    {
        name: "Bête sauvage",
        level: 8,
        health : 60
    },

    {
        name: "Dragon",
        level: 20,
        health : 300
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["Aller au magasin", "Explorer des grottes", "Combattre le dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "Vous êtes sur la place de la ville. Vous voyez un panneau qui indique \"Magasin\". \n Vous pouvez aussi explorer les grottes situées à l'extérieur de la ville.\n"
    },

    {
        name: "store",
        "button text": ["Augmenter la Santé de 10 points(10 Pièces d'or)", "Acheter une arme (30 Pièces d'or)", "Allez sur la place de la ville"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Vous entrez dans la boutique.\n"
    },
    {
        name: "cave",
        "button text": ["Combattre un Slime", "Combattre une Bête sauvage", "Allez sur la place de la ville"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "Vous explorez une grotte. Vous tombez soudain sur un monstre !\n"
    },
    {
        name: "fight",
        "button text": ["Attaquer", "Esquiver", "Fuir"],
        "button functions": [attack, dodge, goTown],
        text: "Vous engagez un combat contre un monstre.\n"
    },
    {
        name: "kill monster",
        "button text": ["Allez sur la place de la ville", "Allez sur la place de la ville", "Allez sur la place de la ville"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'Le monstre crie "Arg!" en s\'écroulant. Vous gagnez des points d\'expérience et trouvez de l\'or.\n'
    },
    {
        name: "lose",
        "button text": ["REJOUER ?", "REJOUER ?", "REJOUER ?"],
        "button functions": [restart, restart, restart],
        text: "Vous êtes mort. &#x2620;"
    },
    {
        name: "win",
        "button text": ["REJOUER ?", "REJOUER ?", "REJOUER ?"],
        "button functions": [restart, restart, restart],
        text: "Vous avez battu le dragon ! VOUS REMPORTEZ LA PARTIE ! &#x1F389;"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Allez sur la place de la ville?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "Vous trouvez un jeu secret. Choisissez un numéro ci-dessus. Dix numéros seront choisis au hasard entre 0 et 10. Si le numéro que vous choisissez correspond à l'un des nombres aléatoires, vous gagnez !\n"
    }
];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = 'none';
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
}


function goTown() {
  update(locations[0]);
}

function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}


function buyHealth(){
    if (gold>=10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "Pas assez de Pièces d'or.\n";
    }  
}
function buyWeapon(){
    if (currentWeaponIndex < weapons.length-1){
        if (gold>=30) {
            gold -= 30;
            currentWeaponIndex++;
            goldText.innerText = gold;
            let newWeapon;
            newWeapon = weapons[currentWeaponIndex].name;
            text.innerText = "Vous avez acquis une nouvelle arme : " + newWeapon + ".\n";
            inventory.push(newWeapon);
            text.innerText += "Dans votre inventaire vous avez : " + inventory + "\n";
        } else {
            text.innerText = "Pas assez de Pièces d'or.\n";
        }
    } else {
        text.innerText = "Vous possédez déjà l’arme la plus puissante !\n";
        button2.innerText = "Vendre votre plus ancienne arme pour 15 Pièces d'or";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon() {
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "Vous avez vendu l'arme suivante : " + currentWeapon + ".\n";
        text.innerText += "Dans votre inventaire vous avez : " + inventory + "\n";
    } else {
        text.innerText = "Ne vendez pas votre seule arme !\n";
    }
}


function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'flex';
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function fightSlime(){
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function attack(){
    text.innerText = monsters[fighting].name + " attaque !\n";
    text.innerText += " Vous l'attaquez avec votre " + weapons[currentWeaponIndex].name + ".\n";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if(isMonsterHit()){
        monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
    } else{
        text.innerText += "Le monstre esquive.\n"
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0){
        lose();
    } else if (monsterHealth <= 0){
        if(fighting === 2){
            winGame()
        } else {
            defeatMonster();
        }
    }

    if (Math.random() <= .1 && inventory.length !== 1){
        text.innerText += "L'arme " + inventory.pop() + " s'est brisée\n";
        currentWeaponIndex--;
    }
}

function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}
function isMonsterHit (){
    return Math.random() > .2 || health < 20;
}

function dodge(){
    text.innerText = "Vous esquivez l'attaque du monstre.\n";
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose(){
    update(locations[5]);
}
function winGame(){
    update(locations[6]);
}
function easterEgg(){
    update(locations[7]);
}
function pick(guess){
    const numbers = [];
    while(numbers.length<10){
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "Vous avez choisi " + guess + ". Voici les nombres aléatoires :\n";
    for(let i=0; i<10; i++){
        text.innerText += numbers[i] + "\n";
    }
    if(numbers.includes(guess)){
        text.innerText += "Correct ! Vous gagnez 20 Pièces d'or !";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Incorrect ! Vous perdez 10 points de santé !";
        health -= 10;
        healthText.innerText = health;
        if(health <= 0){
            lose();
        }
    }
}
function pickTwo(){
    pick(2);
}
function pickEight(){
    pick(8);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeaponIndex = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
