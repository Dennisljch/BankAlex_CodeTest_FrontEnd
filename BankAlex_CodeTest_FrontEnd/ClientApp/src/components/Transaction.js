import React, { useState, useEffect } from 'react';

function Transaction({match}){
    console.log(match.params.id);

    const BackToAllTransactions = () => {

    }

    return (
        <>
            <div><a href="#" onClick={() => BackToAllTransactions()}>Back</a></div>
            <div>{match.params.id} Is Coming Soon</div>
        </>
    )
}

export default Transaction;