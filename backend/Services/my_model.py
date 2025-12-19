import joblib
import pandas as pd

def predict(data):
    model_path = '../../model/Model.pkl'
    model = joblib.load(model_path)
    pd_data = pd.DataFrame([data])
    if model.predict(pd_data)[0] == 1:
        return "yes"
    else :
        return "no"

if __name__ == '__main__':
    Fake_Data = {
        'Age': 50,
        'BusinessTravel': 'Travel_Rarely',
        'Department': 'Research & Development',
        'Education': 1,
        'EducationField': 'Life Sciences',
        'EnvironmentSatisfaction': 2,
        'JobInvolvement': 2,
        'JobLevel': 2,
        'JobRole': 'Research Scientist',
        'JobSatisfaction': 2,
        'MaritalStatus': 'Single',
        'MonthlyIncome': 5994,
        'OverTime': 'No',
        'PerformanceRating': 3,
        'TotalWorkingYears': 3,
        'TrainingTimesLastYear': 0,
        'WorkLifeBalance': 2,
        'YearsAtCompany': 3,
        'YearsInCurrentRole': 3,
        'YearsWithCurrManager': 3
    }
    print(predict(Fake_Data))