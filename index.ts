import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

class Quiz {
  private questions: Question[];
  private currentQuestionIndex: number;
  private score: number;

  constructor(questions: Question[]) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  start() {
    console.log(chalk.yellow('Welcome to the Quiz Game!\n'));

    this.askQuestion();
  }

  askQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      const question = this.questions[this.currentQuestionIndex];
      console.log(chalk.blue(`Question ${this.currentQuestionIndex + 1}: ${question.question}`));
      question.options.forEach((option, index) => {
        console.log(chalk.green(`${index + 1}. ${option}`));
      });

      rl.question(chalk.cyan('Enter the number of your answer: '), (answer) => {
        const selectedOption = question.options[parseInt(answer) - 1];
        if (selectedOption === question.correctAnswer) {
          console.log(chalk.green('Correct!\n'));
          this.score++;
        } else {
          console.log(chalk.red(`Incorrect. The correct answer is: ${question.correctAnswer}\n`));
        }

        this.currentQuestionIndex++;
        this.askQuestion();
      });
    } else {
      this.endGame();
    }
  }

  endGame() {
    console.log(chalk.yellow(`Quiz completed! Your score: ${this.score} out of ${this.questions.length}`));
    rl.close();
  }
}

// Define your quiz questions here
const questions: Question[] = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter'],
    correctAnswer: 'Mars',
  },
  {
    question: 'What is the largest mammal in the world?',
    options: ['Elephant', 'Blue Whale', 'Giraffe'],
    correctAnswer: 'Blue Whale',
  },
];

const quiz = new Quiz(questions);
quiz.start();
