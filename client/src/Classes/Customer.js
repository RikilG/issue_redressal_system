class Customer {
    constructor(jsonObject) {
        this.fname = jsonObject.fname;
        this.lname = jsonObject.lname;
        this.email = jsonObject.email;
        this.password = jsonObject.password;
        this.address = jsonObject.address;
        this.city = jsonObject.city;
        this.state = jsonObject.state;
        this.pincode = jsonObject.pincode;
        this.mobile = jsonObject.mobile;
        this.aadhaar = jsonObject.aadhaar;
    }
}

export default Customer;