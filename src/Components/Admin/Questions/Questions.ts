export interface Question {
  _id?: string; // Make _id optional
  questionText: string;
  options: string[];
  correctAnswer: string;
  description: string;
}