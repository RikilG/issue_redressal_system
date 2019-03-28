class Organization {
    constructor(jsonObject) {
        this.name = jsonObject.name;
        this.email = jsonObject.email;
        this.password = jsonObject.password;
        this.headquaters = jsonObject.headquaters;
        this.mobile = jsonObject.mobile;
        this.workforce = jsonObject.workforce;
    }
}

export default Organization;