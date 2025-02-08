


export function generateTransactionHash() {
  return "0x" + Math.random().toString(16).substr(2, 64);
}


export function saveInvestmentToBlockchain(investment) {
  const transactions = JSON.parse(localStorage.getItem("blockchainTransactions")) || [];

  const newTransaction = {
    txHash: generateTransactionHash(),
    timestamp: new Date().toISOString(),
    projectName: investment.projectName,
    amount: investment.amount,
    investor: investment.investor, 
  };

  transactions.push(newTransaction);
  localStorage.setItem("blockchainTransactions", JSON.stringify(transactions));

  return newTransaction;
}


export function getBlockchainTransactions() {
  return JSON.parse(localStorage.getItem("blockchainTransactions")) || [];
}

  