let provider;
let signer;
let contract;
let userAddress;

const contractAddress = "0xe8a71E9bf2dA4371a076226fFe03fF4Af8C8a382";

const abi = [
  "function deposit() payable",
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

  contract = new ethers.Contract(contractAddress, abi, signer);

  document.getElementById("account").innerText = userAddress;
  updateBalance();
}

async function updateBalance() {
  const bal = await contract.balanceOf(userAddress);
  document.getElementById("balance").innerText =
    ethers.formatEther(bal);
}

// ✅ DEPOT NATIVE
async function deposit() {
  const amount = document.getElementById("amount").value;

  const tx = await contract.deposit({
    value: ethers.parseEther(amount)
  });

  await tx.wait();
  updateBalance();
}

// ✅ RETRAIT NATIVE
async function withdraw() {
  const amount = document.getElementById("amount").value;

  const tx = await contract.withdraw(
    ethers.parseEther(amount)
  );

  await tx.wait();
  updateBalance();
}
