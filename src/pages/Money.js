import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Money = () => {
    const [moneyData, setMoneyData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/money')
            .then(response => {
                setMoneyData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="money-page">
            <div className="money-container">
                <h1 className="money-title">Top Billionaires</h1>
                <table className="money-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moneyData.map((person) => (
                            <tr key={person.id}>
                                <td>{person.name}</td>
                                <td>{person.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Money;
