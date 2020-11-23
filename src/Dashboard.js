import React, { Component } from 'react';
import data from './data';
import { Layout } from 'antd';
import View1 from './views/View1';
import View2 from './views/View2';
import View3 from './views/View3';
import View4 from './views/View4';
import View5 from './views/View5';
import View6 from './views/View6';
import './dashboard.css';


const { Sider, Content, Footer } = Layout;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUser: data[0],
            greaterThenAge: 0,
            includedGender: ['Male', 'Female','Unknown'],
        }
    }

    changeSelectUser = value => {
        this.setState({
            selectedUser: value
        })
    }

    changeGreaterThenAge = value => {
        this.setState({
            greaterThenAge: value
        })
    }

    changeIncludedGender = value => {
        this.setState({
            includedGender: value
        })
    }

    state = {
        loading: true,
        dataset: null,
    }

    //async because of async fetch
    async componentDidMount()
    {
        const url = "https://glossa.uni-graz.at/archive/objects/query:depcha.dataset-date-income-expenses/methods/sdef:Query/getJSON?params=" 
          + encodeURIComponent("$1|<https://gams.uni-graz.at/"+"context:depcha.gfwp"+">");
        try
        {
        const response = await fetch(url);
        const data = await response.json();
        this.setState({dataset: data})
        } catch (error) {
            console.log(error);
          }
    }


    render() {

        const {selectedUser, greaterThenAge, includedGender} = this.state;
        const filteredData = data.filter(user=>includedGender.indexOf(user.gender)!==-1)
                                 .filter(user=>user.age>greaterThenAge);
        /*
        //console.debug(filteredData);                        
        const getData=()=>{
            fetch(Query_URL
            ,{
                method: 'get'
            }
            )
              .then(function(response){
                //console.log(response)
                return response.json();
              })
              .then(function(myJson) {
                //console.log(myJson);
                return myJson;
              });
          }
        
        const test = getData();
        console.debug(test); 
        getData();
        */
                                 
     
      
        return (
            <div>
                {/* heigth of right panel */} 
                <Layout style={{ height: 920 }}>
                     {/* width left with pie chart */} 
                    <Sider width={300} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 200 }}>
                            {/* View1 = Selected Viewer */} 
                            <View1 user={selectedUser}/>
                        </Content>
                        <Content style={{ height: 300 }}>
                            {/* View2 = Pie Chart Component */} 
                            <View2 data={filteredData}/>
                        </Content>
                        <Content style={{ height: 400 }}>
                             {/* View3 = gender */} 
                            <View3 
                                changeGreaterThenAge={this.changeGreaterThenAge}
                                changeIncludedGender={this.changeIncludedGender}
                            />
                        </Content>
                    </Sider>
                    <Layout>
                        {/* View4 = Line */} 
                        {/*<Content style={{ height: 300 }}>
                            <View4 user={selectedUser}/>
                        </Content>*/}
                        <Layout style={{ height: 600 }}>

                            {/* View5 = Bar */} 
                            <Content>
                            {/*<View5 data={this.state.dataset}/>*/}
                             <div>
                                    {this.state.loading || !this.state.dataset ? (
                                    <div>loading...</div> 
                                    ) : (
                                    <div>
                                        <div>{this.state.dataset[1].date}</div>
                                        
                                          <div className="col">
                                            <h1>Mi Casa</h1>
                                            <p>This is my house y&apos;all!</p>
                                            {this.state.dataset.map(a => <div>{a.dataset}</div>)}
                                            </div>
                                            
                                    </div>
                                    )}
                            </div>  
                            </Content>

                            <Sider width={300} style={{backgroundColor:'#eee'}}>
                                  {/* View5 = User List */} 
                                {/*<View6 data={filteredData} changeSelectUser={this.changeSelectUser}/>*/} 
                            </Sider>
                        </Layout>
                    </Layout>
                </Layout>
                <Layout>
                    <Footer style={{ height: 20 }}>
                        <div style={{marginTop: -10}}>
                            Source Code <a href='https://github.com/sdq/react-d3-dashboard'>https://github.com/sdq/react-d3-dashboard</a>;
                            Author <a href='https://sdq.ai'>sdq</a>;
                        </div>
                    </Footer>
                </Layout>
            </div>
        )
    }
}
