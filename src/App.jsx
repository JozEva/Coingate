import './App.css';
import { Box } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import MainForm from './components/MainForm/MainForm';


function App() {
  return (
    <Box>
      <Navbar />
      <Box className="background" />
      <MainForm />
    </Box>
  );
}

export default App;
