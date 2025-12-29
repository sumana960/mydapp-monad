const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)",
  "function mint(address,uint256)",
  "function applyOperation(uint8)", // enum Operation
  "function getOperationHistory(address) view returns (uint8[])",
  "event OperationPerformed(address indexed user,uint8 operation,uint256 amountBefore,uint256 amountAfter)"
];
