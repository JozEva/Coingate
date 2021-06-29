import React, { useState, useEffect } from 'react';

// Styles
import styles from './styles.module.css';
// Additional styles
import { makeStyles } from '@material-ui/core/styles';

// -----------------------------------------
// Material UI Components
import {
  TextField,
  MenuItem,
  Container,
  Box,
  InputBase,
  Divider,
  Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
// -----------------------------------------

// Icons for payment methods
import paypal from '../../images/icons/paypal.png';
import amazon from '../../images/icons/amazon.png';
import bank from '../../images/icons/bank.png';

// Additional styles
const useStyles = makeStyles(() => ({
  container: {
    padding: '0px 5px',
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    height: 20,
    margin: '0 0.5rem',
  },
}));

// Calculator
const CryptoCalculator = () => {

  // Input values to pay and buy
  const [payValue, setPayValue] = useState();
  const [buyValue, setBuyValue] = useState();

  // Select currency to pay with and buy what with default ones set on load
  const [payInCurrency, setPayInCurrency] = useState('EUR');
  const [buyInCurrency, setBuyInCurrency] = useState('BTC');

  // Payment method
  const [payment, setPayment] = useState('Bank transfer');

  // Success/Error  messages
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Error/Success message handle
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // On Submit validation
  const handleSubmit = e => {
    e.preventDefault();
    if (
      !payValue || isNaN(payValue)
      || !buyValue || isNaN(buyValue)
      || !payInCurrency || !buyInCurrency
    ) {
      setErrorMessage('Fields must contain ONLY numbers! Also be sure to select currencies to buy what and pay with!');
      setSuccessMessage('');
      setOpen(true);
    }
    else {
      setErrorMessage('')
      setSuccessMessage('Success!');
      setOpen(true)
    }
  }

  // API fetch and stored in 'items'
  const [items, setItems] = useState()

  const currencyAPI = 'https://api.coingate.com/v2/rates';

  useEffect(() => {
    fetch(currencyAPI)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err.message))
  }, []);

  const fetchedData = items;
  const currencyList = fetchedData ? Object.entries(fetchedData.trader.buy) : []
  const currencies = []
  for (let i = 0; i < currencyList.length; i++) {
    currencies.push(
      {
        name: currencyList[i][0],
      }
    )
  };

  // Helper functions
  const calculateByPay = () => {
    let cryptoPrice = payValue / fetchedData.trader.buy[buyInCurrency][payInCurrency];
    console.log('Calculate by pay: ', cryptoPrice)
    return cryptoPrice
  }

  const calculateByBuy = () => {
    let cryptoPrice = buyValue * fetchedData.trader.buy[buyInCurrency][payInCurrency];
    console.log('Calculate by buy: ', cryptoPrice)
    return cryptoPrice
  }

  // Handlers
  const handlePayCurrency = e => {
    setPayInCurrency(e.target.value)
    setBuyValue(calculateByPay())
  }

  const handleBuyCurrency = e => {
    setBuyInCurrency(e.target.value)
    setPayValue(calculateByBuy())
  }

  const handlePay = e => {
    setPayValue(e.target.value)
    setBuyValue(calculateByPay())
  }

  const handleBuy = e => {
    setBuyValue(e.target.value)
    setPayValue(calculateByBuy())
  }

  // Payment methods array
  const paymentMethods = [
    {
      name: "Bank transfer",
      icon: bank
    },
    {
      name: "PayPal",
      icon: paypal
    },
    {
      name: "Amazon",
      icon: amazon
    }
  ]

  const additionalStyles = useStyles();

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>

      {/* Margin for additional space */}
      <div className={styles.margin}></div>

      {/* Error/Success flash message */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleClose} severity={(errorMessage ? 'error' : 'success')}>
          {successMessage}
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Pay input/select */}
      <Container className={additionalStyles.container}>
        <Box borderRadius={16} className={styles.containerBox}>
          <div className={styles.innerText}>Pay</div>
          <InputBase
            className={styles.input}
            onChange={handlePay}
            value={payValue}
            defaultValue={payValue}
            disabled={!fetchedData ? true : false}
          >
            {payValue}
          </InputBase>
          <Divider className={additionalStyles.divider} orientation="vertical" />
          <TextField
            className={styles.selector}
            InputProps={{ disableUnderline: true }}
            select
            value={payInCurrency}
            onChange={handlePayCurrency}
            disabled={!fetchedData ? true : false}
          >
            {currencies.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                <div className={styles.iconAndFiatCurrency}>
                  
                  {/* Icons don't appear if the website providint API is down */}
                  <img src={`https://cryptoicons.org/api/icon/${option.name.toLowerCase()}/25`} alt="" />
                  <div>
                    {option.name}
                  </div>
                </div>
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Container>

      {/* Buy input/select */}
      <Container className={additionalStyles.container}>
        <Box borderRadius={16} className={styles.containerBox}>
          <div className={styles.innerText}>Buy</div>
          <InputBase
            className={styles.input}
            onChange={handleBuy}
            value={buyValue}
            defaultValue={buyValue}
            disabled={!fetchedData ? true : false}
          >
            {buyValue}
          </InputBase>
          <Divider className={additionalStyles.divider} orientation="vertical" />
          <TextField
            className={styles.selector}
            InputProps={{ disableUnderline: true }}
            select
            value={buyInCurrency}
            onChange={handleBuyCurrency}
            disabled={!fetchedData ? true : false}
          >
            {currencies.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                <div className={styles.iconAndFiatCurrency}>

                  {/* Icons don't appear if the website providint API is down */}
                  <img src={`https://cryptoicons.org/api/icon/${option.name.toLowerCase()}/25`} alt="" />
                  <div>
                    {option.name}
                  </div>
                </div>
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Container>

      <p className={styles.paymentMethod}>Payment method</p>

      {/* Payment method select */}
      <Container className={additionalStyles.container}>
        <Box borderRadius={16} className={styles.containerBox}>
          <TextField
            InputProps={{ disableUnderline: true }}
            select
            value={payment}
            onChange={e => setPayment(e.target.value)}
            fullWidth
            className={styles.paymentSelect}
          >
            {paymentMethods.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                <div className={styles.iconAndMethod}>
                  <img src={option.icon} alt="" />
                  <div>
                    {option.name}
                  </div>
                </div>
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Container>
      <button className={styles.buttonBuy}>Buy {buyInCurrency}</button>
    </form>
  )
}

export default CryptoCalculator
