import { Controller } from "stimulus";
import TwCitySelector from "tw-city-selector";
export default class extends Controller {
  initialize() {
    new TwCitySelector({
      countyFieldName: "user[county]",
      districtFieldName: "user[district]",
      zipcodeFieldName: "user[zipcode]",
    });
  }
}
