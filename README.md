# Grocery Stock Management

A simple web application to help you manage your grocery stock, keep track of usage, and monitor restocking dates. This application allows you to add, update, or delete grocery items, with the ability to track multiple restock dates for each item. Built using HTML, CSS, and JavaScript with local storage for data persistence, the app can be deployed on GitHub Pages for easy access.

## Features

- **Add Grocery Items**: Quickly add grocery items with a simple form.
- **Track Restocking Dates**: Add multiple restocking dates and descriptions for each item.
- **Organized View**: See restocking history for each grocery item, organized by date.
- **Persistent Data**: All data is stored locally in your browser's local storage, ensuring your grocery list is saved even after page reloads.
- **Responsive UI**: The application is designed to be mobile-friendly and responsive.

## Technologies Used

- **HTML**: For the structure of the web page.
- **CSS**: For styling and layout.
- **JavaScript**: For interactivity and functionality.
- **Local Storage**: To store data persistently in the browser.
- **GitHub Pages**: For deployment of the website.

## Getting Started

### Prerequisites

You only need a web browser to run this app. No additional software is required.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MohammedSaffan2003/grocery-tracker-app.git
   ```
2. **Open the Application**:
   Open the `index.html` file in your web browser to start using the app locally.

3. **Alternatively, Use GitHub Pages**:
   - Push the repository to GitHub and enable GitHub Pages in your repository settings for easy access and sharing.

## Usage

1. **Adding a Grocery Item**:
   - Enter the name of the grocery item in the input field and click **Add Grocery**.
   - The item will appear in your list of groceries below the form.

2. **Adding Restock Dates**:
   - Click on the **Restock** button next to a grocery item to add a restocking date.
   - A dialog will appear where you can select the date using a calendar and add an optional description.
   - Click **Add** to save the entry, and it will appear in the item’s restocking history.

3. **Deleting a Grocery Item**:
   - To remove an item, click the **Delete** button next to it.
   - This will permanently delete the item and its associated restocking history.

4. **Persistent Data**:
   - All added groceries and restock dates are saved automatically in your browser’s local storage.
   - Data will remain available even after you close or refresh the page.

## File Structure

```
grocery-stock-management/
├── index.html         # Main HTML structure
├── styles.css         # CSS for styling the application
├── script.js          # JavaScript logic and functionality
└── README.md          # Documentation file
```

