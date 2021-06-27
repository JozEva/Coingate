import React, { useState, useEffect, useMemo } from 'react'

// Styles
import styles from './styles.module.css'
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
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
// -----------------------------------------

// Icons for payment methods
import paypal from '../../images/icons/paypal.png'
import amazon from '../../images/icons/amazon.png'
import bank from '../../images/icons/bank.png'

// Additional styles
const useStyles = makeStyles(() => ({
  container: {
    padding: '0px 5px',
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    height: 20,
    margin: '0 1rem',
  },
}));

// Calculator
const CryptoCalculator = () => {

  // Input values to pay and buy
  const [payValue, setPayValue] = useState('');
  const [buyValue, setBuyValue] = useState('');

  // Select currency to pay with and buy what
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

  const [items, setItems] = useState()

  const API = 'https://api.coingate.com/v2/rates';
 useEffect(()=> {
   fetch(API)
   .then(res=>res.json())
   .then(data => setItems(data))
   .catch(err => console.log(err.message))
 }, [])

  const currencies = useMemo(() => {
    const fetchedData = items;
    const currencyList = fetchedData ? Object.entries(fetchedData.merchant) : []
    const currencies = []
    if (!items) return []
    for (let i = 0; i < currencyList.length; i++) {
      currencies.push(
        {
          name: currencyList[i][0],
          val: currencyList[i][1]
        }
        )
      };
      return currencies
    }, [items])
    

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
          <InputBase className={styles.input} onChange={e => setPayValue(e.target.value)}>
            {payValue}
          </InputBase>
          <Divider className={additionalStyles.divider} orientation="vertical" />
          <TextField
            className={styles.selector}
            InputProps={{ disableUnderline: true }}
            select
            value={payInCurrency}
            onChange={e => setPayInCurrency(e.target.value)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Container>

      {/* Buy input/select */}
      <Container className={additionalStyles.container}>
        <Box borderRadius={16} className={styles.containerBox}>
          <div className={styles.innerText}>Buy</div>
          <InputBase className={styles.input} onChange={e => setBuyValue(e.target.value)}>
            {buyValue}
          </InputBase>
          <Divider className={additionalStyles.divider} orientation="vertical" />
          <TextField
            className={styles.selector}
            InputProps={{ disableUnderline: true }}
            select
            value={buyInCurrency}
            onChange={e => setBuyInCurrency(e.target.value)}

          >
            {currencies.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
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
                <div className={styles.iconAndName}>
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
