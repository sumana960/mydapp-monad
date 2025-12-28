export const TOKEN_ABI = [
  // ERC20 standard
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",

  // Custom MyMonad
  "function applyOperation(uint8 operation)",
  "function getOperationHistory(address user) view returns (uint8[])",

  // Event
  "event OperationPerformed(address indexed user, uint8 operation, uint256 amountBefore, uint256 amountAfter)"
];
