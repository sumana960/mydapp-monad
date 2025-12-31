let provider;
let signer;
let contract;

const CONTRACT_ADDRESS = "0xTON_ADRESSE_DU_CONTRAT";
const ABI = [
  "function deposit(uint256)",
  "function withdraw(uint256)",
  "function balanceOf(address) view returns (uint256)"
];

async function connect() {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  updateBalance();
}

async function updateBalance() {
  const address = await signer.getAddress();
  const balance = await contract.balanceOf(address);
  document.getElementById("balance").innerText = balance;
}

async function deposit() {
  const amount = document.getElementById("amount").value;
  const tx = await contract.deposit(amount);
  await tx.wait();
  updateBalance();
}

async function withdraw() {
  const amount = document.getElementById("amount").value;
  const tx = await contract.withdraw(amount);
  await tx.wait();
  updateBalance();
}
