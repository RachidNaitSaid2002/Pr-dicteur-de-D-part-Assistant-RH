from pydantic import BaseModel
from typing import Optional, Dict, Any

class GrowthPlanResponse(BaseModel):
    id: int
    risk_assessment: str
    retention_strategy: Dict[str, Any]
    stay_interview_script: str
    growth_plan: str
    id_employee: int
    id_user: int

    class Config:
        from_attributes = True
