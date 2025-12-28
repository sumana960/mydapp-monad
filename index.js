import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

/* =========================
   CONFIG
========================= */
const CONTRACT_ADDRESS = "0x84338201F97e28Acd9ed93046d49c98B5D991853";

const ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function applyOperation(uint8 operation)"
];

/* =========================
   HTML ELEMENTS
========================= */
const connectBtn = document.getElementById("connectWallet");
const sendBtn = document.getElementById("send");

const accountEl = document.getElementById("account");
const balanceEl = document.getElementById("balance");

const toInput = document.getElementById("to");
const amountInput = document.getElementById("amount");

/* =========================
   GLOBAL VARS
========================= */
let provider;
let signer;
let contract;
let decimals;

/* =========================
   CONNECT WALLET
========================= */
connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("MetaMask non installé");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  const address = await signer.getAddress();
  accountEl.innerText = "Connected: " + address;

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  decimals = await contract.decimals();

  setTimeout(async () => {
    await refreshBalance();
    createOperationButtons();
  }, 300);
};

/* =========================
   REFRESH BALANCE
========================= */
async function refreshBalance() {
  const address = await signer.getAddress();
  const bal = await contract.balanceOf(address);
  balanceEl.innerText =
    "Balance: " + ethers.utils.formatUnits(bal, decimals);
}

/* =========================
   SEND TOKENS
========================= */
sendBtn.onclick = async () => {
  if (!contract) {
    alert("Connecte ton wallet d'abord");
    return;
  }

  const to = toInput.value;
  const amount = amountInput.value;

  if (!to || !amount) {
    alert("Champs manquants");
    return;
  }

  const tx = await contract.transfer(
    to,
    ethers.utils.parseUnits(amount, decimals)
  );

  await tx.wait();
  await refreshBalance();

  alert("Transfert confirmé");
};

/* =========================
   MONAD OPERATIONS
========================= */
function createOperationButtons() {
  if (document.getElementById("ops")) return;

  const ops = [
    { label: "DOUBLE", value: 1 },
    { label: "HALF", value: 2 },
    { label: "SQUARE", value: 3 },
    { label: "SQRT", value: 4 }
  ];

  const container = document.createElement("div");
  container.id = "ops";
  container.style.marginTop = "15px";

  ops.forEach(op => {
    const btn = document.createElement("button");
    btn.innerText = op.label;
    btn.style.marginRight = "8px";

    btn.onclick = async () => {
      const tx = await contract.applyOperation(op.value);
      await tx.wait();
      await refreshBalance();
      alert(op.label + " exécuté");
    };

    container.appendChild(btn);
  });

  document.body.appendChild(container);
}
