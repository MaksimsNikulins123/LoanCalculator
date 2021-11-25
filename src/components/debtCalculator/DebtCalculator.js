import Header from './header/Header';
import classes from './DebtCalculator.module.css';
import Form from './form/Form';
import Footer from './footer/Footer';

const DebtCalculator = () => {
    return (
        <div className={classes.debtCalculator}>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}

export default DebtCalculator;
