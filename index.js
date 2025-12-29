const CONTRACT_ADDRESS = "0x84338201F97e28Acd9ed93046d49c98B5D991853";

let provider;
let signer;
let contract;

async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    const address = await signer.getAddress();
    document.getElementById("account").innerText =
      "Connected: " + address;

    contract = new ethers.Contract(CONTRACT_ADDRESS, TOKEN_ABI, signer);

    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(address);
    const readable = ethers.utils.formatUnits(balance, decimals);

    document.getElementById("balance").innerText =
      "Balance: " + readable;
  } catch (err) {
    console.error("Error reading balance:", err);
    alert("Make sure MetaMask is on the Monad network and the address is correct.");
  }
}

document
  .getElementById("connectWallet")
  .addEventListener("click", connectWallet);
