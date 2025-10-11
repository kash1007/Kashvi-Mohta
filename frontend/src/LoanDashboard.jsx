import React from 'react'


export default function LoanDashboard({ customer, onCheck }){
return (
<div>
<h3 className="text-2xl font-semibold">{customer.name}</h3>
<div className="mt-4 grid grid-cols-2 gap-4">
<div className="p-4 border rounded">
<div className="text-sm text-gray-500">Credit Score</div>
<div className="text-lg font-medium">{customer.credit_score}</div>
</div>
<div className="p-4 border rounded">
<div className="text-sm text-gray-500">Outstanding Debt</div>
<div className="text-lg font-medium">${customer.outstanding_debt}</div>
</div>
</div>


<div className="mt-6">
<button onClick={onCheck} className="px-4 py-2 bg-blue-600 text-white rounded">Check Eligibility</button>
</div>


<div className="mt-6">
<h4 className="text-lg font-semibold">Recent Notes</h4>
<ul className="mt-2 space-y-2 text-sm text-gray-600">
{customer.notes.map((n, i)=> <li key={i}>• {n}</li>)}
</ul>
</div>
</div>
)
}