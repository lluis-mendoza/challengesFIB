import React, {Component} from 'react';
import { connect } from 'react-redux';
import { logout, getUserInfo, getUserChallenges, getUsers } from '../../redux/actions/userActions';
import { getChallenges, foundChallenge} from '../../redux/actions/challengesActions';
import './index.css';

import {
    Card,
    Button,
    CardColumns,
    Container,
    Row,
    Col,
    ListGroup,
    Image,
    Form
  } from "react-bootstrap";
  import "bootstrap/dist/css/bootstrap.min.css";
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            code: "",
        };
    }
    componentDidMount(){
        this.props.getChallenges();
        this.props.getUserInfo(this.props.name);
        this.props.getUserChallenges(this.props.name);
        this.props.getUsers();
    }

    renderUserChallenges(){
        let items = []
        if (this.props.userChallenges != undefined){
            for(let i = 0; i<this.props.userChallenges.length; ++i){
                items.push(<ListGroup.Item>{this.props.userChallenges[i].name}</ListGroup.Item>)
            }
        }
        return items;
    }
    renderRanking(){
        let items = [];
        if (this.props.users != undefined){
            let users = this.props.users;
            users.sort((a,b)=>{
                return b.score-a.score;
            })
            let th = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];
            for(let i = 0; i<Math.min(7,users.length); ++i){
                items.push(<ListGroup.Item>{th[i]} {users[i].name} {users[i].score}</ListGroup.Item>)
            }
        }
        return items;
    }
    renderChallenges(){
        let items = [];
        if (this.props.challenges != undefined){
            for(let i = 0; i<this.props.challenges.length; ++i){
                let srcImage = "./images/" + this.props.challenges[i].image + ".png";
                items.push(                        <Card class="shadow-lg p-0 mb-2 bg-white rounded">
                    <Row>
                    <Col>
                        <Card.Img class="center"
                      style={{ height: "100px" }}
                      roundedCircle="true"
                             src={srcImage} />
                    </Col>
                    <Col>
                        {" "}
                        <Card.Body>
                        <Card.Title>{this.props.challenges[i].name}</Card.Title>
                        <Card.Text>{this.props.challenges[i].description} </Card.Text>
                        </Card.Body>
                    </Col>
                    </Row>
                </Card>);
            }
        }

        return items;
    }
    onChange = (e) => {
        this.setState({ [e.currentTarget.id]: e.target.value });
    };
    handleEnterCode = async (e) =>{
        e.preventDefault();
        this.props.foundChallenge(this.state.code, this.props.name);
        this.props.getUserInfo(this.props.name);
        this.props.getUserChallenges(this.props.name);
        this.props.getUsers();
    }
    render(){
        return(
            <div>
                <Container>
                <Row>
                <Col>
                    <h3>Completed challenges</h3>
                    <ListGroup>
                    {this.renderUserChallenges()}
                    </ListGroup>
                </Col>
                <Col xs={6}>
                    <h3>Challenges</h3>
                    <Row>
                    <Form inline onClick={this.handleEnterCode}>
                        <Form.Group>
                        <Form.Control className={!this.props.codeSuccess
                                ? "mb-2 mr-sm-2 is-invalid"
                                : "mb-2 mr-sm-2"} onChange={this.onChange} id="code" placeholder="Challenge Code" />
                        </Form.Group>
                            <Button type="submit" class="mb-2">
                                Enter
                            </Button>
                    </Form>

                    </Row>
                    <br />
                    <CardColumns>
                        {this.renderChallenges()}
                    </CardColumns>
                </Col>
                <Col>
                    <h3>Ranking</h3>
                    {this.renderRanking()}
                </Col>
                </Row>
            </Container>
            </div>
            
        );
    }
}

const mapState = state => {
    return {
        name: state.authReducer.name,
        challenges: state.challengeReducer.challenges,
        codeSuccess: state.challengeReducer.codeSuccess,
        userChallenges: state.authReducer.userChallenges,
        users: state.authReducer.users
    };
};

export default connect(mapState, { getChallenges, getUsers, getUserChallenges, getUserInfo, foundChallenge})(Home);