// Initialize grocery list from local storage if available, otherwise start with an empty array
let groceryList = JSON.parse(localStorage.getItem("groceryList")) || [];

// Helper function to save grocery list to local storage
function saveToLocalStorage() {
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

// Helper function to render grocery list
function renderGroceryList() {
  const groceryListContainer = document.getElementById("groceryList");
  groceryListContainer.innerHTML = "";

  groceryList.forEach((grocery, index) => {
    const groceryCard = document.createElement("div");
    groceryCard.classList.add("grocery-card");

    const header = document.createElement("div");
    header.classList.add("grocery-header");
    header.innerHTML = `
      <span>${grocery.name}</span>
      <button class="restock-btn" onclick="addRestock(${index})">Restock</button>
      <button class="delete-btn" onclick="deleteGrocery(${index})">Delete</button>
    `;
    groceryCard.appendChild(header);

    // Display restock dates
    const restockLog = document.createElement("div");
    restockLog.classList.add("restock-log");
    grocery.restockDates.forEach((restock) => {
      const restockEntry = document.createElement("div");
      restockEntry.classList.add("restock-entry");
      restockEntry.innerHTML = `<strong>${restock.date}</strong> - ${
        restock.description || ""
      }`;
      restockLog.appendChild(restockEntry);
    });
    groceryCard.appendChild(restockLog);

    groceryListContainer.appendChild(groceryCard);
  });
}

// Function to add a new grocery item
document.getElementById("addGroceryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const groceryName = document.getElementById("groceryName").value;

  if (groceryName.trim()) {
    groceryList.push({ name: groceryName, restockDates: [] });
    document.getElementById("groceryName").value = "";
    saveToLocalStorage(); // Save to local storage
    renderGroceryList();
  }
});

// Function to add a restock entry to a grocery item
// function addRestock(index) {
//   const restockDate = prompt("Enter restock date (YYYY-MM-DD):");
//   const description = prompt("Enter description (optional):");

//   if (restockDate) {
//     groceryList[index].restockDates.push({
//       date: restockDate,
//       description: description || "",
//     });
//     saveToLocalStorage(); // Save to local storage
//     renderGroceryList();
//   }
// }

// Function to add a restock entry to a grocery item with date picker
function addRestock(index) {
  // Create a dialog to enter date and description
  const dialog = document.createElement("dialog");
  dialog.classList.add("restock-dialog");

  dialog.innerHTML = `
      <form method="dialog">
        <label>
          Restock Date:
          <input type="date" id="restockDate" required>
        </label>
        <label>
          Description (optional):
          <input type="text" id="description">
        </label>
        <menu>
          <button type="submit">Add</button>
          <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
        </menu>
      </form>
    `;

  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.addEventListener("close", () => {
    const restockDate = dialog.querySelector("#restockDate").value;
    const description = dialog.querySelector("#description").value;

    if (restockDate) {
      groceryList[index].restockDates.push({
        date: restockDate,
        description: description || "",
      });
      saveToLocalStorage();
      renderGroceryList();
    }
    dialog.remove();
  });
}

// Function to delete a grocery item
function deleteGrocery(index) {
  groceryList.splice(index, 1);
  saveToLocalStorage(); // Save to local storage
  renderGroceryList();
}

// Initial render of the grocery list from local storage
renderGroceryList();
