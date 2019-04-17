import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loadingIcon from '../Assets/loading.gif';
class SPP extends Component{
    constructor(props){
        super(props);
        this.state={
            spNames:[],
            sps:[],
            loading:false
        }
    }
    handleSubmit = () => {
        fetch("/sendNotifs", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          sps:this.props.sps  
          })
        })
          .then(res => res.json())
          .then(data => {
            alert("Issue successfully submitted!!!");
            this.props.setView("Feed");
          });
      };
    
    componentDidMount(){
        this.setState({loading:true});
        fetch('/spp',{
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dept:this.props.content.department
            })
        }).then(res => res.json())
            .then(data=>{
                this.setState({
                    spNames: data.sps.map((ps,index)=>{ return  <Form.Check type="checkbox" /> ; })
                });
            }).then(()=>{
                this.setState({ loading: false });
        });
    }
    render() {
        let names= this.state.spNames;
        let loading=this.state.loading;
        return(
            <div id="preferencesRoot">
            <Form onSubmit={this.handleSubmit}>
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