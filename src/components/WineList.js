import React, { Component } from 'react';

export default class WineList extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      error: null,
      isLoaded: false,
      mainItems: [],
      selected: null
    };
  }

  componentDidMount() {
    fetch('https://www.wsjwine.com/api/offer/0033008')
    .then(res => res.json())
    .then(
      result => {
        this.setState({
          isLoaded: true,
          mainItems: result.response.mainItems
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  handleChange(e) {
    this.setState({
      selected: e.target.value
    })
  }

  render() {
    const { error, isLoaded, mainItems, selected } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="panel-header">
                <h3 className="panel-title">Which Case Would You Like?</h3>          
              </div>
                <p className="panel-body">
                  Whatever you choose, we'll add in two bonus Cabs and two crystal glasses and you'll have the complete package - worth over $250 - for ONLY $69.99 (plud $19.99 shipping & applicable tax; please allow 5-10 days for delivery, depending on shipping state).
                </p>
                <ul>
                {mainItems.map(item => (
                  <li key={item.product.name}>
                    <label>
                      <input type="radio" checked={this.state.selected === item.product.name} onChange={this.handleChange} value={item.product.name}/>
                      <span>
                        {item.product.name} &nbsp;
                      </span>
                      <span>
                        + 2 BONUS Bottles & Glasses &nbsp;
                      </span>
                      <span>
                        JUST ${item.listPrice} &nbsp; <a href='#'>view wines</a>
                      </span>
                    </label>
                    
                  </li>
                ))}
                </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}
