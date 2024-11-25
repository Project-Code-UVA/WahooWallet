import React, { useState } from 'react';
import styles from './BankAccount.module.css'; // Import the CSS Module

function BankAccountPage() {
    const [selectedAccount, setSelectedAccount] = useState(null);

    // Function to handle selecting an account
    const handleAccountClick = (account) => {
        setSelectedAccount(account);
    };

    // Function to return to the account list
    const handleBackClick = () => {
        setSelectedAccount(null);
    };

    const accounts = [
        { name: 'Bank Account 1', balance: '$1,234,567', details: { number: '123456789', routing: '987654321', rate: '1.5%' } },
        { name: 'Bank Account 2', balance: '$2,345,678', details: { number: '987654321', routing: '123456789', rate: '2.0%' }  },
        { name: 'Bank Account 3', balance: '$3,456,789', details: { number: '192837465', routing: '564738291', rate: '1.8%' } },
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
                    <button className={styles.sidebarTitle}>Sign Out</button>
                </div>
                <div className={styles.bankAccountContainer}>
                    {selectedAccount ? (
                        // Render the selected account details
                        <div className={styles.accountDetails}>
                            <button className={styles.backButton} onClick={handleBackClick}>
                                &larr; Back
                            </button>
                            <h2 className={styles.accountTitle}>{selectedAccount.name}</h2>
                            <p className={styles.accountBalance}>{selectedAccount.balance}</p>
                            <div className={styles.accountDetailsSection}>
                                <h3>Account Details</h3>
                                <p>Account Number: <span>{selectedAccount.details.number}</span></p>
                                <p>Routing Number: <span>{selectedAccount.details.routing}</span></p>
                                <p>Interest Rate: <span>{selectedAccount.details.rate}</span></p>
                            </div>
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