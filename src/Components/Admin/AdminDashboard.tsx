// src/components/admin/AdminDashboard.tsx

import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import UserList from './Users/UserList';
import { getUsers } from '../../Utils/UserService';
import { getAllQuestions, deleteQuestionById, createQuestion, updateQuestionById } from '../../Utils/QuestionService';
import QuestionList from './Questions/QuestionList';
import { Question } from './Questions/Questions';

const AdminDashboard: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getAllQuestions();
        setQuestions(fetchedQuestions.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchUsers();
    fetchQuestions();
  }, []);

  const handleTabChange = ({}, newValue: number) => {
    setTabIndex(newValue);
  };

  const editQuestion = async (id: string, question: Question) => {
    try {
      await updateQuestionById(id,question);
      const fetchedQuestions = await getAllQuestions();
      setQuestions(fetchedQuestions.data);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const addQuestion = async (question: Question) => {
    try {
      await createQuestion(question);
      const fetchedQuestions = await getAllQuestions();
      setQuestions(fetchedQuestions.data);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const deleteQuestion = async (id: string) => {
    try {
      await deleteQuestionById(id);
      setQuestions((prevQuestions) => prevQuestions.filter((question) => question._id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className='mt-3'>
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Users" />
        <Tab label="Questions" />
      </Tabs>
      {tabIndex === 0 && <UserList users={users} setUsers={setUsers} />}
      {tabIndex === 1 && (
        <QuestionList 
          questions={questions} 
          onDelete={deleteQuestion} 
          onEdit={editQuestion}
          onAdd={addQuestion}
        />
      )}
    </Box>
    </div>
  );
};

export default AdminDashboard;
