import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { TOKEN_ABI } from "./abi.js";

const TOKEN_ADDRESS = "0x85C7f3E74154Ea90506079beb2f8D3000219944b";

const connectBtn = document.getElementById("connectWallet");
const sendBtn = document.getElementById("send");
const accountP = document.getElementById("account");
const balanceP = document.getElementById("balance");

const toInput = document.getElementById("to");
const amountInput = document.getElementById("amount");

let provider;
let signer;
let token;
let decimals;

// 🔗 CONNECT WALLET
connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  const address = await signer.getAddress();
  accountP.innerText = "Connected: " + address;

  token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
  decimals = await token.decimals();

  const balance = await token.balanceOf(address);
  balanceP.innerText =
    "Balance: " + ethers.utils.formatUnits(balance, decimals);
};

// 🚀 SEND TOKENS
sendBtn.onclick = async () => {
  if (!token) {
    alert("Connect wallet first");
    return;
  }

  const to = toInput.value;
  const amount = amountInput.value;

  if (!to || !amount) {
    alert("Missing fields");
    return;
  }

  const tx = await token.transfer(
    to,
    ethers.utils.parseUnits(amount, decimals)
  );

  alert("Transaction sent: " + tx.hash);
};
