class Task {
    constructor(id, creator, currentOwner, PreviousOwners, title, description, dueDateTime, createdOn, modifiedOn, deletedOn) {
      (this.id = id),
      (this.creator = creator),
      (this.currentOwner = currentOwner),
      (this.PreviousOwners = PreviousOwners),
      (this.title = title),
      (this.description = description),
      (this.dueDateTime = dueDateTime),
      (this.createdOn = createdOn),
      (this.modifiedOn = modifiedOn),
      (this.deletedOn = deletedOn);
    }
  }
  
  export default Task;
