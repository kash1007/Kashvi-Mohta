import React, { useState } from 'react'
import { chatWithAI } from '../api'


export default function Chatbot(){
const [messages, setMessages] = useState([
{ role: 'assistant', text: 'Hi — I am LoanBot. Ask me things like "Check my eligibility" or "Suggest a loan".' }
])
const [input, setInput] = useState('')
const [loading, setLoading] = useState(false)


async function send(){
if(!input.trim()) return
const userMsg = { role: 'user', text: input }
setMessages(m=>[...m, userMsg])
setLoading(true)
try{
const res = await chatWithAI(input)
const aiMsg = { role: 'assistant', text: res.reply }
setMessages(m=>[...m, aiMsg])
}catch(err){
setMessages(m=>[...m, { role: 'assistant', text: 'Error: could not reach server.' }])
}finally{ setLoading(false); setInput('') }
}


return (
<div className="flex flex-col h-[520px]">
<div className="flex-1 overflow-auto p-3 space-y-3 border rounded mb-3">
{messages.map((m,i)=> (
<div key={i} className={m.role==='user'? 'text-right' : 'text-left'}>
<div className={`inline-block p-2 rounded ${m.role==='user'? 'bg-blue-50' : 'bg-gray-100'}`}>{m.text}</div>
</div>
))}
</div>


<div className="flex gap-2">
<input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type a message..." />
<button onClick={send} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">Send</button>
</div>
</div>
)
}