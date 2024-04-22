class Task {
    constructor(id, teamLead, title, teamMembers, dueDateTime, createdOn, modifiedOn, deletedOn) {
      (this.id = id),
      (this.teamLead = teamLead),
      (this.title = title),
      (this.teamMembers = teamMembers),
      (this.dueDateTime = dueDateTime),
      (this.createdOn = createdOn),
      (this.modifiedOn = modifiedOn),
      (this.deletedOn = deletedOn);
    }
  }
  
  export default Task;
