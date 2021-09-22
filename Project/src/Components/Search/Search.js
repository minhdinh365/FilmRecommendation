import React, { Component } from "react";
import _debounce from 'lodash/debounce'
import axios from 'axios';
import Autosuggest from 'react-autosuggest'
import { Link } from 'react-router-dom'
import { URL_SEARCH, API_KEY_ALT , IMG_SIZE_XSMALL } from '../../API/const';


  // When suggestion is clicked, Autosuggest needs to populate the input based on the clicked suggestion. 

const getSuggestionValue = suggestion => {const newsuggest = suggestion.title

return newsuggest };

 const renderSuggestion = (suggestion) => (
    <div>
    <Link to= {`/movie/${suggestion.id}`}> 
        <img className="searchResult-image" alt="wrong" src= {( IMG_SIZE_XSMALL + suggestion.poster_path ) } />
        <div className="searchResult-text">
        <div className="searchResult-name">
              {suggestion.title}
        </div>
        <div className="searchResult-date">
            {suggestion.release_date.trim()}
        </div>
        </div>
      </Link>
    </div>
  );

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: []
    };
  }

    onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
  const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

          const url = URL_SEARCH + inputValue + API_KEY_ALT;

    /* eslint-disable no-console */

  return inputLength === 0 ? [] : axios.get(url).then(response => {
            this.setState({suggestions: response.data.results})
          }).catch(error => { console.log(`Error Message ${error}`)});
}

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }


  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a Movie Title',
      value,
      onChange: this.onChange
    };

    const onSuggestionsFetchRequested = _debounce((term) => {this.onSuggestionsFetchRequested(term) }, 1000);
/* eslint-disable */

    return (
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Search;