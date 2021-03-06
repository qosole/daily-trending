// Global HTML DOM traversal variables
var searchInputEl = document.getElementById('inputField');
var searchListEl = document.getElementById('search-list')
var searchBtn = document.getElementById('searchButton');
var nytSwitch = $("#exampleSwitch1");
var spotifySwitch = $("#exampleSwitch2");
var youtubeSwitch = $("#exampleSwitch3");
var redditSwitch = $("#exampleSwitch4");

var timesContent = document.getElementById("times-content");
var redditContent = document.getElementById("reddit-content");
var youtubeContent = document.getElementById("youtube-content");
var spotifyContent = document.getElementById("spotify-content");

var themeSwitch = document.getElementById("exampleSwitch5");

// Global variable for local storage
var storedSearches = [];

// Display current date and time
$('#currentDate').text(moment().format("dddd, MMMM Do YYYY"));
$('#currentTime').text(moment().format("h:mm A"));

// Get searches from local storage
function getStoredSearches() {

    // Pull search array (parsed) from local storage, store in temporary variable, view in console
    localSearches = JSON.parse(localStorage.getItem('Searches'));
    //console.log(localSearches);
    //console.log(storedSearches);

    // If there is no local storage (first time use or cleared local storage), the empty program global variable will be used instead of pulling from local storage
    if (localSearches !== null) {
        storedSearches = localSearches;
        //console.log(storedSearches);
    }

    // Adding the stored searches to the search history bar
    addStoredSearches();
}

// Add stored searches to list under search bar for quick access
function addStoredSearches() {

    // Clear list each time the function is executed so that it is not repeated
    searchListEl.innerHTML = '';

    // Iterate over length of stored searches array
    for (var i = 0; i < storedSearches.length; i++) {

        // Create temporary variable for individual stored search, view in console
        var storedSearch = storedSearches[i];
        //console.log(storedSearch);

        // Create button with search term at index, display on recent search list
        if (storedSearch == '') { continue; } // Does not create an element for an empty search
        var listRow = document.createElement('a');
        listRow.textContent = storedSearch;
        listRow.setAttribute('class', 'button');
        searchListEl.appendChild(listRow);
    }
}

// Add searches to local storage
searchBtn.addEventListener('click', function(event) {

    // Store search in temporary variable, view in console
    var searchInput = searchInputEl.value.trim();
    console.log(searchInput);

    // Input validation: makes sure the search was not empty
    if (searchInput == '') {
        searchInputEl.value = '';
        return;
    }

    // Add search to existing search array if it was not a duplicate search, view in console
    for (var i = 0; i < storedSearches.length; i++) {
        if (storedSearches[i] == searchInput) {
            searchInputEl.value = '';
            return;
        }
    }
    storedSearches.unshift(searchInput);
    console.log(storedSearches);

    // Add search array (stringified) to local storage, with a limit of 10 searches
    if (storedSearches.length > 10) {
        storedSearches.pop();
    }
    localStorage.setItem('Searches', JSON.stringify(storedSearches));

    // Clear search input field
    searchInputEl.value = '';

    // Displaying the search in search history list
    getStoredSearches();
})

// Search for clicked recent search term from list
searchListEl.addEventListener('click', function(event) {

    // Create temporary variable for the target element
    var element = event.target;

    // Extract search term from target element, store in temporary variable and view in console
    var searchTerm = element.innerHTML;
    console.log(searchTerm);

    // Initialize the New York Times API using the search term
    nytGen(searchTerm);

    // Initialize the Spotify API using the search term
    
})

// Store the search when enter is pressed after typing a search 
searchInputEl.addEventListener('keyup', function(event) {
    event.preventDefault();
    // Enter is an id of 13
    if (event.which != 13) {
        return;
    }

    // Store search in temporary variable, view in console
    var searchInput = searchInputEl.value.trim();
    console.log(searchInput);

    // Input validation: makes sure the search was not empty
    if (searchInput == '') {
        searchInputEl.value = '';
        return;
    }

    // Add search to existing search array if it was not a duplicate search, view in console
    for (var i = 0; i < storedSearches.length; i++) {
        if (storedSearches[i] == searchInput) {
            searchInputEl.value = '';
            return;
        }
    }
    storedSearches.unshift(searchInput);
    console.log(storedSearches);

    // Add search array (stringified) to local storage, with a limit of 10 searches
    if (storedSearches.length > 10) {
        storedSearches.pop();
    }
    localStorage.setItem('Searches', JSON.stringify(storedSearches));

    // Clear search input field
    searchInputEl.value = '';

    // Displaying the search in search history list
    getStoredSearches();
})

//result selector
$(document).ready(function() {
    $(nytSwitch).click(function() {
        $(timesContent).toggle();
    })
});

$(document).ready(function() {
    $(redditSwitch).click(function() {
        $(redditContent).toggle();
    })
});

$(document).ready(function() {
    $(youtubeSwitch).click(function() {
        $(youtubeContent).toggle();
    })
});

$(document).ready(function() {
    $(spotifySwitch).click(function() {
        $(spotifyContent).toggle();
    })
});

//light-darkmode

function darkSwitch(event) {
    event.preventDefault();
    if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
};
themeSwitch.addEventListener("change", darkSwitch, false);

// Initialize getStoredSearches function

getStoredSearches();
