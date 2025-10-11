import React, { useEffect, useState } from 'react'
import { fetchCustomers, checkEligibility } from './api'
import Chatbot from './components/Chatbot'
import LoanDashboard from './components/LoanDashboard'


export default function App(){
const [customers, setCustomers] = useState([])
const [selected, setSelected] = useState(null)


useEffect(()=>{
fetchCustomers().then(setCustomers).catch(console.error)
},[])


return (
<div className="min-h-screen p-6 flex gap-6">
<div className="w-1/3 bg-white p-4 rounded-2xl shadow">
<h2 className="text-xl font-semibold mb-4">Customers</h2>
<ul className="space-y-3">
{customers.map(c=> (
<li key={c.id} className="p-3 rounded-lg border hover:shadow cursor-pointer" onClick={()=>setSelected(c)}>
<div className="font-medium">{c.name}</div>
<div className="text-sm text-gray-500">Credit Score: {c.credit_score}</div>
</li>
))}
</ul>
</div>


<div className="flex-1 bg-white p-6 rounded-2xl shadow">
{selected ? (
<LoanDashboard customer={selected} onCheck={()=>checkEligibility(selected.id).then(alert)} />
) : (
<div className="text-gray-500">Select a customer to view details</div>
)}
</div>


<div className="w-1/3 bg-white p-4 rounded-2xl shadow">
<h2 className="text-xl font-semibold mb-2">AI Chatbot</h2>
<Chatbot />
</div>
</div>
)
}