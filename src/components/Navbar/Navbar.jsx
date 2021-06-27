import React from 'react';

// Styles
import styles from './styles.module.css'

// Material UI Components
import {
  AppBar,
  Toolbar,
  Box
} from '@material-ui/core';

// Logo import
import logo from "../../images/logo.png";

const Navbar = () => {

  return (
    <AppBar className={styles.navbar} position="fixed" color="default">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%" >
          <Box display="flex">
            <img className={styles.image} src={logo} alt="" />
            <ul className={styles.links}>
              <li className={styles.linkItem}><a className={styles.link} href="https://www.coingate.com/">Products</a></li>
              <li className={styles.linkItem}><a className={styles.link} href="https://www.coingate.com/">Recources</a></li>
              <li className={styles.linkItem}><a className={styles.link} href="https://www.coingate.com/">Buy Instantly</a></li>
            </ul>
          </Box>
          <Box display="flex">
            <div className={styles.burger}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className={styles.buttons}>
              <li className={styles.buttonLogin}><a className={styles.button} href="https://dashboard.coingate.com/login">Log In</a></li>
              <a className={styles.buttonSignup} href="https://dashboard.coingate.com/register">Sign up</a>
            </ul>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
