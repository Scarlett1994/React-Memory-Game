import React from 'react';
import { connect, } from 'react-redux';
import { Layout,Row,Col,Button } from 'antd';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import _ from "lodash"
import PropTypes from 'prop-types'
import TimerMachine from 'react-timer-machine'
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

const { Header, Content, Footer } = Layout;
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
});

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
        isFlipped:[],
        basic:[],
        first:-1,
        second:-1,
        steps:0,
        count:0,
        select: -1,
        finish:-1
    }
  
  }
  raffle (){
    let basic = this.state.basic
    for (let count = 0 ; count < 200; count++) {
      const position = Math.floor( Math.random() * this.state.finish )
      if (basic[0] !== basic[position])  {
        const left =  basic[0]
        basic[0] = basic[position]
        basic[position] = left
      }
    }
    this.setState({
      basic:basic
    })
  }

  handleClick =(e,index) =>{
    console.log(this.state)
    let steps = this.state.steps
    steps = steps+1
    let first = this.state.first
    let second = this.state.second
    const basic = this.state.basic
    let isFlipped =  this.state.isFlipped
    let cur = isFlipped[index]
    if (cur === true) {
      return
    }
    if (first !== -1 && second !== -1) {
      return
    }
    if (first === -1 || second === -1 ) {
      if ( cur === false) {
        isFlipped[index] = true;
      }
      
      this.setState({
        first:index,
        isFlipped:isFlipped,
        steps:steps
      })

    }
    setTimeout(() => {
     
      if (first === -1) {
        this.setState ({
          first:index
        })
        console.log(this.state,"first")
        return;
      } 
      if (second === -1 ) {
        let count = this.state.count;
        if (basic[index] === basic[first]) {
          isFlipped[index] = true
          this.setState( {
            isFlipped:isFlipped,
            first:-1,
            second:-1,
            count:count+1
          })
          console.log(this.state,"match")
        } else {
          isFlipped[first] = false
          isFlipped[index] = false
          this.setState({
            first:-1,
            second:-1,
            isFlipped:isFlipped
          })
          console.log(this.state,"nomatch")
        }
      }
      
    },500)
  }
  
  hanldRestart() {
    window.location.reload();
  }

  handleEasy = () => {
    this.setState({
      isFlipped :[false,false,false,false,false,false],
      basic: [0,0,1,1,2,2],
      finish:6,
      select:1
    })
    setTimeout(() => {
      this.raffle()
    })
  }

  handleMiddle = () => {
    this.setState({
     isFlipped :[false,false,false,false,false,false,
          false,false,false,false,false,false,
          false,false,false,false,false,false,
          ],
      basic: [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,],
      finish:18,
      select:2
    })
    setTimeout(() => {
      this.raffle()
    })
    
  }

  handleHard = () => {
    this.setState({
     isFlipped :[false,false,false,false,false,false,
          false,false,false,false,false,false,
          false,false,false,false,false,false,
          false,false,false,false,false,false,
          false,false,false,false,false,false,
          false,false,false,false,false,false],
      basic: [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17],
      finish:36,
      select:2
    })
    setTimeout(() => {
      this.raffle()
    })
    
  }

  render() {
    const {basic,count,steps,select,finish} = this.state
    let score = 0 
    if (count !== 0) {
      score = Math.floor(count * 20 * select - steps/2)
      score <= 0 ? 0 : score
    }
    return (
    <div style={{ background: '#fff', padding: 24,  }}>
      <div style = {{padding:16}}>
        <Button size = "large" onClick = {this.hanldRestart}>Reset Your Game</Button>
        <span style = {{fontWeight:600,fontSize:24, marginLeft:16}}>
        Time:  
        <TimerMachine
          timeStart={0 * 1000} 
          formatTimer={(time, ms) =>
            moment.duration(ms, "milliseconds").format("h:mm:ss")
          }
          started={this.state.select !== -1}
          paused={this.state.count === finish/2}
          countdown={false} 
          interval={1000} 
        />
        </span>
        <span style = {{float:"right",fontWeight:600,fontSize:24}}>Total Score: {score}   Total Move: {this.state.steps}</span>
      </div>
        {count !== finish/2  && select !== -1 && 
          <Row>
          { 
            _.map (basic,(item,index) =>{
              return <Col  span = {4} style ={{padding:16,cursor:"pointer"}}>
              <Flippy
                isFlipped={this.state.isFlipped[index]}
                flipDirection="horizontal" 
                style={{ width: '100%', height: '150px' }} 
              >
                <FrontSide style={{backgroundColor: '#41669d',}}>
                  <div onClick = {e => this.handleClick(e,index)} style = {{height:"100%",width:"100%"}} ></div>
                </FrontSide>
                <BackSide style={{ backgroundColor: '#175852'}}>
                  <div onClick = {e => this.handleClick(e,index)}  style = {{fontSize:80,fontWeight:800,color:"#fff",textAlign:"center",height:"100%",width:"100%"}}>{item}</div>
                </BackSide>
              </Flippy>
          </Col>})
          }
        </Row>}
        {count === finish/2 && select !== -1 &&
        <Row style = {{padding:16,textAlign:"center", minHeight:"90vh"}}>
          <div style = {{fontWeight:800,fontSize:64,padding:16,}}>You Win!</div>
          <Button size = "large" type = "primary" onClick = {this.hanldRestart}>Try Again</Button>
        </Row>}
        {select === -1 && 
        <Row style = {{padding:16,textAlign:"center", minHeight:"90vh"}}>
          <div style = {{fontWeight:800,fontSize:32,padding:16}}>Please Select The Level</div>
            <Col span = {8}><Button onClick = {this.handleEasy} size = "large" > Easy </Button></Col>
            <Col span = {8}><Button onClick = {this.handleMiddle} size = "large" > Middle </Button></Col>
            <Col span = {8}> <Button onClick = {this.handleHard} size = "large" > Hard </Button></Col>
        </Row>} 
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
