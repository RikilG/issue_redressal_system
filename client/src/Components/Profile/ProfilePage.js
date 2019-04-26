import React,{Component} from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Profile.css';
import ViewDetails from './ViewDetails/ViewDetails';
import MyPosts from './MyPostsFolder/MyPosts.js';
import ChangePassword from './ChangePassword/ChangePassword.js';
import EditProfile from './Editprofile/EditProfile.js';
//import custDetails from '../../Assets/detailsHtmlPage.html'

class ProfilePage extends Component{

  constructor(props) {
    // console.log("Hi");
    super(props);
    this.state = {
        //email: this.props.email,
    }
    // console.log(this.props.email);
    }


    render()
    { 
        return (
            <div id="divid">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={2}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Issues Solved</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">Change Password</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="fourth">Edit Profile</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <div className="vr" xs="true"></div>
    <Col sm={8}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
        <h1>Your Details</h1>
         <ViewDetails user={this.props.user} />
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <h1 >Your Posts</h1>
          <MyPosts id="posts"  user={this.props.user}/>
        </Tab.Pane>
        <Tab.Pane eventKey="third">
          <h1 >Change Your Password</h1>
          <ChangePassword id="chgPsW" user={this.props.user} />
        </Tab.Pane>
        <Tab.Pane eventKey="fourth">
          <h1 >Change Your Profile</h1>
          <EditProfile user={this.props.user} setView={this.props.setView} setSigninStatus={this.props.setSigninStatus} />
        </Tab.Pane>
      </Tab.Content>
    </Col>
    <Col id="colid" sm={1}>
        <Tab.Pane eventKey="first">
        <img className="profile-image" src={"https://api.adorable.io/avatars/112/"+this.props.user.email+".png"} alt="Account" />
          {/* <p >This is Photo</p> */}
        </Tab.Pane>
    </Col>
   
    
  </Row>
</Tab.Container>  
</div>      
        );
    }
    
}
export default ProfilePage;