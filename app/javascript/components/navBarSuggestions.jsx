import React from "react";
import Rails from "@rails/ujs";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import { debounce } from "throttle-debounce";
import "../css/suggestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

class navBarSuggestions extends React.Component {
  state = {
    value: "",
    suggestions: [],
  };

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    );
  }

  renderSuggestion = (suggestion) => {
    return (
      <div className="result">
        <div className="">{suggestion}</div>
      </div>
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    console.log("value", value);
    Rails.ajax({
      url: `/api/v1/products/search/${encodeURI(value)}`,
      type: "GET",
      data: JSON,
      success: (resp) => {
        console.log(resp);
        const results = resp.map((h) => h.name);
        console.log(results);
        this.setState({ suggestions: results });
      },
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "輸入您想找的商品",
      value,
      onChange: this.onChange,
    };

    return (
      <form className="flex items-center">
        <Autosuggest
          className="inline-block"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <Link
          key={"SearchLink"}
          className="search_icon inline-block"
          to={`/products/search/${encodeURI(value)}`}
        >
          <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-white m-auto"
              type="submit"
            />
          </button>
        </Link>
      </form>
    );
  }
}

export default navBarSuggestions;
