from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_PATH = 'mock_data.json'
with open(DATA_PATH, 'r') as f:
    CUSTOMERS = json.load(f)

# --------------------------
# Simple endpoints
# --------------------------

@app.route('/customers')
def customers():
    return jsonify(CUSTOMERS)

@app.route('/eligibility/<int:cust_id>')
def eligibility(cust_id):
    cust = next((c for c in CUSTOMERS if c['id'] == cust_id), None)
    if not cust:
        return jsonify({'error': 'not found'}), 404

    score = cust.get('credit_score', 0)
    # Simple rule: score >= 700 => eligible; >=600 borderline; else not eligible
    if score >= 700:
        result = {'eligible': True, 'reason': 'Good credit score', 'max_amount': 500000}
    elif score >= 600:
        result = {'eligible': 'borderline', 'reason': 'Consider co-applicant or collateral', 'max_amount': 200000}
    else:
        result = {'eligible': False, 'reason': 'Low credit score', 'max_amount': 0}

    return jsonify(result)

# --------------------------
# AI Chat endpoint
# --------------------------

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get('message', '')
    msg_low = message.lower()

    # Minimal rule-based responses for demo
    if 'elig' in msg_low or 'check my eligibility' in msg_low:
        return jsonify({'reply': 'To check eligibility, select the customer on the left and click "Check Eligibility". I can also run a quick check if you tell me the customer name.'})

    if 'suggest' in msg_low and 'loan' in msg_low:
        return jsonify({'reply': 'Based on typical profiles: for credit score >700 — offer Personal Loan up to ₹5L, for 600–700 — secured loan or smaller amount.'})

    # Optional: connect to OpenAI if key is available
    openai_key = os.getenv('OPENAI_API_KEY')
    if openai_key:
        try:
            import openai
            openai.api_key = openai_key
            prompt = f"You are a financial assistant. User: {message}\nAnswer concisely."
            resp = openai.ChatCompletion.create(
                model='gpt-4o-mini',
                messages=[{'role': 'user', 'content': prompt}],
                max_tokens=300
            )
            reply = resp['choices'][0]['message']['content']
            return jsonify({'reply': reply})
        except Exception as e:
            return jsonify({'reply': f'Error calling OpenAI API: {str(e)}'})

    # Fallback default reply
    return jsonify({'reply': 'Demo bot: I can help check eligibility or suggest loan types. Try typing: "Check my eligibility" or "Suggest a loan for Asha Verma".'})

# --------------------------
# Main entry point
# --------------------------

if __name__ == '__main__':
    app.run(debug=True)
