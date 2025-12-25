import { useState } from "react";
import { ethers } from "ethers";
import { TOKEN_ABI } from "./abi"; // same folder as index.js

const TOKEN_ADDRESS = "0x85C7f3E74154Ea90506079beb2f8D3000219944b";

export default function Home() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔗 Connect Wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      const contract = new ethers.Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        signer
      );

      const bal = await contract.balanceOf(address);
      setBalance(bal.toString()); // ✅ decimals = 0
    } catch (err) {
      console.error(err);
      alert("Wallet connection failed");
    }
  };

  // 🚀 Send Tokens
  const sendTokens = async () => {
    try {
      if (!to || !amount) {
        alert("Receiver address or amount missing");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        signer
      );

      const tx = await contract.transfer(
        to,
        Number(amount) // ✅ decimals = 0
      );

      await tx.wait();
      alert("Transaction successful 🎉");

      // 🔄 Refresh balance
      const newBalance = await contract.balanceOf(account);
      setBalance(newBalance.toString());

      setAmount("");
      setTo("");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>My Token DApp (Monad)</h1>

      <button onClick={connectWallet}>
        {account ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {account && (
        <>
          <p><b>Account:</b> {account}</p>
          <p><b>Balance:</b> {balance}</p>

          <h3>Send Tokens</h3>

          <input
            placeholder="Receiver address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />

          <input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />

          <button onClick={sendTokens} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </>
      )}
    </div>
  );
}
