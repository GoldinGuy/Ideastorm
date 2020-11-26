import axios from 'axios'

// 'http://165.22.0.134:3000/api', 'http://localhost:3000/api', 'https://server.ideastorm.app/api', 'https://api.ideastorm.app:3000/api',
const api = axios.create({
    baseURL: 'http://165.22.0.134:3000/api',
})

// edit db 
export const renameField = fieldName => api.post(`/renameField/${fieldName}`)

// edit/add ideas
export const insertIdea = payload => api.post(`/idea`, payload)
export const getAllIdeas = () => api.get(`/ideas`)
export const updateIdeaById = (id, payload) => api.put(`/idea/${id}`, payload)
export const deleteIdeaById = id => api.delete(`/idea/${id}`)

export const updateStormcountById = (id, payload) => api.put(`/idea/s_count/${id}`, payload)

// fetch a specific idea 
export const getIdeaById = id => api.get(`/idea/${id}`)

// fetch ideas w/ filters
export const getIdeasByTag = tags => api.get(`/ideasByTag/${tags}`)
export const getIdeasByText = text => api.get(`/ideasByText/${text}`)

// fetch ideas by category
export const getTrendingIdeas = text => api.get(`/trendingIdeas/${text}`)
export const getLatestIdeas = text => api.get(`/latestIdeas/${text}`)

// fetch tags 
export const getTrendingTags = () => api.get(`/trendingTags`)


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
    renameField,
    updateStormcountById
}

export default apis