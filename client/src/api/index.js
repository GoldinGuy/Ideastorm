import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertIdea = payload => api.post(`/idea`, payload)
export const getAllIdeas = () => api.get(`/ideas`)
export const updateIdeaById = (id, payload) => api.put(`/idea/${id}`, payload)
export const deleteIdeaById = id => api.delete(`/idea/${id}`)
export const getIdeaById = id => api.get(`/idea/${id}`)

const apis = {
     insertIdea,
    getAllIdeas,
    updateIdeaById,
    deleteIdeaById,
    getIdeaById,
}

export default apis