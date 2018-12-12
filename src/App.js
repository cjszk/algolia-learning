import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import algoliasearch from 'algoliasearch';

class App extends Component {
  constructor(props) {
    super(props);

    this.timeout = null;
    // (Application ID, API Key) <= this API Key is search only, the Admin API key should always be kept private in a hidden file in the back end.
    this.client = algoliasearch('MYVLLZQ39Z', '6ad836bf56dd6be5564d436f4b8b3eec');
    // Get the index from the algolia server
    this.index = this.client.initIndex('getstarted_actors');
    this.state = {
      results: {},
    }
  }

  onInputChange(query) {
    if (this.timeout) clearInterval(this.timeout);
    this.timeout = setTimeout(() => {
      this.index.search({query}, (err, results) => err ? console.log(err) : this.setState({results}));
    }, 2000)
  }

  renderResults() {
    const { results } = this.state;
    if (!results.hits) return (<div>No results to display!</div>);
    return results.hits.map((item) => (
      <div key={item.objectID} style={{display: 'flex', flexDirection: 'row', alignContent: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
        <div>
          <img style={{height: 100}} src={`https://image.tmdb.org/t/p/w154//${item.image_path}`} alt={item.name}/>
          <div>
            <p>Name: {item.name}</p>
            <p>Rating: {item.rating}</p>
          </div>
        </div>
      </div>
    ))
  }

  render() {
    console.log(this.state);

    return (
      <div className="App">
        <input style={{marginTop: 50, padding: 10, fontSize: 18}} onChange={(e) => this.onInputChange(e.target.value)}/>
        <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', marginTop: 20}}>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

export default App;
