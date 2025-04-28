// src/app.js
document.addEventListener('DOMContentLoaded', () => {
  const appConfig = require('./config/appConfig.json');
  const app = document.getElementById('app');
  renderHomePage();
  
  function renderHomePage() {
    app.innerHTML = `
      <div class="container">
        <h1>Logseq Notes App</h1>
        <div class="main-menu">
          <button id="addItem" class="btn">Add Item</button>
          <button id="viewItems" class="btn">View Items</button>
          <button id="settings" class="btn">Settings</button>
          <button id="about" class="btn">About</button>
        </div>
      </div>
    `;
    
    document.getElementById('addItem').addEventListener('click', renderAddItemPage);
    document.getElementById('viewItems').addEventListener('click', renderViewItemsPage);
    document.getElementById('settings').addEventListener('click', renderSettingsPage);
    document.getElementById('about').addEventListener('click', renderAboutPage);
  }
  
  function renderAddItemPage() {
    app.innerHTML = `
      <div class="container">
        <h1>Add New Item</h1>
        <form id="addItemForm">
          <div class="form-group">
            <label for="itemType">Type:</label>
            <select id="itemType" required>
              ${appConfig.entryTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label for="itemCategory">Category:</label>
            <select id="itemCategory" required>
              ${appConfig.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label for="itemTitle">Title:</label>
            <input type="text" id="itemTitle" required>
          </div>
          
          <div class="form-group">
            <label for="itemContent">Content:</label>
            <textarea id="itemContent" required></textarea>
          </div>
          
          <div class="form-group" id="dueDateContainer" style="display: none;">
            <label for="itemDueDate">Due Date:</label>
            <input type="date" id="itemDueDate">
          </div>
          
          <div class="form-group">
            <label for="itemTags">Tags (comma separated):</label>
            <input type="text" id="itemTags">
          </div>
          
          <div class="form-actions">
            <button type="button" id="backButton" class="btn btn-secondary">Back</button>
            <button type="submit" class="btn btn-primary">Save Item</button>
          </div>
        </form>
      </div>
    `;
    
    // Show/hide due date field based on item type
    document.getElementById('itemType').addEventListener('change', function() {
      const dueDate = document.getElementById('dueDateContainer');
      if (this.value === 'Task') {
        dueDate.style.display = 'block';
      } else {
        dueDate.style.display = 'none';
      }
    });
    
    // Back button functionality
    document.getElementById('backButton').addEventListener('click', renderHomePage);
    
    // Form submission
    document.getElementById('addItemForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const newItem = {
        id: Date.now(), // Simple unique ID
        type: document.getElementById('itemType').value,
        category: document.getElementById('itemCategory').value,
        title: document.getElementById('itemTitle').value,
        content: document.getElementById('itemContent').value,
        tags: document.getElementById('itemTags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: new Date().toISOString(),
      };
      
      // Add due date if it's a task
      if (newItem.type === 'Task') {
        newItem.dueDate = document.getElementById('itemDueDate').value;
      }
      
      // Save to localStorage
      const items = JSON.parse(localStorage.getItem('logseqItems') || '[]');
      items.push(newItem);
      localStorage.setItem('logseqItems', JSON.stringify(items));
      
      alert('Item saved successfully!');
      renderHomePage();
    });
  }
  
  function renderViewItemsPage() {
    // Implementation for View Items page
  }
  
  function renderSettingsPage() {
    // Implementation for Settings page
  }
  
  function renderAboutPage() {
    // Implementation for About page
  }
});