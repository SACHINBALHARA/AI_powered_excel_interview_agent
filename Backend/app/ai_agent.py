import os
import random
from dotenv import load_dotenv
from openai import OpenAI  # new client class
from .crud import create_question
from .models import Base
from .database import engine

# Directly set your OpenAI API key here as a string
OPENAI_API_KEY = ""

os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

# Then instantiate OpenAI client explicitly passing the key
client = OpenAI(api_key=OPENAI_API_KEY)

CATEGORY_PROMPTS = {
    "basic": (
        "You are an Excel expert interviewer. Generate 1 clear and concise interview question "
        "about basic Excel functions and formulas such as VLOOKUP, SUMIF, IF statements.\n\n"
        "Example:\n"
        "What is the purpose of the VLOOKUP function and how is it used?"
    ),
    "pivot": (
        "You are an Excel expert interviewer. Generate 1 interview question about PivotTables, "
        "its creation, and uses for analyzing data.\n\n"
        "Example:\n"
        "Explain how to create a PivotTable and its benefits."
    ),
    "visualization": (
        "You are an Excel expert interviewer. Generate 1 question about Excel charts or conditional formatting "
        "and their applications in presenting data visually.\n\n"
        "Example:\n"
        "How would you use conditional formatting to highlight cells based on specific criteria?"
    ),
    "scenario": (
        "You are an Excel expert interviewer. Generate 1 scenario-based Excel interview question where "
        "the candidate needs to solve a business problem using Excel.\n\n"
        "Example:\n"
        "Describe how you would use Excel to track sales performance over different regions."
    ),
    "advanced": (
        "You are an Excel expert interviewer. Generate 1 interview question about advanced topics such as VBA macros, "
        "Power Query, or What-If Analysis.\n\n"
        "Example:\n"
        "What is a VBA macro, and how can it be used to automate repetitive Excel tasks?"
    ),
    "cleaning": (
        "You are an Excel expert interviewer. Generate 1 question focused on data cleaning techniques in Excel "
        "using functions like TRIM or CLEAN.\n\n"
        "Example:\n"
        "How do you remove extra spaces from text entries in Excel?"
    )
}

CATEGORIES = list(CATEGORY_PROMPTS.keys())
CATEGORY_WEIGHTS = [25, 20, 15, 20, 10, 10]

def generate_weighted_excel_questions(db, num_questions=5, domain=None, experience_years=None):
    selected_categories = random.choices(CATEGORIES, weights=CATEGORY_WEIGHTS, k=num_questions)
    questions = []

    for category in selected_categories:
        prompt = CATEGORY_PROMPTS[category]

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are an Excel expert interviewer."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=100,
                temperature=0.5,
                n=1,
            )
            question_text = response.choices[0].message.content.strip()
        except Exception as e:
            question_text = f"An error occurred while generating question: {e}"
            print(question_text)

        question_record = create_question(db, category=category, question_text=question_text)
        questions.append({
            "id": question_record.id,
            "category": category,
            "question": question_text
        })

    return questions


if __name__ == "__main__":
    # Create tables if not exist
    Base.metadata.create_all(bind=engine)

    from database import SessionLocal
    db = SessionLocal()
    try:
        questions = generate_weighted_excel_questions(db=db, num_questions=5,domain=request.domain,experience_years=request.experience_years)
        for i, q in enumerate(questions, start=1):
            print(f"Q{i} ({q['category']}): {q['question']}")
    finally:
        db.close()
