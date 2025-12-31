// ===============================
// VARIABLES GLOBALES
// ===============================
let provider;
let signer;
let contract;
let userAddress;

// ⚠️ Adresse du contrat MonadVault DÉPLOYÉ
const contractAddress = "0xe8a71E9bf2dA4371a076226fFe03fF4Af8C8a382";

// ABI EXACTE de MonadVault
const abi = [
  "function deposit(uint256 amount)",
  "function withdraw(uint256 amount)",
  "function balanceOf(address user) view returns (uint256)"
];

// ===============================
// CONNECT WALLET
// ===============================
async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    provider = new ethers.BrowserProvider(window.ethereum);

    // demande connexion wallet
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();
    userAddress = await signer.getAddress();

    // 🔎 DEBUG : vérifier que le contrat existe
    const code = await provider.getCode(contractAddress);
    if (code === "0x") {
      alert("❌ Aucun contrat à cette adresse sur ce réseau");
      return;
    }

    contract = new ethers.Contract(contractAddress, abi, signer);

    document.getElementById("account").innerText = userAddress;

    await updateBalance();
  } catch (err) {
    console.error("connectWallet error:", err);
  }
}

// ===============================
// UPDATE BALANCE
// ===============================
async function updateBalance() {
  try {
    if (!contract || !userAddress) return;

    const balance = await contract.balanceOf(userAddress);

    document.getElementById("balance").innerText = balance.toString();
  } catch (err) {
    console.error("updateBalance error:", err);
    alert("Erreur balanceOf → réseau ou adresse incorrecte");
  }
}

// ===============================
// EXPORT POUR HTML (OBLIGATOIRE)
// ===============================
window.connectWallet = connectWallet;
