// src/services/questionService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/questions';

export const createQuestion = async (question: any) => {
  return await axios.post(`${API_URL}/createQuestion`, question);
};

export const getAllQuestions = async () => {
  return await axios.get(`${API_URL}/getAllQuestions`);
};

export const getQuestionById = async (id: string) => {
  return await axios.get(`${API_URL}/getQuestionById/${id}`);
};

export const updateQuestionById = async (id: string, updatedQuestion: any) => {
  return await axios.put(`${API_URL}/updateQuestionById/${id}`, updatedQuestion);
};

export const deleteQuestionById = async (id: string) => {
  return await axios.delete(`${API_URL}/deleteQuestionById/${id}`);
};
