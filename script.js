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

    // Grocery header with edit button for name
    const header = document.createElement("div");
    header.classList.add("grocery-header");
    header.innerHTML = `
      <span contenteditable="false" class="grocery-name" onblur="updateGroceryName(${index}, this.textContent)">${grocery.name}</span>
      <button onclick="enableEdit(${index})">Edit Name</button>
      <button class="restock-btn" onclick="addRestock(${index})">Restock</button>
      <button class="delete-btn" onclick="deleteGrocery(${index})">Delete</button>
    `;
    groceryCard.appendChild(header);

    // Display restock dates with edit and delete options
    const restockLog = document.createElement("div");
    restockLog.classList.add("restock-log");
    grocery.restockDates.forEach((restock, restockIndex) => {
      const restockEntry = document.createElement("div");
      restockEntry.classList.add("restock-entry");
      restockEntry.innerHTML = `
        <strong>${restock.date}</strong> - ${restock.description || ""}
        <button onclick="editRestock(${index}, ${restockIndex})">Edit</button>
        <button onclick="deleteRestock(${index}, ${restockIndex})">Delete</button>
      `;
      restockLog.appendChild(restockEntry);
    });
    groceryCard.appendChild(restockLog);

    groceryListContainer.appendChild(groceryCard);
  });
}

// Enable editing the grocery name
function enableEdit(index) {
  const groceryNameEl = document.querySelectorAll(".grocery-name")[index];
  groceryNameEl.contentEditable = true;
  groceryNameEl.focus();
}

// Update grocery name in the grocery list
function updateGroceryName(index, newName) {
  groceryList[index].name = newName.trim();
  saveToLocalStorage();
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

// Edit a specific restock entry
function editRestock(groceryIndex, restockIndex) {
  const restock = groceryList[groceryIndex].restockDates[restockIndex];

  // Create a dialog to edit date and description
  const dialog = document.createElement("dialog");
  dialog.classList.add("restock-dialog");

  dialog.innerHTML = `
    <form method="dialog">
      <label>
        Restock Date:
        <input type="date" id="restockDate" value="${restock.date}" required>
      </label>
      <label>
        Description (optional):
        <input type="text" id="description" value="${restock.description}">
      </label>
      <menu>
        <button type="submit">Save</button>
        <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
      </menu>
    </form>
  `;

  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.addEventListener("close", () => {
    const updatedDate = dialog.querySelector("#restockDate").value;
    const updatedDescription = dialog.querySelector("#description").value;

    if (updatedDate) {
      groceryList[groceryIndex].restockDates[restockIndex] = {
        date: updatedDate,
        description: updatedDescription || "",
      };
      saveToLocalStorage();
      renderGroceryList();
    }
    dialog.remove();
  });
}

// Delete a specific restock entry
function deleteRestock(groceryIndex, restockIndex) {
  groceryList[groceryIndex].restockDates.splice(restockIndex, 1);
  saveToLocalStorage();
  renderGroceryList();
}

// Function to delete a grocery item
function deleteGrocery(index) {
  groceryList.splice(index, 1);
  saveToLocalStorage();
  renderGroceryList();
}

// Initial render of the grocery list from local storage
renderGroceryList();
