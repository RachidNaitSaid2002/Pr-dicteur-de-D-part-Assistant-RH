from sqlalchemy import Column, Integer, String, Boolean, ForeignKey , DateTime
from sqlalchemy.orm import relationship
from Database.db import Base
from datetime import datetime

class Employee(Base):
    __tablename__ = "employees"
    
    id = Column(Integer, primary_key=True, index=True)
    Age = Column(Integer)
    BusinessTravel = Column(String)
    Department = Column(String)
    Education = Column(Integer)
    EducationField = Column(String)
    EnvironmentSatisfaction = Column(Integer)
    JobInvolvement = Column(Integer)
    JobLevel = Column(Integer)
    JobRole = Column(String)
    JobSatisfaction = Column(Integer)
    MaritalStatus = Column(String)
    MonthlyIncome = Column(Integer)
    OverTime = Column(String)
    PerformanceRating = Column(Integer)
    TotalWorkingYears = Column(Integer)
    TrainingTimesLastYear = Column(Integer)
    WorkLifeBalance = Column(Integer)
    YearsAtCompany = Column(Integer)
    YearsInCurrentRole = Column(Integer)
    YearsWithCurrManager = Column(Integer)
    Attrition = Column(String)
    create_at = Column(DateTime, default=datetime.utcnow)

    # foreign key
    id_user = Column(Integer, ForeignKey("users.id"))

    # Relationship
    owner = relationship("User", back_populates="employees")
