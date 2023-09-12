import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function waitForPlayerInput(prompt: string): Promise<string> {
  return new Promise<string>((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

class AdventureGame {
  private riddles: { question: string; options: string[]; correctAnswer: string }[] = [
    {
      question: "I'm tall when I'm young, and short when I'm old. What am I?",
      options: ["Candle", "Tree", "Person"],
      correctAnswer: "Candle",
    },
    {
      question: "I'm always hungry, I must always be fed. The finger I touch will soon turn red. What am I?",
      options: ["Fire", "Vampire", "Dragon"],
      correctAnswer: "Fire",
    },
    {
      question: "What has keys but can't open locks?",
      options: ["Keyboard", "Treasure Chest", "Map"],
      correctAnswer: "Keyboard",
    },
  ];

  private currentRiddleIndex: number = 0;
  private correctAnswers: number = 0;

  constructor() {}

  async play() {
    console.log(chalk.bold("\nWelcome to the Riddle Adventure Game!"));

    while (this.currentRiddleIndex < this.riddles.length) {
      this.displayRiddle();

      const playerAnswer = await waitForPlayerInput("Your answer: ");
      if (this.checkAnswer(playerAnswer)) {
        console.log(chalk.green("Correct! Proceed to the next riddle."));
        this.currentRiddleIndex++;
        this.correctAnswers++;
      } else {
        console.log(chalk.red("Incorrect. Better luck next time!"));
        rl.close();
        return;
      }
    }

    console.log(chalk.bgMagenta("\nCongratulations! You found the treasure."));
    rl.close();
  }

  displayRiddle() {
    const riddle = this.riddles[this.currentRiddleIndex];
    console.log(`\nRiddle ${this.currentRiddleIndex + 1}:`);
    console.log(riddle.question);
    console.log("Options: " + riddle.options.join(', '));
  }

  checkAnswer(playerAnswer: string): boolean {
    const riddle = this.riddles[this.currentRiddleIndex];
    return playerAnswer.toLowerCase() === riddle.correctAnswer.toLowerCase();
  }
}

const game = new AdventureGame();
game.play();
