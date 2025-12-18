from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from Database.db import Base

class GrowthPlan(Base):
    __tablename__ = "growth_plans"

    id = Column(Integer, primary_key=True, index=True)
    risk_assessment = Column(Text)
    retention_strategy = Column(JSON)
    stay_interview_script = Column(Text)
    growth_plan = Column(Text)

    # foreign key
    id_employee = Column(Integer, ForeignKey("employees.id"))
    id_user = Column(Integer, ForeignKey("users.id"))

    # Relationship
    employee = relationship("Employee", back_populates="growth_plans")
    user = relationship("User", back_populates="growth_plans")
