import React, { Component } from "react";
import "./FillDetails.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class SPP extends Component{
    constructor(props){
        super(props);
        this.state={
            spNames=[]
        }
    }

    componentDidMount(){
        this.setState({loading:true});
        fetch('/spp',{
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dept:this.props.department
            })
        }).then(res => res.json())
            .then(data=>{
                this.setState({
                    spNames=data.sps.map((ps,index)=>{ return <Form> <Form.Check type="checkbox" label= {ps} required />  </Form> })
                });
            }).then(()=>{
                loading=false
        });
    }
    render() {
        let {names}= this.state.spNames;

        return(
            <div id="preferencesRoot">
            <Form>
            <Form.Group id="formGridCheckbox">
            {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:names} 
           </Form.Group>
           <Button type="submit" variant="primary">
            Submit
           </Button>
            </Form>
            </div>
        );
    }
}
export default SPP;