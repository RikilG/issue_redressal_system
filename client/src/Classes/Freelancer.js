class Freelancer {
    constructor(jsonObject) {
        this.id = jsonObject.spId;
        this.fname = jsonObject.fname;
        this.lname = jsonObject.lname;
        this.email = jsonObject.email;
        this.password = jsonObject.password;
        this.mobile = jsonObject.mobile;
        this.pincode = jsonObject.pincode;
        this.skills = jsonObject.skills;
        this.className = "Freelancer";
    }
}

export default Freelancer;