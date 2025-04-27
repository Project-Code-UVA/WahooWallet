import google.generativeai as genai
import pandas as pd

genai.configure(
    api_key="placeholder",
)


def load_data():
    data = [
        {"Category": "Groceries", "Budget ($)": 500, "Amount Spent ($)": 450},
        {"Category": "Rent", "Budget ($)": 1200, "Amount Spent ($)": 1200},
        {"Category": "Utilities", "Budget ($)": 150, "Amount Spent ($)": 130},
        {"Category": "Entertainment", "Budget ($)": 200, "Amount Spent ($)": 275},
    ]
    
    return pd.DataFrame(data)
    
def get_findings(data):
    data["Difference ($)"] = data["Budget ($)"] - data["Amount Spent ($)"]
    data["Percent of Budget Used"] = (data["Amount Spent ($)"] / data["Budget ($)"]) * 100

    # identify top overspending categories
    overspending = data[data["Difference ($)"] < 0].nlargest(3, "Percent of Budget Used")

    summary = {
        "categories": data.to_dict(orient="records"),  
        "top_overspending": overspending.to_dict(orient="records"),  
    }
    return summary


def create_prompt(summary, user_input):
    prompt = "You are an AI budget assistant for WahooWallet, a University of Virginia app designed to let college students budget their finances.\n"
    prompt += "Here is a user's category-wise budget breakdown:\n"

    for category in summary["categories"]:
        prompt += (
            f"- {category['Category']}: Budget ${category['Budget ($)']:.2f}, "
            f"Spent ${category['Amount Spent ($)']:.2f} "
            f"({category['Percent of Budget Used']:.2f}% used)\n"
        )

    if summary["top_overspending"]:
        prompt += "\nThe user has overspent in these categories:\n"
        for category in summary["top_overspending"]:
            prompt += f"- {category['Category']}: Over by ${abs(category['Difference ($)']):.2f}\n"

    prompt += "\nBased on this, answer the following question from a WahooWallet user. Remember your role as a financial advisor, and feel free to dismiss questions that are irrelevant."
    prompt += "\nKeep in mind that you are speaking directly to the user.\n"

    prompt += user_input
    
    return prompt



def query_ai(prompt):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error: {e}")
        return None


def main():
    data = load_data()

    user_input = input("Enter a question to ask the AI:\n")
    
    if data is not None:
        summary = get_findings(data)
        prompt = create_prompt(summary, user_input)
        print("Generated Prompt:\n", prompt)
        
        chatgpt_response = query_ai(prompt)
        print("\nAI's Recommendations:\n", chatgpt_response)

if __name__ == "__main__":
    main()
