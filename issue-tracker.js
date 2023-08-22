
document.forms[0].addEventListener("submit", submission);

function submission(sub) {
  sub.preventDefault();


  let trackerStatus = "open"; 
  let trackerId = chance.guid();
  let desc = document.getElementById("issueDescInput");
  let Severity = document.getElementById("issueSeverityInput");
  let AssignedTo = document.getElementById("issueAssignedToInput");

  

  let issue = {
    state: trackerStatus,
    id: trackerId,
    issueDesc: desc.value,
    dangerous: Severity.value,
    goal: AssignedTo.value,
  };

  
  

  if (localStorage.getItem("issues") == null) {
    let issues = [];
    issues.push(issue);
    window.localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    
    let issues = JSON.parse(localStorage.getItem("issues"));
      if (Array.isArray(issues)) {
        issues.push(issue);
      }
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  fetchIssues();

  this.reset();
}

function closeIssue(ID) {
  let allIssues = JSON.parse(localStorage.getItem("issues"))

  allIssues.map((issue) => {
    if(issue.id === ID) {
        issue.state = "closed"
    }
    
  })


  localStorage.setItem("issues",JSON.stringify(allIssues))
  fetchIssues()

}

function deleteIssue(ID) {
  let allIssues = JSON.parse(localStorage.getItem("issues"))

  allIssues.splice(ID,1)

  localStorage.setItem("issues",JSON.stringify(allIssues))
  fetchIssues()

}

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem("issues"));
  let issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  if (Array.isArray(issues)) {
    for (let i = 0; i < issues.length; i++) {
      let id = issues[i].id;
      console.log(id);
      let desc = issues[i].issueDesc;
      let severity = issues[i].dangerous;
      let assignedTo = issues[i].goal;
      let status = issues[i].state;
      issuesList.innerHTML += `
        <div class="well">
          <h6>Issue ID: ${id}</h6>
          <p><span class="label label-info">${status}</span></p>
          <h3>${desc}</h3>
          <p><span class="glyphicon glyphicon-time"></span> ${severity} <span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
          <a href="#" class="btn btn-warning" onclick="closeIssue('${id}')">Close</a>
          <a href="#" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</a>
        </div>
      `;
    }
  }
}


