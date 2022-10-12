import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import Login from "./components/Login";
import { contractAbi, contractAddress } from "./lib/constant";

const getRandomContract = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return contract;
};

function App() {
  const [currentAccount, setCurrentAccount] = useState();
  const [randomNumber, setRandomNumber] = useState(0);

  const connectWallet = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setCurrentAccount(accounts[0]);
    } else {
      return alert("please connect to your metamask wallet");
    }
  };

  const generateNumber = async () => {
    const result = await getRandomContract().Generate_Number();
    await result.wait();
    initialize();
  };

  const initialize = async () => {
    const result = await getRandomContract().rand_number();
    setRandomNumber(result);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="App">
      {currentAccount ? (
        <div>
          <p>wallet address: {currentAccount}</p>
          {randomNumber}
          <button onClick={generateNumber}>Genrate Number</button>
        </div>
      ) : (
        <Login connectWallet={connectWallet} />
      )}
    </div>
  );
}

export default App;
