import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import { Layout,Row,Col,Button } from 'antd';
import { store } from '../store';
import { push } from 'react-router-redux';
import 'antd/dist/antd.css'
const { Header, Content, Footer } = Layout;

const mapStateToProps = state => {
  return {
   
  }};

const mapDispatchToProps = dispatch => ({

});
class App extends React.Component {
  render() {
      return (
        <div>
          <div className="home-page">
            <Layout style = {{minHeight:"100vh"}}>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div style = {{textAlign:"center", fontWeight:800,fontSize:48,color:"#fff"}}>Memory Game</div> 
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                  <Switch>
                      <Route exact path="/" component={Home}/>
                  </Switch>
                  </Content>
                <Footer style={{ textAlign: 'center' }}>
                  Memory Game ©2018 Created by Jingyi Liu
                </Footer>
              </Layout>
          </div>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
