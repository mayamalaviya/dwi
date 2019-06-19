import React, { Component } from 'react';

export default class WineList extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  
    this.state = {
      error: null,
      isLoaded: false,
      city: null,
      stateName: null,
    };
  }

  handleKeyUp(e) {
    // set state of zipcode
    
    if (e.target.value.length === 5) {
      var params = e.target.value;
    var url = ('https://www.wsjwine.com/api/address/zipcode/' + params);
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(
      result => {
        this.setState({
          isLoaded: true,
          city: result.response.city,
          stateName: result.response.stateName
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    } else {
      this.setState({
        isLoaded: false
      });
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    var params = event.target.zip.value;
    var url = ('https://www.wsjwine.com/api/address/zipcode/' + params);
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(
      result => {
        this.setState({
          isLoaded: true,
          city: result.response.city,
          stateName: result.response.stateName
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {

    const { error, city, stateName, isLoaded } = this.state;

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label>
              <span className="required">*</span> ZIP
            </label>

              <input 
                required 
                name="zip" 
                type="text" 
                onKeyUp={this.handleKeyUp}
                ref={(input) => this.input = input} 
              />
              {!isLoaded ? 
              <span style={{"font-style":"italic"}}>Enter ZIP to populate City and State</span> :
              <span className={isLoaded?'visible':'hidden'}>{city}, {stateName}</span>
              }
                <span style={stateName === "Connecticut"?{display:'block'}:{display:"none"}} className="message-ct">
                  Upon completion of this form, your order will be forwarded to The Wine Cellar, located in Wallingford, CT for processing and shipping.
                </span>
          </form>
        </div>
      )
    }
  }
}