import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import '../custom.css'


function Transaction({match}){

    const DescriptionInput = {
        width:"250px",
        height:"80px",
        padding:"5px",
        resize: "none",
    }

    const ErrorBorder = {
        border:"2px solid red"
    }
    
    const newTransaction = match.params.id == '0';
    const transactionId = match.params.id;

    const [owners, setOwners] = useState([]);
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('0.0');
    const [date, setDate] = useState('2000-01-01T12:00');
    const [ownerId, setOwnerId] = useState('');
    const [owner, setOwner] = useState('');
    const [fromAccountValid, setFromAccountValid] = useState(true);
    const [toAccountValid, setToAccountValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [amountValid, setAmountValid] = useState(true);
    const [formValid, setFormValid] = useState(true);

    useEffect(() => {
        PopulateOwners();
        PopulateTransaction();
    },[]);

    const PopulateTransaction = async() => {
        if (!newTransaction) {
            const data = await fetch(`/Transactions/${transactionId}`);
            const json = await data.json();
            setFromAccount(json.fromAccount);
            setToAccount(json.toAccount);
            setDescription(json.description);
            setAmount(json.amount);
            setDate(json.date);
            setOwnerId(json.ownerId);
            setOwner(json.owner);
        }
    }

    //dummy data
    const PopulateOwners = () => {
        var owners = [
            {id: "6976fe63-c665-445b-835c-42dabe9fa3b6", name:"Jane Smith"},
            {id: "6976fe63-c665-445b-835c-42dabe9fa3b9", name:"Alex Smith"}
        ];
        setOwners(owners);
    }

    const BackToAllTransactions = () => {
        window.location.replace(`/AllTransactions`);
    }

    //https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid/22856022
    const uuidv4 = () => {
        const a = crypto.getRandomValues(new Uint16Array(8));
        let i = 0;
        return '00-0-4-1-000'.replace(/[^-]/g, 
                s => (a[i++] + s * 0x10000 >> s).toString(16).padStart(4, '0')
        );
    }

    const SaveTransaction = () => {
        ResetFormValid();
        if (FormValid())
        {
            if(newTransaction){
                CreateNewTransaction();
            }
            else{
                UpdateExistingTransaction();
            }
        }
    }

    const ResetFormValid = () => {
        setFromAccountValid(true);
        setToAccountValid(true);
        setDescriptionValid(true);
        setAmountValid(true);
        setFormValid(true)
    }

    const FormValid = () => {
        const bsbPattern = /[0-9]{3}-?[0-9]{3}/;

        let fromAccountValidNow = bsbPattern.test(fromAccount);
        let toAccountValidNow = bsbPattern.test(toAccount);
        let descriptionValidNow = description.length > 0;
        let amountValidNow = !isNaN(parseFloat(amount));
        let formValidNow = fromAccountValidNow && toAccountValidNow && descriptionValidNow && amountValidNow;

        setFromAccountValid(fromAccountValidNow);
        setToAccountValid(toAccountValidNow);
        setDescriptionValid(descriptionValidNow);
        setAmountValid(amountValidNow);
        setFormValid(formValidNow);
        
        return formValidNow;
    }

    const CreateNewTransaction = () => {
        let newTransaction = {
            id: transactionId == "0" ? uuidv4() : transactionId,
            fromAccount: fromAccount,
            toAccount: toAccount,
            description: description,
            amount: amount,
            date:date,
            ownerId: ownerId == "" ? uuidv4() : ownerId,
            owner: owner
        }

        $.ajax({
            url: '/Transactions', 
            type: 'post', 
            data: JSON.stringify(newTransaction),
            contentType: "application/json; charset=utf-8",
            success: function () {
                alert('Item Created');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error');
            }
        });     
    }
    
    const UpdateExistingTransaction = () => {
        let currentTransaction = {
            id: transactionId,
            fromAccount: fromAccount,
            toAccount: toAccount,
            description: description,
            amount: amount,
            date:date,
            ownerId: ownerId,
            owner: owner
        }

        $.ajax({
            url: `/Transactions/${transactionId}`, 
            type: 'put', 
            data: JSON.stringify(currentTransaction),
            contentType: "application/json; charset=utf-8",
            success: function () {
                alert('Item Updated');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error');
            }
        });
    }

    const OnFromAccountChange = e => {
        setFromAccount(e.target.value);
    }

    const OnToAccountChange = e => {
        setToAccount(e.target.value);
    }

    const OnDescriptionChange = e => {
        setDescription(e.target.value);
    }

    const OnAmountChange = e => {
        setAmount(e.target.value);
    }

    const OnDateChange = e => {
        setDate(e.target.value);
    }

    const OnOwnerChange = e => {
        setOwnerId(e.target.value);
    }
    
    const ErrorMessage = () => (
        <div className="alert alert-warning alert-dismissible" style={{width:"500px", margin:"auto"}}>
            { fromAccountValid? null : <div>From Account should be xxx-xxx</div>}
            { toAccountValid? null : <div>To Account should be xxx-xxx</div> }
            { descriptionValid? null: <div>Description is required</div> }
            { amountValid? null : <div>Amount is a number</div>}
        </div>
    )

    return (
        <div className="MainTable">
            {formValid ? null : <ErrorMessage/>}
            <div style={{paddingTop:"20", textAlign:"center"}}>
                <div style={{fontWeight:"bold", fontSize:"24px"}}>
                    {newTransaction ? "Create New Transaction" : "Edit Transasion"}
                </div>
            </div>
            <div style={{width:"320px", margin:"auto"}}>          
                <div>
                    <div>
                        <div>From: </div>
                        <div>
                            <input style={(fromAccountValid? null : ErrorBorder)} placeholder="(xxx-xxx)" 
                                    type="text" value={fromAccount} onChange={OnFromAccountChange}/>
                        </div>
                    </div>
                    <div>
                        <div>To: </div>
                        <div>
                            <input style={(toAccountValid? null : ErrorBorder)} placeholder="(xxx-xxx)" 
                                    type="text" value={toAccount} onChange={OnToAccountChange}/>
                        </div>
                    </div>
                    <div>
                        <div>Description: </div>
                        <div>
                            <textarea style={(descriptionValid? DescriptionInput : {...DescriptionInput, ...ErrorBorder})} 
                                    placeholder="(required)" value={description} onChange={OnDescriptionChange}></textarea>
                        </div>
                    </div>
                    <div>
                        <div>Amount: </div>
                        <div>
                            <input style={(amountValid? null : ErrorBorder)} type="text" 
                                value={amount} onChange={OnAmountChange}/>
                        </div>
                    </div>
                    <div>
                        <div>Date: </div>
                        <div>
                            <input type="datetime-local" value={date} onChange={OnDateChange}/>
                        </div>
                    </div>
                    <div>
                        <div>Owner: </div>
                        <div>
                            <select value={ownerId} onChange={OnOwnerChange} style={{width:"180px", height:"30px"}}>
                                {
                                    owners.map(
                                        item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div style={{margin:"10px 0px"}}>
                    <button className="btn btn-success" onClick={SaveTransaction}>{newTransaction ? "Create" : "Update"}</button>
                    <button className="btn btn-light" style={{float:"right"}} onClick={BackToAllTransactions}>Back</button>
                </div>      
            </div>            
        </div>
    )
}

export default Transaction;