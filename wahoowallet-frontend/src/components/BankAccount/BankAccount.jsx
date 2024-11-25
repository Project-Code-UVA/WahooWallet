import React, { useState } from 'react';
import styles from './BankAccount.module.css'; // Import the CSS Module

function BankAccountPage() {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showAllTransactions, setShowAllTransactions] = useState(false);

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

    const accounts = [
        {
            name: 'Bank Account 1',
            balance: '$1,234,567',
            details: {
                number: '123456789',
                routing: '987654321',
                rate: '1.5%',
            },
            transactions: [
                { id: 1, description: 'Grocery Purchase', amount: -45.67 },
                { id: 2, description: 'Salary Credit', amount: 5000.0 },
                { id: 3, description: 'Utility Bill', amount: -100.0 },
            ],
        },
        {
            name: 'Bank Account 2',
            balance: '$2,345,678',
            details: {
                number: '987654321',
                routing: '123456789',
                rate: '2.0%',
            },
            transactions: [
                { id: 4, description: 'Online Shopping', amount: -150.89 },
                { id: 5, description: 'Freelance Payment', amount: 1200.0 },
                { id: 6, description: 'Gym Membership', amount: -50.0 },
            ],
        },
        {
            name: 'Bank Account 3',
            balance: '$3,456,789',
            details: {
                number: '192837465',
                routing: '564738291',
                rate: '1.8%',
            },
            transactions: [
                { id: 7, description: 'Coffee Shop', amount: -5.25 },
                { id: 8, description: 'Bookstore Purchase', amount: -20.0 },
                { id: 9, description: 'Dividend Credit', amount: 250.0 },
            ],
        },
    ];

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.titleSegment}>
                    <p className={styles.wahooTitle}>WahooWallet</p>                
                </div>
                <button className={styles.signOut}>Sign Out</button>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.sidebarContainer}>
                    <p className={styles.greetings}>Hi, {name}!</p>
                    <button className={styles.sidebarTitle}>User Profile</button>
                    <button className={styles.sidebarTitle}>Budget</button>
                    <button className={styles.sidebarTitle}>Ask AI</button>
                    <button className={styles.sidebarTitle}>Grubhub</button>
                    <button className={`${styles.sidebarTitle} ${styles.active}`}>Bank Account</button>
                </div>
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
            </div>
        </div>
    );
}

export default BankAccountPage;