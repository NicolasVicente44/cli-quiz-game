#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgGreen("hi mom"));

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a javascript millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
     ${chalk.bgBlue("HOW TO PLAY")}
     I am a process on your computer.
     If you get any question wrong I will be ${chalk.bgRed("killed")}
     So get all the questions right please.....
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Javascript was created in 10 days then released on\n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17th, 1996",
    ],
  });

  return handleAnswer(answers.question_1 == "Dec 4th, 1995");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Which of the following is a JavaScript data type?",
    choices: ["Boolean", "Float", "String", "Integer"],
  });

  return handleAnswer(answers.question_2 == "Boolean");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "What does CSS stand for?",
    choices: [
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
    ],
  });

  return handleAnswer(answers.question_3 == "Cascading Style Sheets");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message:
      "Which method is used to add an element to the end of an array in JavaScript?",
    choices: ["append()", "push()", "addElement()", "insert()"],
  });

  return handleAnswer(answers.question_4 == "push()");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "What is the result of 10 + '5' in JavaScript?",
    choices: ["15", "105", "1050", "Error"],
  });

  return handleAnswer(answers.question_5 == "105");
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_6",
    type: "list",
    message: "Which HTML tag is used to create a hyperlink?",
    choices: ["<link>", "<a>", "<href>", "<hyper>"],
  });

  return handleAnswer(answers.question_6 == "<a>");
}

async function question7() {
  const answers = await inquirer.prompt({
    name: "question_7",
    type: "list",
    message: "Which operator is used for exponentiation in JavaScript?",
    choices: ["^", "**", "^^", "//"],
  });

  return handleAnswer(answers.question_7 == "**");
}

async function question8() {
  const answers = await inquirer.prompt({
    name: "question_8",
    type: "list",
    message: "What is the capital of Japan?",
    choices: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
  });

  return handleAnswer(answers.question_8 == "Tokyo");
}

async function question9() {
  const answers = await inquirer.prompt({
    name: "question_9",
    type: "list",
    message:
      "Which programming language is known as the 'mother of all languages'?",
    choices: ["Python", "Java", "C++", "Assembly"],
  });

  return handleAnswer(answers.question_9 == "Assembly");
}

async function question10() {
  const answers = await inquirer.prompt({
    name: "question_10",
    type: "list",
    message: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Saturn", "Earth"],
  });

  return handleAnswer(answers.question_10 == "Jupiter");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...");
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}.` });
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats, ${playerName} !\n $ 1, 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

const questionFunctions = [
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9,
  question10,
];

//fisher yates shuffle algo
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

(async () => {
  await welcome();
  await askName();

  shuffle(questionFunctions);

  for (const questionFunction of questionFunctions) {
    await questionFunction();
  }

  await winner();
})();
