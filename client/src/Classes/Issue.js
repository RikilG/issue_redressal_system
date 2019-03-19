class Issue {
    constructor(jsonObject) {
        this.complaintName =  jsonObject.complaintName;
        this.email = jsonObject.email;
        this.pay = jsonObject.pay;
        this.type = jsonObject.type;
        this.workNature = jsonObject.workNature;
        this.description = jsonObject.description;
    }
}

export default Issue;