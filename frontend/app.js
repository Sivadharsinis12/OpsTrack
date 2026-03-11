// ===============================
// GLOBAL ISSUE STORAGE CONTROLLER
// ===============================

const STORAGE_KEY = "opsTrack_issues";

// Get all issues
function getIssues() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save all issues
function saveIssues(issues) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
}

// Add new issue
function addIssue(issueData) {

    const issues = getIssues();

    const newIssue = {
        id: "#ISS-" + Math.floor(1000 + Math.random() * 9000),
        title: issueData.title,
        description: issueData.description,
        category: issueData.category || "General",
        team: issueData.team || "General",
        priority: issueData.priority || "Medium",
        status: "Pending",
        dateCreated: new Date().toLocaleDateString(),
        timeCreated: new Date().toLocaleTimeString(),
        dateClosed: "",
        resolution: "",
        comments: ""
    };

    issues.unshift(newIssue);
    saveIssues(issues);
}

// Update status
function updateIssueStatus(id, newStatus, resolutionNote="") {

    let issues = getIssues();

    issues = issues.map(issue => {
        if(issue.id === id){
            issue.status = newStatus;
            if(newStatus === "Resolved"){
                issue.dateClosed = new Date().toLocaleDateString();
                issue.resolution = resolutionNote;
            }
        }
        return issue;
    });

    saveIssues(issues);
}

// Get stats
function getStats(){
    const issues = getIssues();
    return {
        total: issues.length,
        pending: issues.filter(i => i.status !== "Resolved").length,
        resolved: issues.filter(i => i.status === "Resolved").length
    };
}

// Export to CSV
function exportCSV() {
    const issues = getIssues();
    if (issues.length === 0) {
        alert("No issues to export.");
        return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Issue ID,Title,Category,Priority,Status,Team,Date Created,Time,Date Closed\n";
    
    issues.forEach(issue => {
        let row = [
            issue.id || "",
            (issue.title || "").replace(/,/g, ";"),
            issue.category || "",
            issue.priority || "",
            issue.status || "",
            issue.team || "",
            issue.dateCreated || "",
            issue.timeCreated || "",
            issue.dateClosed || ""
        ];
        csvContent += row.join(",") + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "issues_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export to PDF
function exportPDF() {
    const issues = getIssues();
    if (issues.length === 0) {
        alert("No issues to export.");
        return;
    }
    
    // Create a simple HTML content for printing
    let printContent = `
        <html>
        <head>
            <title>Issues Report</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #2563eb; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #2563eb; color: white; }
                .status-pending { color: #f59e0b; }
                .status-resolved { color: #22c55e; }
            </style>
        </head>
        <body>
            <h1>Issues Report</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Issue ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    issues.forEach(issue => {
        let statusClass = issue.status === "Resolved" ? "status-resolved" : "status-pending";
        printContent += `
            <tr>
                <td>${issue.id || ""}</td>
                <td>${issue.title || ""}</td>
                <td>${issue.category || ""}</td>
                <td>${issue.priority || ""}</td>
                <td class="${statusClass}">${issue.status || ""}</td>
                <td>${issue.dateCreated || ""}</td>
            </tr>
        `;
    });
    
    printContent += `
                </tbody>
            </table>
        </body>
        </html>
    `;
    
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

