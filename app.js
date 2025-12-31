import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/dist/ethers.min.js";

const contractAddress = "0xe8a71E9bf2dA4371a076226fFe03fF4Af8C8a382";

const abi = [
  "function deposit(uint256 amount)",
  "function withdraw(uint256 amount)",
  "function balanceOf(address user) view returns (uint256)"
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask non détecté");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();

  const account = await signer.getAddress();
  document.getElementById("account").innerText = account;

  contract = new ethers.Contract(contractAddress, abi, signer);
  await updateBalance();
}

async function updateBalance() {
  const account = await signer.getAddress();
  const balance = await contract.balanceOf(account);
  document.getElementById("balance").innerText = balance.toString();
}

async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  const tx = await contract.deposit(amount);
  await tx.wait();
  updateBalance();
}

async function withdraw() {
  const amount = document.getElementById("withdrawAmount").value;
  const tx = await contract.withdraw(amount);
  await tx.wait();
  updateBalance();
}

window.connectWallet = connectWallet;
window.deposit = deposit;
window.withdraw = withdraw;
