import React from 'react';
import WineList from './components/WineList';
import ZipLookup from './components/ZipLookup';
import './App.css';

class App extends React.Component {
  componentDidMount(){
    document.title = "Maya"
  }
  render() {
    return (
      <div>
      <WineList></WineList><br />
      <ZipLookup></ZipLookup>
      </div>
    )
  }
}

export default App;
