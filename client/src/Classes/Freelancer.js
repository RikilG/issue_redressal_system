class Freelancer {
    constructor(jsonObject) {
        this.fname = jsonObject.fname
        this.lname = jsonObject.lname
        this.email = jsonObject.email
        this.password = jsonObject.password
        this.address = jsonObject.address
        this.city = jsonObject.city
        this.state = jsonObject.state
        this.mobile = jsonObject.mobile
        this.aadhaar = jsonObject.aadhaar
        this.pincode = jsonObject.pincode
    }
}

export default Freelancer;