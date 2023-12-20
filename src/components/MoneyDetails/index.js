// Write your code here
import './index.css'
const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expencesAmount} = props

  return (
    <div className="money-details-container">
      <div className="balance-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="card-img"
        />
        <div>
          <p className="card-text">Your Balance</p>
          <p className="card-amount" data-testid="balanceAmount">Rs {balanceAmount}</p>
        </div>
      </div>
      <div className="income-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="card-img"
        />
        <div>
          <p className="card-text">Your Income</p>
          <p className="card-amount" data-testid="incomeAmount">Rs {incomeAmount}</p>
        </div>
      </div>
      <div className="expenses-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="card-img"
        />
        <div>
          <p className="card-text">Your Expenses</p>
          <p className="card-amount">Rs{expencesAmount}</p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
