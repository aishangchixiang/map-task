
# map-task

## Requirements
Task: Create a web page with the following features:

1. A button to allow users to acquire their current location from their browser.
2. A search module that lets users input the name of a location. The search feature is triggered by both button clicks and pressing the enter key on the keyboard.
3. Display the location on a map and add a marker to each searched location every time the location changes.
4. A table with pagination to show all searched places:  
  a) Display a maximum of 10 records on each page.  
  b) A checkbox at the beginning of each row to let users select multiple records at the same time.  
  c) A delete button on the top to remove all selected records as well as their markers on the map.  
5. Display the time zone and local time of the latest searched location.  
*You are encouraged to use modern UI Frameworks.


## Add the Google API Key
In this project, __Google Maps APIs__ are used, so you need to fill in your own API key in the __config.js__ file.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

