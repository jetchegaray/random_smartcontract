interface Props {
  connectWallet: () => void;
}

const Login = ({ connectWallet }: Props) => {
  return (
    <div>
      <h1>Welcome to goerli testnet : Random Number Generator</h1>
      <button onClick={connectWallet}>Login Metamask</button>
    </div>
  );
};

export default Login;
