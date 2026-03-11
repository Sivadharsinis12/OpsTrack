from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models, schemas, database

app = FastAPI()

# Enable CORS for your single-file frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Correct way to create tables:
models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def health_check():
    return {"status": "online", "message": "OpsTrack Backend Active"}

@app.post("/issues/", response_model=schemas.Issue)
def create_issue(issue: schemas.IssueCreate, db: Session = Depends(database.get_db)):
    db_issue = models.Issue(**issue.dict())
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue

@app.get("/issues/", response_model=list[schemas.Issue])
def get_issues(db: Session = Depends(database.get_db)):
    return db.query(models.Issue).all()

@app.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(database.get_db)):
    """Get dashboard statistics for the overview page"""
    issues = db.query(models.Issue).all()
    
    total_issues = len(issues)
    pending_issues = len([i for i in issues if i.status == "Pending"])
    resolved_issues = len([i for i in issues if i.status == "Resolved"])
    
    # Calculate average response time (mock - in real app would track timestamps)
    avg_response_time = "2.5h" if total_issues > 0 else "0h"
    
    # Category breakdown
    categories = {}
    for issue in issues:
        cat = issue.category if issue.category else "Other"
        categories[cat] = categories.get(cat, 0) + 1
    
    # Calculate percentages
    it_support_count = categories.get("IT Support", 0)
    facilities_count = categories.get("Facilities", 0)
    hr_count = categories.get("HR Operations", 0)
    other_count = categories.get("Other", 0)
    
    it_support_percent = round((it_support_count / total_issues * 100)) if total_issues > 0 else 0
    facilities_percent = round((facilities_count / total_issues * 100)) if total_issues > 0 else 0
    hr_percent = round((hr_count / total_issues * 100)) if total_issues > 0 else 0
    other_percent = round((other_count / total_issues * 100)) if total_issues > 0 else 0
    
    return {
        "total_issues": total_issues,
        "pending_issues": pending_issues,
        "resolved_issues": resolved_issues,
        "avg_response_time": avg_response_time,
        "it_support_percent": it_support_percent,
        "facilities_percent": facilities_percent,
        "hr_percent": hr_percent,
        "other_percent": other_percent,
        "notification_count": pending_issues,
        "user_name": "Admin User",
        "user_role": "Administrator"
    }

@app.get("/dashboard/recent-issues")
def get_recent_issues(db: Session = Depends(database.get_db)):
    """Get recent issues for the dashboard table"""
    issues = db.query(models.Issue).order_by(models.Issue.created_at.desc()).limit(10).all()
    
    result = []
    for issue in issues:
        # Determine priority class
        priority_class = "low"
        if issue.priority == "High":
            priority_class = "high"
        elif issue.priority == "Medium":
            priority_class = "medium"
        
        # Determine status class
        status_class = "status-pending"
        if issue.status == "Resolved":
            status_class = "status-resolved"
        elif issue.status == "In Progress":
            status_class = "status-inprogress"
        
        result.append({
            "id": issue.id,
            "category": issue.category or "Other",
            "priority": issue.priority,
            "priority_class": priority_class,
            "team": issue.assigned_team,
            "status": issue.status,
            "status_class": status_class
        })
    
    return result
