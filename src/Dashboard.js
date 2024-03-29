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
        // context:depcha.ward
        // context:depcha.gfwp
        // context:depcha.wheaton

        const url = "https://glossa.uni-graz.at/archive/objects/query:depcha.dataset_incomeExpense_date/methods/sdef:Query/getJSON?params=" 
          + encodeURIComponent("$1|<https://gams.uni-graz.at/"+"context:depcha.gwfp"+">");
          
        try
        {
        const response = await fetch(url);
        //console.log(response);
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
        // data from fetch in componentDidMount()
        const data_from_query = this.state.dataset;
        //console.log(data_from_query);

         // array with all distinct between_dataset
    const dataset_between = [];
    for (let between in data) {
        dataset_between.push(data[between]['dataset_between']);
      }
    //console.log(dataset_between);

        // ToDo. die personen Filtern
        
                    
        return (
            <div>
                {/* heigth of right panel */} 
                <Layout style={{ height: 920 }}>
                     {/* width left with pie chart */} 
                    <Sider width={300} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 200 }}>
                            {/* View1 = Selected Viewer */} 
                            
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

                            {/* View5 = Bar Chart; <View5 data={data}/> */} 
                            <Content>
                                {/* if fetch already as reuslts, than create BarChart*/} 
                                {data_from_query ? <View5 data={data_from_query} /> : <div><h1> Loading...  </h1><p>Maybe Barchart is not available</p></div>}        
                            </Content>

                            <Sider width={300} style={{backgroundColor:'#eee'}}>
                               {/* View6 = User List */} 
                               {/*<View6 data={filteredData} changeSelectUser={this.changeSelectUser}/>*/}  
                               {data_from_query ? <View6 data={data_from_query} changeSelectUser={this.changeSelectUser}/> : <div><h1> Loading...  </h1><p>Maybe Between List is not available</p></div>}
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
