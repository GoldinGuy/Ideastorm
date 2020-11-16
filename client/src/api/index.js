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
export const getIdeasByText = text => api.get(`/ideasByText/${text}`)
export const getTrendingIdeas = () => api.get(`/trendingIdeas`)
export const getLatestIdeas = () => api.get(`/latestIdeas`)
export const getTrendingTags = () => api.get(`/trendingTags`)
export const renameField = fieldName => api.post(`/renameField/${fieldName}`)


const apis = {
     insertIdea,
    getAllIdeas,
    updateIdeaById,
    deleteIdeaById,
    getIdeaById,
    getIdeasByTag,
    getLatestIdeas,
    getTrendingIdeas,
    getIdeasByText, 
    getTrendingTags,
    renameField
}

export default apis