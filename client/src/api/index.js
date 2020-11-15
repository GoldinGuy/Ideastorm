import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertIdea = payload => api.post(`/idea`, payload)
export const getAllIdeas = () => api.get(`/ideas`)
export const updateIdeaById = (id, payload) => api.put(`/idea/${id}`, payload)
export const deleteIdeaById = id => api.delete(`/idea/${id}`)
export const getIdeaById = id => api.get(`/idea/${id}`)
export const getIdeasByTag = tags => api.get(`/ideasByTag/${tags}`)
export const getTrendingIdeas = () => api.get(`/trendingIdeas`)
export const getLatestIdeas = () => api.get(`/latestIdeas`)

const apis = {
     insertIdea,
    getAllIdeas,
    updateIdeaById,
    deleteIdeaById,
    getIdeaById,
    getIdeasByTag,
    getLatestIdeas,
    getTrendingIdeas
}

export default apis