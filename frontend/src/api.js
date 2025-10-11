import axios from 'axios'


const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'


export async function fetchCustomers() {
const res = await axios.get(`${API_BASE}/customers`)
return res.data
}


export async function checkEligibility(customerId) {
const res = await axios.get(`${API_BASE}/eligibility/${customerId}`)
return res.data
}


export async function chatWithAI(message, context = {}) {
const res = await axios.post(`${API_BASE}/chat`, { message, context })
return res.data
}