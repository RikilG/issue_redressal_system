class Issue {
    constructor(jsonObject) {
        this.id = jsonObject._id;
        this.complaintName =  jsonObject.complaintName;
        this.email = jsonObject.email;
        this.pay = jsonObject.pay;
        this.type = jsonObject.type;
        this.workNature = jsonObject.workNature;
        this.description = jsonObject.description;
        this.className = "Issue";
    }
}

export default Issue;