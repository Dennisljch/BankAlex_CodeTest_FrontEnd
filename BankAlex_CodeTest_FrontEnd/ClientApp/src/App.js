import React, { Component } from 'react';
import $ from 'jquery';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Transactions from './components/Transactions'
import Transaction from './components/Transaction'

import './custom.css'

function App() {
  return (
    <MainApp/>
  );
}

const MainApp = props => {
    return (
        <>
            <Router>
            <div style={{display:"inline-block", width:"100%", margin:"auto", height:"100%", textAlign:"left"}}>
                <div style={{width:"100%", margin:"auto", height:"100%"}}>
                    <div style={{height: "100%"}}>
                        <Switch>
                            <Route path='/' exact component={Transactions} />
                            <Route path="/AllTransactions"  exact component={Transactions} />
                            <Route path="/EditTransactions/:id"  component={Transaction} />
                        </Switch>
                    </div>
                </div>
            </div>
            </Router>
        </>
    )
}

export default App;
