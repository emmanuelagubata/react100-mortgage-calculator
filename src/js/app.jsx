import React from 'react';

export default class App extends React.Component {
  constructor(props) { // initial state is set here so that it can be referenced later in the rest of the code. 
    super(props);
    this.state = {
      balance: '',
      rate: '',
      term: '15', //since the term only has options of 15 and 30, its default state should be set to 15
      output: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateMortgage = this.calculateMortgage.bind(this);
    // this binds the states above so that it knows what it is changing
    // the functions are binded to the "this"
    //keyword, which allows for the currrent state of the value to be updated once new arguments
    //are passed through the new function that is called.
  }
  calculateMortgage() { // this initializes the states
    const balance = this.state.balance;
    const rate = this.state.rate;
    const term = this.state.term;
    const t = term * 12;
    const r = rate / 1200;
    const numerator = r * (Math.pow((1 + r), t));
    const denominator = (Math.pow((1 + r), t) - 1);
    const payment = (balance * (numerator / denominator)).toFixed(2);
    this.setState({ output: payment });// use "this.setState" and set the output to the payment so that the current state of payment can be updated.
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
      // this handles the change between your initial and altered values.
  }


  render() {
    return (
      <div>
        <div className='container'>
          <h3>Mortgage Calculator</h3>
          <div className="form-horizontal"></div>
          <label htmlFor='balance'>Loan Balance</label>
          <input  className="form-control" name='balance' type='number' value={ this.state.balance } onChange={ this.handleChange } ></input>
          <label htmlFor="APR-rate">Annual Percentage Rate (%)</label>

          <input  className="form-control" type='number' name='rate' onChange={ this.handleChange } value={ this.state.rate }></input>
        <label htmlFor="term">Loan Term (years)</label>
          <select name='term' onChange={ this.handleChange } value={ this.state.term }>Loan term(years)
          <option value='15'>15</option>
          <option value='30'>30</option>
        </select>
        <button name='submit' onClick={ this.calculateMortgage } >Calculate</button>
          <div name='output' id='output'>{`$${this.state.output} is your payment`}</div>
      </div>
      </div>
    );
  }
}
