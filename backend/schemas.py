from pydantic import BaseModel
from datetime import datetime

class IssueBase(BaseModel):
    title: str
    description: str
    category: str = "IT Support"
    priority: str = "Medium"

class IssueCreate(IssueBase):
    pass

class Issue(IssueBase):
    id: int
    status: str
    assigned_team: str
    created_at: datetime

    class Config:
        from_attributes = True
