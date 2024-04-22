class Settings {
    constructor(id, userID, lightMode, darkMode, colorSchema, language, datetimeFormat, createdOn, modifiedOn, deletedOn) {
      (this.id = id),
      (this.userID = userID),  
      (this.lightMode = lightMode),
      (this.darkMode = darkMode),
      (this.colorSchema = colorSchema),
      (this.language = language),
      (this.datetimeFormat = datetimeFormat),
      (this.createdOn = createdOn),
      (this.modifiedOn = modifiedOn),
      (this.deletedOn = deletedOn);
    }
  }
  
  export default Settings;
