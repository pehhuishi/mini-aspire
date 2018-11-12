import React, { Component } from 'react';
import axios from 'axios';
import './Loan.css';

class Loan extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: 0, duration: 0, repayment: 0 };
    this.handleChangeText = this.handleChangeText.bind(this);
  }
  handleChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = this.state;
    console.log(form);
    axios
      .post('http://localhost:8081/api/loan', {
        amount: this.state.amount,
        duration: this.state.duration,
        repayment: (
          parseFloat(this.state.amount) /
          parseFloat(this.state.duration * 12 * 4)
        ).toFixed(2)
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    const { amount, duration } = this.state;
    return (
      <div className="loan">
        <form onSubmit={this.handleSubmit}>
          <h2>How much do you need ?</h2>
          <p>Amount:</p>
          <input
            type="text"
            required
            name="amount"
            onChange={this.handleChangeText}
            value={this.state.amount}
          />
          <p>How long (Years) ? </p>
          <input
            type="number"
            onChange={this.handleChangeText}
            value={this.state.duration}
            name="duration"
            required
          />
          <p>Repayment weekly amount:</p>
          <input
            type="text"
            placeholder="Weekly / 7days"
            name="repayment"
            disabled
          />
          <br />
          <button
            onClick={() => {
              alert('You have succesfull submitted. Please wait for approval.');
            }}
          >
            Get Your Loan NOW
          </button>
        </form>
      </div>
    );
  }
}
export default Loan;
