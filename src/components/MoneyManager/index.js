import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({
      transactionsList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleIput = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpences = () => {
    const {transactionsList} = this.state
    let expencesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expencesAmount += eachTransaction.amount
      }
    })
    return expencesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expencesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expencesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expencesAmount
    return balanceAmount
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expencesAmount = this.getExpences()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="header-heading">Hi, Richard</h1>
            <p className="header-description">
              Welcome back to your
              <span className="money-manager-text"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expencesAmount={expencesAmount}
          />
          <div className="transaction-details-container">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-header">Add Transaction</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                placeholder="TITLE"
                className="input"
                onChange={this.onChangeTitleIput}
              />
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input"
                value={amountInput}
                placeholder="AMOUNT"
                onChange={this.onChangeAmountInput}
              />
              <label className="label" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1 className="history-header">History</h1>
              <div className="history-transaction-table-container">
                <ul className="transaction-table-headers-list">
                  <li className="table-headers">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
