let provider;
let signer;
let contract;
let userAddress;

const contractAddress = "0xe8a71E9bf2dA4371a076226fFe03fF4Af8C8a382";

const abi = [
  "function deposit(uint256 amount)",
  "function withdraw(uint256 amount)",
  "function balanceOf(address user) view returns (uint256)"
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  signer = await provider.getSigner();
  userAddress = await signer.getAddress();

  const code = await provider.getCode(contractAddress);
  if (code === "0x") {
    alert("❌ Aucun contrat à cette adresse sur ce réseau");
    return;
  }

  contract = new ethers.Contract(contractAddress, abi, signer);

  document.getElementById("account").innerText = userAddress;
  await updateBalance();
}

async function updateBalance() {
  const balance = await contract.balanceOf(userAddress);
  document.getElementById("balance").innerText = balance.toString();
}
