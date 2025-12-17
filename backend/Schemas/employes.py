from pydantic import BaseModel
from typing import Literal

class Employer(BaseModel):
    Age: int
    BusinessTravel: Literal["Travel_Rarely", "Travel_Frequently", "Non-Travel"]
    Department: Literal["Research & Development", "Sales", "Human Resources"]
    Education: int
    EducationField: Literal["Life Sciences", "Medical", "Marketing", "Technical Degree", "Human Resources", "Other"]
    EnvironmentSatisfaction: int
    JobInvolvement: int
    JobLevel: int
    JobRole: Literal["Research Scientist", "Sales Executive", "Laboratory Technician", "Manufacturing Director", "Healthcare Representative", "Manager", "Sales Representative", "Research Director", "Human Resources"]
    JobSatisfaction: int
    MaritalStatus: Literal["Single", "Married", "Divorced"]
    MonthlyIncome: int
    OverTime: Literal["Yes", "No"]
    PerformanceRating: int
    TotalWorkingYears: int
    TrainingTimesLastYear: int
    WorkLifeBalance: int
    YearsAtCompany: int
    YearsInCurrentRole: int
    YearsWithCurrManager: int
    Attirition : Literal["yes","no"]
    id_user : int
