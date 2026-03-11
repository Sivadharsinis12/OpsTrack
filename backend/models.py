from sqlalchemy import Column, Integer, String, DateTime
from database import Base
import datetime

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    category = Column(String, default="IT Support")
    priority = Column(String, default="Medium")
    status = Column(String, default="Pending")
    assigned_team = Column(String, default="DevOps Central")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)