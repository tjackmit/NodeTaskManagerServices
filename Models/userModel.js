class User {
    constructor(id, firstName, lastName, email, password, roleTitle, team, tasks, createdOn, modifiedOn, deletedOn) {
      (this.id = id),
        (this.firstName = firstName),
        (this.lastName = lastName),
        (this.email = email),
        (this.password = password),
        (this.roleTitle = roleTitle),
        (this.team = team),
        (this.tasks = tasks),
        (this.createdOn = createdOn),
        (this.modifiedOn = modifiedOn),
        (this.deletedOn = deletedOn);
    }
  }
  
  export default User;
