const contractAddress = "0x84338201F97e28Acd9ed93046d49c98B5D991853";

const contractABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask is not installed");
    return;
  }

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    const userAddress = await signer.getAddress();
    document.getElementById("account").innerText =
      "Connected: " + userAddress;

    contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    

    document.getElementById("balance").innerText =const balance = await contract.balanceOf(address);
const readable = ethers.utils.formatUnits(balance, 18);
document.getElementById("balance").innerText =
  "Balance: " + readable;

      "Balance: " + readableBalance;

  } catch (error) {
    console.error(error);
    alert("Error: make sure MetaMask is on the Monad network");
  }
}

document
  .getElementById("connectWallet")
  .addEventListener("click", connectWallet);
