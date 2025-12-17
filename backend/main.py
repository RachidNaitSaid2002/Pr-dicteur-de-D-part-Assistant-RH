from Database.db import engine,SessionLocal,Base
from fastapi import FastAPI, HTTPException, Response, status, Depends, Cookie
from Models.users import User
from Models.employes import Employee
from Schemas.users import UserCreate, UserLogin
from fastapi.security import HTTPBearer, HTTPBasicCredentials
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from Auth.auth import get_password_hash, get_uer, verify_jwt, create_jwt, verify_password
from fastapi.responses import JSONResponse
from Services.my_model import predict
from Schemas.val_data import ValData
from Services.gemini import gemini
import json

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
bearer_scheme = HTTPBearer()

Base.metadata.create_all(engine)
app = FastAPI()

app.router.redirect_slashes = False

db = SessionLocal()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
  
# SignUp --------------------------------------------------------------------- :
@app.post('/signup')
def Signup(user: UserCreate):
    db_user = get_uer(db, user.email)
    if db_user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail='Email Already exist !!')
    pass_hached = get_password_hash(user.hashed_password)
    db_user = User(username=user.username, email=user.email, full_name=user.full_name, hashed_password=pass_hached)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {'message':'User Register Successfully'}


# Login ----------------------------------------------------------------------- :
@app.post('/login')
async def login(user: UserLogin):
    db_user = get_uer(db, user.email)
    if db_user:
        verify_pass = verify_password(user.hashed_password, db_user.hashed_password)
        if verify_pass:
            token = create_jwt(user.email)
            return { 'access_token':token, 'token_type': "bearer", "user_id": db_user.id }
        else:
            return  {'message':'Password incorrect !!'}
    return {'message':'Username ou Password incorrect !!'}

# Prediction --------------------------------------------------------------------------- :
@app.post('/predict')
def prediction(employees: list[ValData], token: HTTPBasicCredentials = Depends(bearer_scheme)):
    if verify_jwt(token.credentials) is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials.")
    email = verify_jwt(token.credentials)
    user_id = db.query(User).filter(User.email == email).first().id

    if not employees:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No employees data provided.")
    else:
        for employee_data in employees:
            prediction_result = predict(employee_data.model_dump())

            Prediction = {
                "Age": employee_data.Age,
                "BusinessTravel": employee_data.BusinessTravel,
                "Department": employee_data.Department,
                "Education": employee_data.Education,
                "EducationField": employee_data.EducationField,
                "EnvironmentSatisfaction": employee_data.EnvironmentSatisfaction,
                "JobInvolvement": employee_data.JobInvolvement,
                "JobLevel": employee_data.JobLevel,
                "JobRole": employee_data.JobRole,
                "JobSatisfaction": employee_data.JobSatisfaction,
                "MaritalStatus": employee_data.MaritalStatus,
                "MonthlyIncome": employee_data.MonthlyIncome,
                "OverTime": employee_data.OverTime,
                "PerformanceRating": employee_data.PerformanceRating,
                "TotalWorkingYears": employee_data.TotalWorkingYears,
                "TrainingTimesLastYear": employee_data.TrainingTimesLastYear,
                "WorkLifeBalance": employee_data.WorkLifeBalance,
                "YearsAtCompany": employee_data.YearsAtCompany,
                "YearsInCurrentRole": employee_data.YearsInCurrentRole,
                "YearsWithCurrManager": employee_data.YearsWithCurrManager,
                "id_user":user_id,
                "Attrition": prediction_result
            }

            db_prediction = Employee(**Prediction)
            db.add(db_prediction)
            db.commit()
            db.refresh(db_prediction)
            if not prediction_result:
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="No predictions could be generated.")
    
    return db_prediction

# GrowthPlan --------------------------------------------------------------------------- :
@app.post('/GrowthPlan/{id}')
def growth_plan(id: int, token: HTTPBasicCredentials = Depends(bearer_scheme)):
    
    if verify_jwt(token.credentials) is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials.")

    email = verify_jwt(token.credentials)
    user_id = db.query(User).filter(User.email == email).first().id

    employee = db.query(Employee).filter(Employee.id == id, Employee.id_user == user_id).first()

    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found.")

    employee_data = {
        "Age": employee.Age,
        "BusinessTravel": employee.BusinessTravel,
        "Department": employee.Department,
        "Education": employee.Education,
        "EducationField": employee.EducationField,
        "EnvironmentSatisfaction": employee.EnvironmentSatisfaction,
        "JobInvolvement": employee.JobInvolvement,
        "JobLevel": employee.JobLevel,
        "JobRole": employee.JobRole,
        "JobSatisfaction": employee.JobSatisfaction,
        "MaritalStatus": employee.MaritalStatus,
        "MonthlyIncome": employee.MonthlyIncome,
        "OverTime": employee.OverTime,
        "PerformanceRating": employee.PerformanceRating,
        "TotalWorkingYears": employee.TotalWorkingYears,
        "TrainingTimesLastYear": employee.TrainingTimesLastYear,
        "WorkLifeBalance": employee.WorkLifeBalance,
        "YearsAtCompany": employee.YearsAtCompany,
        "YearsInCurrentRole": employee.YearsInCurrentRole,
        "YearsWithCurrManager": employee.YearsWithCurrManager,
        "Attrition": employee.Attrition
    }
    growth_plan = gemini(employee_data)
    Growth = json.loads(growth_plan)

    return Growth
    

    
