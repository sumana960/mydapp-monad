// app.js
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/dist/ethers.min.js";

// 🔹 Adresse de TON contrat déployé
const contractAddress = "0xe8a71E9bf2dA4371a076226fFe03fF4Af8C8a382";

// 🔹 ABI minimal de MonadVault
const contractABI = [
  "function deposit(uint256 amount)",
  "function withdraw(uint256 amount)",
  "function balanceOf(address user) view returns (uint256)"
];

let provider;
let signer;
let contract;

// 🔹 Connexion MetaMask
async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask non détecté");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(contractAddress, contractABI, signer);

  const address = await signer.getAddress();
  document.getElementById("account").innerText = address;

  await updateBalance();
}

// 🔹 Dépôt
async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  const tx = await contract.deposit(amount);
  await tx.wait();
  await updateBalance();
}

// 🔹 Retrait
async function withdraw() {
  const amount = document.getElementById("withdrawAmount").value;
  const tx = await contract.withdraw(amount);
  await tx.wait();
  await updateBalance();
}

// 🔹 Lire le solde
async function updateBalance() {
  const address = await signer.getAddress();
  const balance = await contract.balanceOf(address);
  document.getElementById("balance").innerText = balance.toString();
}

// 🔹 Exposer les fonctions au HTML
window.connectWallet = connectWallet;
window.deposit = deposit;
window.withdraw = withdraw;
