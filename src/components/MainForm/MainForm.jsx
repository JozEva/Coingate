import React from 'react'

// Styles
import styles from './styles.module.css'

// Material UI Components
import {
  Container,
  Box,
  Button
} from '@material-ui/core'

// Other imports...
import CryptoCalculator from '../CryptoCalculator/CryptoCalculator'

const MainForm = () => {

  return (
    <Container>
      <Box className={styles.container}>

        {/* Header text and additional text section */}
        <Box className={styles.title}>
          <span>Buy Bitcoin, </span>
          <span>Ethereum, Litecoin and other crypto</span>
          <span> online</span>
          <Box className={styles.maxWidth}>
            <Box className={styles.text}>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio numquam repellendus praesentium iusto vel nam ipsam aperiam neque odit mollitia, dolore, earum incidunt illum recusandae facilis debitis perferendis nihil nemo, aliquam accusantium itaque voluptatem reiciendis quia asperiores. Sint officiis sunt aliquam dolor eius libero quod voluptatibus! Nisi, ratione nostrum. Facere?</p>
              <Button className={styles.button}>Start now</Button>
            </Box>
          </Box>
        </Box>
        {/* ---------------------------------------- */}

        {/* Calculator form section */}
        <Box className={styles.secondSection}>
          <Box className={styles.formBackground} />
          <Box className={styles.cryptoForm}>
            <CryptoCalculator />
          </Box>
          <Box className={styles.minWidth}>
            <Box className={styles.text}>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio numquam repellendus praesentium iusto vel nam ipsam aperiam neque odit mollitia, dolore, earum incidunt illum recusandae facilis debitis perferendis nihil nemo, aliquam accusantium itaque voluptatem reiciendis quia asperiores. Sint officiis sunt aliquam dolor eius libero quod voluptatibus! Nisi, ratione nostrum. Facere?</p>
              <Button className={styles.minWidthButton}>Start now</Button>
            </Box>
          </Box>
        </Box>
        {/* ---------------------------------------- */}

      </Box>
    </Container >
  )
}

export default MainForm
