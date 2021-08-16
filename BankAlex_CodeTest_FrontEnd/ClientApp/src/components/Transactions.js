import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { convertCompilerOptionsFromJson } from 'typescript';
import '../custom.css'

function Transactions() {

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
    }

    const EditTransaction = (id) => {
        window.location.replace(`/EditTransactions/${id}`);
    }

    const DeleteTransaction = (id) => {      
        $.ajax({url: `/Transactions/${id}`, type: 'delete',
            success: function (response) {
                alert('Item Deleted');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error');
            }
        });     
    }

    const AddTransaction = () => {
        window.location.replace(`/EditTransactions/0`);
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
                    <a style={linkButton} hrer="#" onClick={() =>{ if(window.confirm('Delete the item?')) {DeleteTransaction(props.item.id)}}}>Delete</a>
                </span>
            </div>
            <hr style={hrStyle}/>
        </>
    )

    return (
        <React.Fragment>
            <div className="MainTable">
                <div style={{paddingTop:"20"}}>
                    <div style={{width:"150px", margin:"auto", fontWeight:"bold", fontSize:"24px"}}>
                        Transactions
                    </div>
                </div>
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
