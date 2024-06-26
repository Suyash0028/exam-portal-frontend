import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import QuestionForm from './QuestionForm';
import { Question } from './Questions';
import RejectModalComponent from '../../RejectModalComponent';

interface QuestionListProps {
  questions: Question[];
  onDelete: (id: string) => void;
  onEdit: (id: string, question: Question) => void;
  onAdd: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onDelete, onEdit, onAdd }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState<string | null>(null);
  const [deleteQuestionId, setDeleteQuestionId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEditClick = (id: string) => {
    setEditQuestionId(id);
    setIsFormVisible(true);
  };

  const handleAddClick = () => {
    setEditQuestionId(null);
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  const handleDeleteClick = (id: string) => {
    setOpenModal(true);
    setDeleteQuestionId(id);
  };

  const handleSave = async () => {
    if (deleteQuestionId) {
      onDelete(deleteQuestionId);
      setDeleteQuestionId(null);
    }
    setOpenModal(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setDeleteQuestionId(null);
  };

  return (
    <div>
      <Button variant="primary" className="m-3" onClick={handleAddClick}>
        Add New Question
      </Button>
      {isFormVisible && (
        <QuestionForm 
          questionId={editQuestionId}
          closeForm={handleFormClose}
          refreshQuestions={onAdd}
          onEdit={onEdit} // Pass onEdit function to QuestionForm
          questions={questions} // Pass questions array to QuestionForm for data retrieval
        />
      )}

      <Table striped bordered responsive className='mt-5'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question Text</th>
            <th>Options</th>
            <th>Correct Answer</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question: any) => (
            <tr key={question._id}>
              <td>{question._id}</td>
              <td>{question.questionText}</td>
              <td>{question.options.join(', ')}</td>
              <td>{question.correctAnswer}</td>
              <td>{question.description}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteClick(question._id)}>
                  Delete
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="primary" onClick={() => handleEditClick(question._id)} className="ml-2">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RejectModalComponent 
        isOpen={openModal} 
        handleSave={handleSave} 
        handleClose={handleModalClose} // Add handleClose to manage modal state
      />
    </div>
  );
};

export default QuestionList;
