import os
import json
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()

class RetentionStrategyData(BaseModel):
    risk_assessment: str = Field(description="Analysis of why the employee is at risk.")
    retention_strategy: list[str] = Field(description="A list of 3 specific actions.")
    stay_interview_script: str = Field(description="A professional script for the manager.")
    growth_plan: str = Field(description="Specific suggestion for improvement.")

def gemini(employee_data):
    client = InferenceClient(api_key=os.environ["HF_TOKEN"])

    json_schema = json.dumps(RetentionStrategyData.model_json_schema())

    reference_data = {
        "Education": {1: "Below College", 2: "College", 3: "Bachelor", 4: "Master", 5: "Doctor"},
        "EnvironmentSatisfaction": {1: "Low", 2: "Medium", 3: "High", 4: "Very High"},
        "JobInvolvement": {1: "Low", 2: "Medium", 3: "High", 4: "Very High"},
        "JobSatisfaction": {1: "Low", 2: "Medium", 3: "High", 4: "Very High"},
        "PerformanceRating": {1: "Low", 2: "Good", 3: "Excellent", 4: "Outstanding"},
        "RelationshipSatisfaction": {1: "Low", 2: "Medium", 3: "High", 4: "Very High"},
        "WorkLifeBalance": {1: "Bad", 2: "Good", 3: "Better", 4: "Best"}
    }
    json_reference = json.dumps(reference_data, indent=2)

    example_output_dict = {
        "risk_assessment": "The employee is at risk because they have been with the company for less than a year and have not received any training.",
        "retention_strategy": ["Provide additional training to the employee.", "Offer a promotion to the employee.", "Offer a raise to the employee."],
        "stay_interview_script": "Hi, I'm here to help you with your retention strategy. Can you tell me more about your employee?",
        "growth_plan": "The employee is at risk because they have been with the company for less than a year and have not received any training."
    }
    example_output_json = json.dumps(example_output_dict, indent=2)

    messages = [
        {
            "role": "system",
            "content": (
                "You are a Senior HR Analytics AI. Analyze employee data and provide a retention strategy. "
                "You must respond ONLY with a valid JSON object that matches the provided schema.\n\n"
                "Example of expected output:\n"
                f"{example_output_json}\n\n"
                "Reference for categorical values:\n"
                f"{json_reference}"
            ),
        },
        {
            "role": "user",
            "content": f"Employee Data: {json.dumps(employee_data)}\n\nSchema: {json_schema}"
        }
    ]

    completion = client.chat.completions.create(
        model="meta-llama/Llama-3.1-8B-Instruct", 
        messages=messages,
        max_tokens=1000,
    )

    response_content = completion.choices[0].message.content
    
    return response_content