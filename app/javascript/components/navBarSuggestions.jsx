import React from "react";
import Rails from "@rails/ujs"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Autosuggest from 'react-autosuggest'
import { debounce } from 'throttle-debounce'
import "../css/suggestion"
// const NavBarSuggestions = () => {
//   const [value, setvalue] = useState('');
//   const [suggestions, setsuggestions] = useState([]);

//   const renderSuggestion = (suggestion) => {
//     return (
//       <div >
//         <div>{suggestion}</div>
//         {/* <div className="shortCode">{suggestion.shortCode}</div> */}
//       </div>
//     )
//   }

//   // const onChange = (event, {newValue} ) => {
//   //   setvalue(() => { value: newValue } );
//   // }
//   const onChange = (event) => {
//     setvalue(() => { value: event.target.value } );
//   }

//   let onSuggestionsFetchRequested = ({ value }) => {
//     console.log("value",value);
//       Rails.ajax({
//         url: `api/v1/products/search/${value}`,
//         type: 'GET',
//         data: JSON,
//         success: resp => {
//           // console.log(resp);
//           const results = resp.map(h => h.name)
//           console.log(results);
//           setsuggestions(() => {  results });
//         }
//       })
//   }

//   const onSuggestionsClearRequested = () => {
//     // setsuggestions(() => { []});
//   }

//   const inputProps = {
//     placeholder: '搜尋',
//     value,
//     onChange: onChange
//   }
//   return(
//     <><h1>AutoComplete Demo</h1><Autosuggest
//       suggestions={suggestions}
//       onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//       onSuggestionsClearRequested={onSuggestionsClearRequested}
//       getSuggestionValue={suggestion => suggestion}
//       renderSuggestion={renderSuggestion}
//       inputProps={inputProps} /></>
//   )
// }


class navBarSuggestions extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500">{suggestion}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    console.log( "value",value );
    Rails.ajax({
              url: `/api/v1/products/search/${encodeURI(value)}`,
              type: 'GET',
              data: JSON,
              success: resp => {
                console.log(resp);
                const results = resp.map(h => h.name)
                console.log(results);
                this.setState({ suggestions: results })
              }
            })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: '搜尋產品',
      value,
      onChange: this.onChange
    }

    return (
      <div className="text-center inline-block ml-2 translate-y-[-0.625rem]">
         {/* absolute top-1/2 transform -translate-y-1/2 ml-5 */}
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <Link key={"SearchLink"}
          to={`/products/search/${encodeURI(value)}`}>
          <div className="search_icon">🔍️</div>
        </Link>
      </div>
    )
  }
}

export default navBarSuggestions
