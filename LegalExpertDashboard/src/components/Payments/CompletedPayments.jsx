import React from "react";
import { examplePaymentJSON } from "./Example";
import "./Payments.css";

const CompletedPayments = () => {
  const successfulTransactions = examplePaymentJSON.filter(
    (transaction) => transaction.amicuscueStatus === "Completed"
  );

  return (
    <div className="payments-main-container">
      <h2>Successful Payments</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Payer Name</th>
            <th>Amount (INR)</th>
            <th>Transaction ID</th>
            <th>Reference ID</th>
            <th>Transaction Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {successfulTransactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.payer.name}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionId}</td>
              <td>{transaction.referenceId}</td>
              <td>
                {new Date(transaction.transactionTimestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedPayments;
