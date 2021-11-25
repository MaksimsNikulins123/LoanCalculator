import classes from './Result.module.css';

const Result = () => {
    return (
        <div className={classes.result}>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Payment Amount</th>
                        <th>Interest Paid</th>
                        <th>Principal Paid</th>
                        <th>Remain</th>
                    </tr>
                    <tr>
                        <th>0</th>
                        <th>429.81</th>
                        <th>25.00</th>
                        <th>404.81</th>
                        <th>9.595.19</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default Result;