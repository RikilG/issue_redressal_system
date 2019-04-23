class Issue {
    constructor(jsonObject) {
        this.id = jsonObject.issId;
        this.complaintName =  jsonObject.title;
        this.email = jsonObject.email;
        this.pay = jsonObject.pay;
        this.type = jsonObject.type;
        this.workNature = jsonObject.dname;
        this.description = jsonObject.dsc;
        this.status = jsonObject.status;
        this.acceptedBy = jsonObject.acceptedBy;
        this.className = "Issue";
    }
}

export default Issue;