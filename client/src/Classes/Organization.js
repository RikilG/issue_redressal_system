class Organization {
    constructor(jsonObject) {
        this.id = jsonObject._id;
        this.name = jsonObject.name;
        this.email = jsonObject.email;
        this.password = jsonObject.password;
        this.headquaters = jsonObject.headquaters;
        this.mobile = jsonObject.mobile;
        this.workforce = jsonObject.workforce;
        this.className = "Organization";
    }
}

export default Organization;