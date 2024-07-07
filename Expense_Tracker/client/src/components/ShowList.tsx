import React, { useEffect, useState } from "react";
import IDataList from "../models/IDataList";
import { getItemsData } from "../services/itemService";
import '../App.css';
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

export default function ShowList(){
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [sum, setSum] = useState<number|null>(0);
    const [rahulSpent, setRahulSpent] =  useState<number>(0);
    const [rameshSpent, setRameshSpent] =  useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

     useEffect(()=>{
        console.log("in use-effect");
       const fetchItemsData =  async () =>{
       try{
        const data = await getItemsData();
       console.log(data);
       setItems(data);
       ccalulateOnitems(data);
    }
       catch(error: any){
        console.error(error);
        setError(error);
       }
     }
 fetchItemsData();
       

},[]);

const ccalulateOnitems =(data:IDataList[]) => {

    var rahulspent1 : number = 0;
    var rameshspent1 : number = 0;
    data.map((item) => 
            item.payeeName === "Rahul" ? 
            (rahulspent1 = rahulspent1 + item.price)
            :(rameshspent1 = rameshspent1 + item.price)
);            
        
    
    setRahulSpent(rahulspent1);
    setRameshSpent(rameshspent1);
    setSum(rahulSpent+rameshSpent);

};


 const getTableHeaders = () => {
    return(
        <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>Payee</div></>
    )
    }
    const renderExpenses = (expense:IDataList) => {
        return(
            <div key = {expense.id}>
            <div className="use-inline date">Date</div>
            <div className="use-inline">Product Purchased</div>
            <div className="use-inline price">Price</div>
            <div className="use-inline" style={{ width: 112 }}>Payee</div>
        </div>
        )

    }

    const renderSummary = () => {
        return <>
        <div className="use-inline">Total</div>
        <div className="use-inline total">{sum}</div><br/>
        <div className="use-inline">Rahul</div>
        <div className="use-inline total Rahul">{rahulSpent}</div><br />
        <div className="use-inline">Ramesh Paid:</div>
        <div className="use-inline total Ramesh">{rameshSpent}</div> <br />
        <span className="use-inline payable price">{Math.abs(rahulSpent-rameshSpent)/2}</span>
        </>
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            {/* Add button */}
            <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <ExpenseTrackerForm onClose={()=>setShowForm(false)}></ExpenseTrackerForm>
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{width: 112}}>Payee</div>
            </>
            {
                items && items.map ((user,idx)=>{
                    return (<div key={idx}>
                        <div className="use-inline date">{user.setDate}</div>
                        <div className="use-inline">{user.product}</div>
                        <div className="use-inline price">{user.price}</div>
                        <div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
                    </div>)
                })
            }
        <hr/>
        <div className="use-inline ">Total: </div>
        <span className="use-inline total">{sum}</span> <br />
        <div className="use-inline ">Rahul paid: </div>
        <span className="use-inline total Rahul">{rahulSpent}</span> <br />
        <div className="use-inline ">Ramesh paid: </div>
        <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
        <span className="use-inline payable">{rahulSpent>rameshSpent? "Pay Rahul " : "Pay Ramesh"}</span>
        <span className="use-inline payable price"> {Math.abs((rahulSpent-rameshSpent)/2)}</span>
        {
               error && (
                    <>
                        {error?.message}
                    </>
                )
            } 
        </>
    );
}