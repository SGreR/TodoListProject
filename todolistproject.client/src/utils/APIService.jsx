import axios from 'axios';

const API_BASE_URL = 'https://localhost:7208/api/tasks';

export const getAllTasks = () => {
    return axios.get(API_BASE_URL)
}

export const getTaskById = (id) => {
    return axios.get(`${API_BASE_URL}/${id}`)
}

export const postTask = (task) => {
    return axios.post(`${API_BASE_URL}`, task)
}

export const putTask = (id, task) => {
    return axios.put(`${API_BASE_URL}/${id}`, task)
}

export const deleteTaskById = (id) => {
    return axios.delete(`${API_BASE_URL}/${id}`)
}