import React, { useState, useEffect } from 'react';

function Transactions() {

    const mainTableStyle = {
        width:"90%",
        margin:"auto",
        padding: "10px 0px",
    }

    const hrStyle = {
        padding:"0px",
        margin: "0px"
    }

    const transactionTableCell = {
        padding: "0px 10px",
        display:"inline-block"
    }

    const amountTableCell = {
        width:"160px"
    }

    const ownerTableCell = {
        width:"160px"
    }

    const linkButton = {
        cursor:"pointer", 
        color:"steelblue", 
        fontWeight:"bold"
    }

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadAllTransactions();
    },[]);
    
    const loadAllTransactions = async() => {
        const data = await fetch(`/Transactions`);
        const json = await data.json();
        setTransactions(json);    
        console.log(json)
    }

    const EditTransaction = (id) => {
        window.location.replace(`/AllTransactions/${id}`);
    }

    const DeleteTransaction = (id) => {

    }

    const AddTransaction = () => {

    }

    const TransactionRecord = (props) => (
        <>
            <div>
                <span style={transactionTableCell}>
                   From: {props.item.fromAccount}
                </span>
                <span style={transactionTableCell}>
                   To: {props.item.toAccount}
                </span>
                <span style={transactionTableCell}>
                   Description: {props.item.description}
                </span>
                <span style={{...transactionTableCell, ...amountTableCell}}>
                   Amount: {props.item.amount}
                </span>
                <span style={transactionTableCell}>
                   Date: {props.item.date}
                </span>
                <span style={{...transactionTableCell, ...ownerTableCell}}>
                   Owner: {props.item.owner}
                </span>
                <span style={transactionTableCell}>
                    <a style={linkButton} hrer="#" onClick={() => EditTransaction(props.item.id)}>Edit</a>
                </span>
                <span style={transactionTableCell}>
                    <a style={linkButton} hrer="#" onClick={() => DeleteTransaction(props.item.id)}>Delete</a>
                </span>
            </div>
            <hr style={hrStyle}/>
        </>
    )

    return (
        <React.Fragment>
            <div style={mainTableStyle}>
                <hr style={hrStyle}/>
                <div style={{textAlign:"center"}}><a style={linkButton} hrer="#" onClick={() => AddTransaction()}>Add New</a></div>
                <hr style={hrStyle}/>
                {
                    transactions.map(
                        item => (
                            <TransactionRecord item={item} key={item.id}/>
                        )
                    )
                }
            </div>
        </React.Fragment>
    )

}


export default Transactions;
