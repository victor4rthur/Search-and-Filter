//External source. A json with all US cities
const endpoint =
  "https://gist.githubusercontent.com/victor4rthur/1fd24093b905f2621bbc6715b285d7d5/raw/3aea3438bf8ef01b78e98fbf464dc43cb86cf2b1/Portugal%2520Cities";

const cities = [];

// Use the Fetch API to make a request to the specified URL
fetch(endpoint)
  // When the response is received, parse it as JSON
  .then((response) => response.json())
  // Once the JSON is parsed, use the data
  .then((data) => cities.push(...data))

  // Another way of treating the data from the json
  // .then(data => {
  //   const cities = data;
  //   console.log(cities);
  // })

  // Handle any errors that may occur during the process
  .catch((error) => console.error("Error loading JSON:", error));

function findMatches(wordToMatch, cities) {
  //Filters city and call it place
  return cities.filter((place) => {
    //'gi' global and indiferent to lowerUpper case
    const regex = new RegExp(wordToMatch, "gi");
    // return a match with a city of the state.
    return place.city.match(regex) || place.admin_name.match(regex);
  });
}

//Select the Search field and the suggestion field
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

//Creates a eventlistener to the search event.
searchInput.addEventListener("keyup", displayMatches);

//Put commas between numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//The pressed content will be compared in the FindMatches function and will populate a array.
// Function to display matched cities based on user input
function displayMatches() {
  // Find matches for the user input in the 'cities' array
  const matchArray = findMatches(this.value, cities);

  // Create HTML markup for the matched cities
  const html = matchArray
    .map((place) => {
      // Create a regular expression with the user input for highlighting
      const regex = new RegExp(this.value, "gi");

      // Replace the matched part of the city or district name with a highlighted span
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.admin_name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      // Return HTML for each matched city
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>    
    `;
    })
    .join(""); // Join the array of HTML strings into a single string

  // Set the inner HTML of the 'suggestions' element to the generated HTML
  suggestions.innerHTML = html;
}
