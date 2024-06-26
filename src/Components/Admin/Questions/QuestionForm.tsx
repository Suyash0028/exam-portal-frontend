import React, { useState, useEffect } from 'react';
import { Question } from './Questions';
import { Button } from 'react-bootstrap';

interface QuestionFormProps {
  questionId: string | null;
  closeForm: () => void;
  refreshQuestions: (question: Question) => void;
  onEdit: (id: string, question: Question) => void; // Added onEdit function
  questions: Question[]; // Added questions array
}

const QuestionForm: React.FC<QuestionFormProps> = ({ questionId, closeForm, refreshQuestions, onEdit, questions }) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (questionId) {
      const fetchedQuestion = questions.find(question => question._id === questionId);
      if (fetchedQuestion) {
        setQuestionText(fetchedQuestion.questionText);
        setOptions(fetchedQuestion.options);
        setCorrectAnswer(fetchedQuestion.correctAnswer);
        setDescription(fetchedQuestion.description);
      }
    }
  }, [questionId, questions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'questionText':
        setQuestionText(value);
        break;
      case 'options':
        setOptions(value.split(',').map(option => option.trim()));
        break;
      case 'correctAnswer':
        setCorrectAnswer(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newQuestion: Question = {
        questionText,
        options,
        correctAnswer,
        description,
      };

      if (questionId) {
        onEdit(questionId, newQuestion); // Call onEdit function for editing
      } else {
        refreshQuestions(newQuestion); // Call refreshQuestions for adding
      }

      closeForm();
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <div className="container">
      <h2 className='mt-2'>{questionId ? 'Edit Question' : 'Add Question'}</h2>
      <form onSubmit={handleSubmit} className="custom-form mt-2">
        <div className="form-group">
          <label htmlFor="questionText">Question Text:</label>
          <input
            type="text"
            className="form-control"
            id="questionText"
            name="questionText"
            value={questionText}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="options">Options (comma-separated):</label>
          <input
            type="text"
            className="form-control"
            id="options"
            name="options"
            value={options.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correctAnswer">Correct Answer:</label>
          <input
            type="text"
            className="form-control"
            id="correctAnswer"
            name="correctAnswer"
            value={correctAnswer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={3}
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <Button variant="primary" type="submit">
          {questionId ? 'Save Changes' : 'Add Question'}
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="danger" onClick={closeForm} className="ml-2">
          Close Form
        </Button>
      </form>
    </div>
  );
};

export default QuestionForm;
