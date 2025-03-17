// let's try to calculate and display the total balance across all accounts
const BalanceSummary = ({ accounts = [] }) => {
    //sum up all account balances
    const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

    return (
      <div>
        <h2>
          Total Balance: {" "}
          {totalBalance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h2>
      </div>
    );
};

export default BalanceSummary;
