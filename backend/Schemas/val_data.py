from pydantic import BaseModel

class ValData(BaseModel):
    Age: int
    BusinessTravel: str
    Department: str
    Education: int
    EducationField: str
    EnvironmentSatisfaction: int
    JobInvolvement: int
    JobLevel: int
    JobRole: str
    JobSatisfaction: int
    MaritalStatus: str
    MonthlyIncome: int
    OverTime: str
    PerformanceRating: int
    TotalWorkingYears: int
    TrainingTimesLastYear: int
    WorkLifeBalance: int
    YearsAtCompany: int
    YearsInCurrentRole: int
    YearsWithCurrManager: int