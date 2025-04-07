import React, { useState } from 'react';
import styles from './BankAccount.module.css'; // Import the CSS Module
import { useAuth } from '../../auth/UserAuth';

function BankAccountPage() {
  const { user } = useAuth();

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showAllTransactions, setShowAllTransactions] = useState(false);

    // ADDED FOR DJANGO:
  // Example function to POST and create a new bank account on the server
  const handleAddAccount = () => {
    fetch('/api/add_account/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': '{{ csrf_token }}' // if CSRF is enabled on your Django site
      },
      body: JSON.stringify({
        // Provide any data your endpoint needs. Example:
        accountName: 'New Account',
        initialBalance: 0
      })
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Account added:', data);
        // Optionally update your local user/accounts state if desired
      })
      .catch((err) => {
        console.error('Error adding account:', err);
      });
  };

  // ADDED FOR DJANGO:
  // Example function to update a transaction category on the server
  const handleCategoryChange = (transactionId, newCategory) => {
    fetch('/api/update_transaction_category/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': '{{ csrf_token }}' // if CSRF is enabled on your Django site
      },
      body: JSON.stringify({
        transactionId,
        newCategory
      })
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Transaction category updated:', data);
        // If desired, update local state to reflect the new category
      })
      .catch((err) => {
        console.error('Error updating transaction category:', err);
      });
  };
  // END ADDED FOR DJANGO

    // Function to handle selecting an account
    const handleAccountClick = (account) => {
        setSelectedAccount(account);
        setShowAllTransactions(false); // Reset to show limited view by default
    };

    // Function to return to the account list
    const handleBackClick = () => {
        setSelectedAccount(null);
        setShowAllTransactions(false);
    };

    const handleToggleTransactions = () => {
        setShowAllTransactions((prev) => !prev); // Toggle transaction view
    };

    const accounts = user.accounts;

    return (
        <div className={styles.bankAccountContainer}>
            {selectedAccount ? (
                // Render the selected account details and last 3 transactions
                <div className={styles.accountDetails}>
                    <button className={styles.arrow} onClick={handleBackClick}>
                        &larr; Back
                    </button>
                    <h2 className={styles.accountTitle}>{selectedAccount.name}</h2>
                    {!showAllTransactions ? (
                    <>
                        <p className={styles.accountBalance}>{selectedAccount.balance}</p>
                            <div className={styles.accountDetailsSection}>
                                <h3>Account Details</h3>
                                <p>Account Number: <span>{selectedAccount.details.number}</span></p>
                                <p>Routing Number: <span>{selectedAccount.details.routing}</span></p>
                                <p>Interest Rate: <span>{selectedAccount.details.rate}</span></p>
                            </div>
                            <div className={styles.transactionsContainer}>
                                <div className={styles.transactionsHeader}>
                                    <h3 className={styles.transactionTitle}>See all transactions</h3>
                                    <button className={styles.arrow} onClick={handleToggleTransactions}>&rarr;</button>
                                </div>
                                <div className={styles.transactionsList}>
                                    {selectedAccount.transactions.slice(0,3).map((transaction) => ( 
                                        <div key={transaction.id} className={styles.transactionRow}>
                                            <span className={styles.transactionDescription}>
                                                {transaction.description}
                                            </span>
                                            <span className={styles.transactionAmount}>
                                                {transaction.amount.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </>
            ) : (
                /* When users click on see all transactions arrow button, the extended transaction list is rendered */
                    <>
                        <div className={styles.transactionList}>
                            {selectedAccount.transactions.map((transaction) => (
                                <div key={transaction.id} className={styles.transactionRow} >
                                    <div className={styles.transactionLeft}>
                                        <span className={styles.transactionDescription}>
                                            {transaction.description}
                                        </span>
                                        <span className={styles.transactionDate}>
                                            {transaction.date || 'No Date'}
                                        </span>        
                                    </div>
                                    <div className={styles.transactionRight}>
                                    <span className={styles.transactionCategory}>
                                        {/* Dropdown for category */}
                                        <select className={styles.categoryDropdown} defaultValue="">
                                            <option value="" disabled>Select category</option>
                                            <option value="grocery">Grocery</option>
                                            <option value="utility">Utility</option>
                                            <option value="salary">Salary</option>
                                        </select>
                                    </span>
                                    
                                    <span className={styles.transactionAmount}>
                                        {transaction.amount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            ) : (
                // If nothing is selected, then the list of accounts is rendered
                <>
                    <div className={styles.bankAccountHeader}>
                        <p className={styles.bankAccountTitle}>Bank Accounts: {accounts.length}</p>
                        <p className={styles.totalBalanceTitle}>$7,037,034</p>
                    </div>
                    <div className={styles.bankAccountList}>
                        {accounts.map((account, index) =>  (
                            <div key={index} className={styles.accountRow} onClick={() => handleAccountClick(account)}>
                                <span className={styles.accountName}>{account.name}</span>
                                <span className={styles.accountBalance}>
                                    {account.balance} <br />
                                    <span className={styles.balanceLabel}>Available balance</span>
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.addAccount}>
                        <span className={styles.plusSign}>+</span>
                    </div>
            </>
            )}
        </div>
    );
}

export default BankAccountPage;