const {createStore} = require('../utils/StoreUtils'),
  ActionTypes = require('../constants/ActionTypes'),
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  config = require('../../../config');
let _issues = {};

function filterByAssignee (issues, assigneeName) {
  return issues.filter(issue => issue.assignees.find(assignee => assignee.login === assigneeName))
}

function filterByDate (issues, date) {
  return issues.filter(issue => new Date(issue.updated_at) >= date)
}

let IssueStore = createStore({
  get() {
    return _issues;
  },
  getByStatus(status, username){
    console.log('getByStatus status: %s \t username: %s', status, username)
    if (Object.keys(_issues).length == 0) {
      return {}
    }
    const d = new Date()
    const yesterday = d.setDate(d.getDate() - 1)
    let filteredIssue = filterByDate(filterByAssignee(_issues, username), yesterday)
    if (Object.keys(filteredIssue).length === 0) {
      return {}
    }
    switch (status) {
      case 'closed':
        return filteredIssue.filter(issue => issue.state === 'closed')
      case 'wip':
        return filteredIssue.filter(issue => issue.state === 'open')
      default:
        return _issues
    }
  }
});
IssueStore.dispatcherToken = AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case ActionTypes.GET_ISSUE_SUCCESS:
      _issues = action.response.body;
      IssueStore.emitChange();
      break;
    default:
    // do nothing

  }
});
module.exports = IssueStore;