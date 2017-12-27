function onFormSubmit(e) {  
  var itemResponses = e.response.getItemResponses();
  
  var newMember = {
    name: itemResponses[0].getResponse(),
    googleAccountEmail: itemResponses[1].getResponse(),
    githubAccountName: itemResponses[2].getResponse(),
  };
  
  register(newMember);
}


function register(newMember) {
  shareGoogleDriveFolderWith(newMember.googleAccountEmail);
  addToGithubOrganization(newMember.githubAccountName);
}


function shareGoogleDriveFolderWith(googleAccountEmail) {  
  DriveApp.getFolderById(googleDrive.folderId).addEditor(googleAccountEmail);
}


function addToGithubOrganization(githubAccountName) {
  var url = github.rootEndpoint;
  url += '/orgs/' + github.repositoryName;
  url += '/memberships/' + encodeURIComponent(githubAccountName);
  
  var auth = Utilities.base64Encode(github.username + ':' + github.token);
  
  var options = {
    'method': 'put',
    'headers': {
      'Authorization': 'Basic ' + auth
    }
  }
  
  UrlFetchApp.fetch(url, options);
}
