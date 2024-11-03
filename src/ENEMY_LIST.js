import TILE_MODIFIERS from './TILE_MODIFIERS.js';
import Tile from './TileData.js';

const ENEMY_LIST = {
  bosses: [
    {
      name: "The Red Baron",
      tiles: [
        new Tile("R"),
        new Tile("E"),
        new Tile("D"),
        new Tile("B"),
        new Tile("A"),
        new Tile("R"),
        new Tile("O"),
        new Tile("N"),
      ],
      hp: 400,
      maxHP: 400,
      currentAttackDelay: 4,
      totalAttackDelay: 4,
      damage: 5,
      abilityDescription: "Only vulnerable to words with 3 or more vowels.",
      enemyImgSrc: "",
      damageModifier: function(word, damage) {
        let vowelString = (word.match(/[aeiou]/gi));
        let vowelCount = vowelString === null ? 0 : vowelString.length;
        if(vowelCount >= 3){
          return damage;
        }else{
          return 0;
        }
      }
    },
    {
      name: "The King in Yellow",
      tiles: [
        new Tile("K"),
        new Tile("I"),
        new Tile("N"),
        new Tile("G"),
        new Tile("I"),
        new Tile("N"),
        new Tile("Y"),
        new Tile("E"),
        new Tile("L"),
        new Tile("L"),
        new Tile("O"),
        new Tile("W"),
      ],
      hp: 300,
      maxHP: 300,
      currentAttackDelay: 4,
      totalAttackDelay: 4,
      damage: 5,
      abilityDescription: "Immune to words with the letter E.",
      enemyImgSrc: "",
      damageModifier: function(word, damage) {
        if(word.includes("e")){
          return 0;
        }
        return damage;
      }
    },
    {
      name: "The Green Knight",
      tiles: [
        new Tile("G"),
        new Tile("R"),
        new Tile("E"),
        new Tile("E"),
        new Tile("N"),
        new Tile("K"),
        new Tile("N"),
        new Tile("I"),
        new Tile("G"),
        new Tile("H"),
        new Tile("T"),
      ],
      hp: 280,
      maxHP: 280,
      currentAttackDelay: 4,
      totalAttackDelay: 4,
      damage: 5,
      abilityDescription: "Only vulnerable to words that are 5 letters long.",
      enemyImgSrc: "",
      damageModifier: function(word, damage) {
        if(word.length !== 5){
          return 0;
        }
        return damage;
      }
    },
    {
      name: "The Purple Puma",
      tiles: [
        new Tile("P"),
        new Tile("U"),
        new Tile("R"),
        new Tile("P"),
        new Tile("L"),
        new Tile("E"),
        new Tile("P"),
        new Tile("U"),
        new Tile("M"),
        new Tile("A"),
      ],
      hp: 350,
      maxHP: 350,
      currentAttackDelay: 4,
      totalAttackDelay: 4,
      damage: 5,
      abilityDescription: "Only vulnerable to words that start with a vowel (AEIOU).",
      enemyImgSrc: "",
      damageModifier: function(word, damage) {
        if("AEIOU".includes(word[0].toUpperCase())){
          return damage;
        }
        return 0;
      }
    },
  ],
  elites: [
    {
      name: "Quasimodo",
      tiles: [
        new Tile("Q", 1, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("U", 1, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("A", 3),
        new Tile("S", 3, TILE_MODIFIERS.BOMB),
        new Tile("I", 3),
        new Tile("M", 3, TILE_MODIFIERS.BOMB),
        new Tile("O", 3),
        new Tile("D", 3),
        new Tile("O", 3),
      ],
      hp: 750,
      currentAttackDelay: 3,
      totalAttackDelay: 3,
      damage: 2,
      abilityDescription: "Extra tough!",
      enemyImgSrc: ""
    },
    {
      name: "Strengths",
      tiles: [
        new Tile("S", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("T", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("R", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("E", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("N", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("G", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("T", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("H", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("S", 5, TILE_MODIFIERS.EXTRA_DAMAGE),
      ],
      hp: 450,
      currentAttackDelay: 3,
      totalAttackDelay: 3,
      damage: 3,
      abilityDescription: "Each time you play a vowel, this enemy is dealt an extra 10 damage.",
      enemyImgSrc: "",
      damageModifier: function(word, damage) {
        let vowelString = (word.match(/[aeiou]/gi));
        let vowelCount = vowelString === null ? 0 : vowelString.length;
        return damage += 10 * vowelCount;
      }
    },
    {
      name: "Bookkeeper",
      tiles: [
        new Tile("B", 3),
        new Tile("O", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("O", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("K", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("K", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("E", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("E", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("P", 3),
        new Tile("E", 3),
        new Tile("R", 3),
      ],
      hp: 550,
      currentAttackDelay: 3,
      totalAttackDelay: 3,
      damage: 3,
      abilityDescription: "Takes double damage from double-lettered words (e.g. book)",
      enemyImgSrc: "",
      damageModifier: function(word, damage) {
        let regex = (word.match(/(.)\1/gi));
        if(regex !== null){
          return damage * 2;
        }
        return damage;
      }
    },
    {
      name: "Sarsaparilla",
      tiles: [
        new Tile("S", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("A", 2, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("R", 2),
        new Tile("S", 2, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("A", 2, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("P", 2),
        new Tile("A", 2),
        new Tile("R", 2),
        new Tile("I", 2),
        new Tile("L", 2, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("L", 2, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("A", 2),
      ],
      hp: 300,
      currentAttackDelay: 3,
      totalAttackDelay: 3,
      damage: 3,
      abilityDescription: "Immune to words with S or A.",
      enemyImgSrc: "",
      damageModifier: function(word, damage) {
        if(word.includes("s") || word.includes("a")){
          return 0;
        }
        return damage;
      }
    }
  ],
  enemies: [
    {
      name: "Slimey",
      tiles: [
        new Tile("S", 4),
        new Tile("L", 4),
        new Tile("I", 4),
        new Tile("M", 4, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("E", 4),
        new Tile("Y", 4),
      ],
      hp: 100,
      currentAttackDelay: 3,
      totalAttackDelay: 3,
      damage: 1,
      enemyImgSrc: ""
    },
    {
      name: "Bat",
      tiles: [
        new Tile("B", 1, TILE_MODIFIERS.NONE, true),
        new Tile("A", 5),
        new Tile("T", 5),
      ],
      hp: 80,
      currentAttackDelay: 1,
      totalAttackDelay: 1,
      damage: 3,
      enemyImgSrc: ""
    },
    {
      name: "Oozer",
      tiles: [
        new Tile("O", 2, TILE_MODIFIERS.WEAK, true),
        new Tile("O", 3),
        new Tile("Z", 4, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("E", 3),
        new Tile("R", 2),
      ],
      hp: 150,
      currentAttackDelay: 3,
      totalAttackDelay: 3,
      damage: 3,
      enemyImgSrc: ""
    },
    {
      name: "Thief",
      tiles: [
        new Tile("T", 1, TILE_MODIFIERS.BOMB),
        new Tile("H", 1, TILE_MODIFIERS.BOMB),
        new Tile("I", 1, TILE_MODIFIERS.BOMB),
        new Tile("E", 1, TILE_MODIFIERS.BOMB),
        new Tile("F", 1, TILE_MODIFIERS.BOMB),
      ],
      hp: 60,
      currentAttackDelay: 2,
      totalAttackDelay: 2,
      damage: 1,
      enemyImgSrc: ""
    },
    {
      name: "Quack",
      tiles: [
        new Tile("Q", 2, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("U", 2, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("A", 2, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("C", 2, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("K", 2, TILE_MODIFIERS.EXTRA_DAMAGE),
      ],
      hp: 200,
      currentAttackDelay: 3,
      totalAttackDelay: 3,
      damage: 4,
      enemyImgSrc: ""
    },
    {
      name: "Vagabond",
      tiles: [
        new Tile("V", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("A", 1, TILE_MODIFIERS.WEAK),
        new Tile("G", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("A", 1, TILE_MODIFIERS.WEAK),
        new Tile("B", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("O", 1, TILE_MODIFIERS.WEAK),
        new Tile("N", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("D", 1, TILE_MODIFIERS.WEAK),
      ],
      hp: 150,
      currentAttackDelay: 2,
      totalAttackDelay: 2,
      damage: 2,
      enemyImgSrc: ""
    },
    {
      name: "Lawyer",
      tiles: [
        new Tile("L", 3),
        new Tile("A", 3),
        new Tile("W", 3),
        new Tile("Y", 5, TILE_MODIFIERS.NONE, true),
        new Tile("E", 3),
        new Tile("R", 3),
      ],
      hp: 150,
      currentAttackDelay: 2,
      totalAttackDelay: 2,
      damage: 3,
      enemyImgSrc: ""
    },
    {
      name: "despair",
      tiles: [
        new Tile("D", 4),
        new Tile("E", 4, TILE_MODIFIERS.WEAK, true),
        new Tile("S", 4, TILE_MODIFIERS.WEAK, true),
        new Tile("P", 4),
        new Tile("A", 4),
        new Tile("I", 4),
        new Tile("R", 4),
      ],
      hp: 175,
      currentAttackDelay: 1,
      totalAttackDelay: 1,
      damage: 1,
      enemyImgSrc: ""
    },
    {
      name: "Lifeguard",
      tiles: [
        new Tile("L", 1, TILE_MODIFIERS.NONE, true),
        new Tile("I", 1, TILE_MODIFIERS.NONE, true),
        new Tile("F", 1, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("E", 3),
        new Tile("G", 3),
        new Tile("U", 3),
        new Tile("A", 3),
        new Tile("R", 3),
        new Tile("D", 3),
      ],
      hp: 200,
      currentAttackDelay: 3,
      totalAttackDelay: 3,
      damage: 3,
      enemyImgSrc: ""
    },
    {
      name: "Riptide",
      tiles: [
        new Tile("R", 1, TILE_MODIFIERS.NONE, true),
        new Tile("I", 1, TILE_MODIFIERS.NONE, true),
        new Tile("P", 3),
        new Tile("T", 3),
        new Tile("I", 3),
        new Tile("D", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("E", 3),
      ],
      hp: 100,
      currentAttackDelay: 1,
      totalAttackDelay: 1,
      damage: 2,
      enemyImgSrc: ""
    },
    {
      name: "SurfBro",
      tiles: [
        new Tile("S", 3),
        new Tile("U", 1, TILE_MODIFIERS.NONE, true),
        new Tile("R", 3),
        new Tile("F", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("B", 3),
        new Tile("R", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("O", 3),
      ],
      hp: 100,
      currentAttackDelay: 1,
      totalAttackDelay: 1,
      damage: 2,
      enemyImgSrc: ""
    },
    {
      name: "Gull",
      tiles: [
        new Tile("G", 3, TILE_MODIFIERS.BOMB),
        new Tile("U", 3, TILE_MODIFIERS.BOMB),
        new Tile("L", 3, TILE_MODIFIERS.BOMB),
        new Tile("L", 3, TILE_MODIFIERS.BOMB),
      ],
      hp: 80,
      currentAttackDelay: 1,
      totalAttackDelay: 1,
      damage: 1,
      enemyImgSrc: ""
    },
    {
      name: "Tanner",
      tiles: [
        new Tile("T", 3),
        new Tile("A", 3),
        new Tile("N", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("N", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("E", 3),
        new Tile("R", 3),
      ],
      hp: 220,
      currentAttackDelay: 1,
      totalAttackDelay: 1,
      damage: 1,
      enemyImgSrc: ""
    },
    {
      name: "Crab",
      tiles: [
        new Tile("C", 3, TILE_MODIFIERS.NONE, true),
        new Tile("R", 3, TILE_MODIFIERS.WEAK),
        new Tile("A", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
        new Tile("B", 3, TILE_MODIFIERS.BOMB),
      ],
      hp: 90,
      currentAttackDelay: 1,
      totalAttackDelay: 1,
      damage: 1,
      enemyImgSrc: ""
    },
    {
      name: "Otter",
      tiles: [
        new Tile("O", 3, TILE_MODIFIERS.NONE, true),
        new Tile("T", 3),
        new Tile("T", 3),
        new Tile("E", 3),
        new Tile("R", 3),
      ],
      hp: 90,
      currentAttackDelay: 2,
      totalAttackDelay: 2,
      damage: 3,
      enemyImgSrc: ""
    },
    {
      name: "Hermit",
      tiles: [
        new Tile("H", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("E", 3),
        new Tile("R", 3),
        new Tile("M", 3),
        new Tile("I", 3),
        new Tile("T", 3, TILE_MODIFIERS.EXTRA_DAMAGE),
      ],
      hp: 200,
      currentAttackDelay: 2,
      totalAttackDelay: 2,
      damage: 3,
      enemyImgSrc: ""
    },
    {
      name: "Kelpman",
      tiles: [
        new Tile("K", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("E", 3),
        new Tile("L", 3),
        new Tile("P", 3),
        new Tile("M", 3),
        new Tile("A", 3),
        new Tile("N", 3),
      ],
      hp: 200,
      currentAttackDelay: 2,
      totalAttackDelay: 2,
      damage: 3,
      enemyImgSrc: ""
    },
    {
      name: "Hexer",
      tiles: [
        new Tile("H", 3),
        new Tile("E", 3),
        new Tile("X", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
        new Tile("E", 3),
        new Tile("R", 3),
      ],
      hp: 200,
      currentAttackDelay: 3,
      totalAttackDelay: 1,
      damage: 2,
      enemyImgSrc: ""
    },
  ]
};

export default ENEMY_LIST;