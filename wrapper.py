from openai import OpenAI
import pandas as pd
import openpyxl

client = OpenAI()
completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Give me budget recommendations"}
    ]
)

OpenAI.api_key = "radwan_please_buy_an_api_key"

def load_data(file_path):
    try:
        if file_path.endswith('.csv'):
            data = pd.read_csv(file_path)
        elif file_path.endswith('.xlsx') or file_path.endswith('.xls'):
            data = pd.read_excel(file_path, engine='openpyxl') 
        else:
            raise ValueError("Unsupported file format. Please use .csv or .xlsx.")
        return data
    except Exception as e:
            (f"Something went wrong while loading the data: {e}")
            return None
    
def get_findings(data):
     
     total_income = data[data['category'] == 'income']['amount'].sum()
     total_expenses = data[data['category'] == 'expenses']['amount'].sum()
     savings = total_income - total_expenses

     categorical_spending = (
        data[data['category'] == 'expenses']
        .groupby('subcategory')['amount']
        .sum()
        .sort_values()
     )

     summary = {
          "total income ": total_income,
          "total expenses ": total_expenses,
          "savings": savings,
          "top_categories": categorical_spending.head(3).to_dict()
     }
     return summary

def create_prompt(summary):
    prompt = (
        f"Here is a summary of your financial data:\n"
        f"- Total Income: ${summary['total_income']:.2f}\n"
        f"- Total Expenses: ${summary['total_expenses']:.2f}\n"
        f"- Savings: ${summary['savings']:.2f}\n"
        f"- Top Spending Categories:\n"
    )
    for category, amount in summary['top_categories'].items():
        prompt += f"  * {category}: ${amount:.2f}\n"

    prompt += (
        "\nBased on this information, what recommendations do you have for improving my budgeting? "
        "Allow me to ask follow-up questions about my financial situation."
    )
    
    return prompt   

def query_chatgpt(prompt):
    try:
        response = OpenAI.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a financial advisor for an app called WahooWallet."},
                {"role": "user", "content": prompt},
            ],
        )
        return response['choices'][0]['message']['content']
    except Exception as e:
        print(f"Error querying ChatGPT: {e}")
        return None

def main():
    file_path = "transactions.csv"  # replace with path to dataset eventually
    data = load_data(file_path)
    
    if data is not None:
        summary = get_findings(data)
        prompt = create_prompt(summary)
        print("Generated Prompt:\n", prompt)
        
        chatgpt_response = query_chatgpt(prompt)
        print("\nChatGPT's Recommendations:\n", chatgpt_response)
