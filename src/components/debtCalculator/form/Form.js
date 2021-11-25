import { useState } from 'react';
import classes from './Form.module.css';

const Form = () => {

    const [loanType, setLoanType] = useState("");
    const [loanAmount, setLoanAmount] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [result, setResult] = useState({});
    const [loanName, setLoanName] = useState("");

    const submitCalculation = (e) => {
        e.preventDefault();

        setLoanName(loanType);

        if(loanAmount !== "" && loanTerm !== 0 && interestRate !== 0){
            calculate(loanAmount, loanTerm, interestRate);
        }  
    };
   
    const calculate = (loanAmount, loanTerm, interestRate) => {
     
        let monthRate = interestRate / 100 ;
        let top = +(loanAmount * monthRate).toFixed(2);
        let bottom = +(1 - (1 / Math.pow(monthRate + 1, loanTerm))).toFixed(2);
        let paymentAmount = +(top / bottom).toFixed(2);
        
        let interesPaid = +(loanAmount * monthRate).toFixed(2);
        let principalPaid = +(paymentAmount - interesPaid).toFixed(2);
        let remain = +(loanAmount - principalPaid).toFixed(2);

        let array = [
            {
                month: 1, 
                paymentAmount: paymentAmount, 
                interesPaid: interesPaid, 
                principalPaid: principalPaid, 
                remain: remain
            }
        ];

        for (let index = 2; index < loanTerm; index++) {

            interesPaid =  +(remain * monthRate).toFixed(2);
            principalPaid = +(paymentAmount - interesPaid).toFixed(2);
            remain = +(remain - principalPaid).toFixed(2);

            array.push(
                {
                    month:index, 
                    paymentAmount: paymentAmount, 
                    interesPaid: interesPaid, 
                    principalPaid: principalPaid, 
                    remain: remain
                }
            );
        }
            
        
        interesPaid =  +(remain * monthRate).toFixed(2);
        principalPaid = +(remain).toFixed(2);
        paymentAmount = +(principalPaid + interesPaid).toFixed(2);
        
        array.push(
            {
                month:loanTerm, 
                paymentAmount: paymentAmount, 
                interesPaid: interesPaid, 
                principalPaid: principalPaid, 
                remain: 0
            });
        
        setResult(array);
      
    }

    return (
        <>
            <div className={classes.form}>
                <form>
                    <div className={classes.inputs}>
                        <label>Type of loan</label>
                        <input type="text" placeholder={"Enter your loan type"} onChange={(e) => setLoanType(e.target.value)}/>
                    </div>
                    <div className={classes.inputs}>
                        <label>Loan Amount</label>
                        <input type="number" placeholder={"Enter your loan amount"} onChange={(e) => setLoanAmount(e.target.value)}/>
                    </div>
                    <div className={classes.inputs}>
                        <label>Loan term <span>(month)</span></label>
                        <input type="number" placeholder={"Enter your loan term"} onChange={(e) => setLoanTerm(e.target.value)}/>
                    </div>
                    <div className={classes.inputs}>
                        <label>Interest rate <span>(% per month)</span></label>
                        <input type="number" placeholder={"Enter your interest rate"} onChange={(e) => setInterestRate(e.target.value)}/>
                    </div>
                    <div className={classes.button}>
                        <button onClick={ (e) => submitCalculation(e) }>Calculate</button>
                    </div>
                </form>
                { loanName !== ""
                    ?
                    <div className={classes.loanType}>
                        Loan Name: <span> {loanName}</span>   
                    </div>
                    :
                    null
                }
                
                <div className={classes.result}>
                    {
                        result.length > 0 
                        ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Payment Amount</th>
                                    <th>Interest Paid</th>
                                    <th>Principal Paid</th>
                                    <th>Remain</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    result.map((month) => (
                                        <tr key={month.month}>
                                            <th>{month.month}</th>
                                            <th>{month.paymentAmount}</th>
                                            <th>{month.interesPaid}</th>
                                            <th>{month.principalPaid}</th>
                                            <th>{month.remain}</th>
                                        </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        null
                    }    
                </div>
            </div>   
        </>
    )
}

export default Form;