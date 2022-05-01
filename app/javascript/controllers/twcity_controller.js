import { Controller } from "stimulus"
import TwCitySelector from "tw-city-selector"
export default class extends Controller {
  connect() {
    console.log('Hello, Stimulus');
    new TwCitySelector({
      countyFieldName: "user[county]",
      districtFieldName: "user[district]",
      zipcodeFieldName: "user[zipcode]",
      bootstrapStyle: true
    });
  }
}