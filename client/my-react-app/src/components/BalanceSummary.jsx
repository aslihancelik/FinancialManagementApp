// let's try to calculate and display the total balance across all accounts
const BalanceSummary = ({ account}) => {
    //sum up all account balances
    const totalBalance = account.reduce((sum, acc) => sum + acc.balance, 0);

    return (
        <div>
            <h2>Total Balance: ${totalBalance.toFixed(2)}</h2>
        </div>
    )
}

export default BalanceSummary;
