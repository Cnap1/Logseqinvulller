// src/app.js
const exportUtils = require('./utils/exportUtils.js');
const appConfig = require('./config/appConfig.json');
const { getEmotionData, getMatchingEmoticons } = require('./utils/emotionUtils.js');

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

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
  console.log('renderAddItemPage called'); // Debugging
  const localConfig = JSON.parse(localStorage.getItem('localAppConfig') || JSON.stringify(appConfig));
  const emotionData = getEmotionData(); // Get data from the JSON file

  // Define emotion icons mapping with scores
  const emotionIcons = [
    { emoji: '🤮', unicode: 'U+1F92E', score: 5, primary: 'Disgust', secondary: 'Revulsion', arousal: 'high' },
    { emoji: '🤢', unicode: 'U+1F922', score: 8, primary: 'Disgust', secondary: 'Nausea', arousal: 'medium' },
    { emoji: '😡', unicode: 'U+1F621', score: 10, primary: 'Anger', secondary: 'Rage', arousal: 'high' },
    { emoji: '🤬', unicode: 'U+1F92C', score: 12, primary: 'Anger', secondary: 'Fury', arousal: 'high' },
    { emoji: '😠', unicode: 'U+1F620', score: 15, primary: 'Anger', secondary: 'Annoyance', arousal: 'medium' },
    { emoji: '😭', unicode: 'U+1F62D', score: 18, primary: 'Sadness', secondary: 'Grief', arousal: 'high' },
    { emoji: '😨', unicode: 'U+1F628', score: 20, primary: 'Fear', secondary: 'Terror', arousal: 'high' },
    { emoji: '🫨', unicode: 'U+1FAE8', score: 22, primary: 'Fear', secondary: 'Anxiety', arousal: 'high' },
    { emoji: '😱', unicode: 'U+1F631', score: 25, primary: 'Fear', secondary: 'Shock', arousal: 'high' },
    { emoji: '😰', unicode: 'U+1F630', score: 28, primary: 'Fear', secondary: 'Anxiety', arousal: 'medium' },
    { emoji: '😖', unicode: 'U+1F616', score: 30, primary: 'Disgust', secondary: 'Suffering', arousal: 'medium' },
    { emoji: '🥹', unicode: 'U+1F979', score: 32, primary: 'Sadness', secondary: 'Hurt', arousal: 'medium' },
    { emoji: '😢', unicode: 'U+1F622', score: 35, primary: 'Sadness', secondary: 'Sorrow', arousal: 'medium' },
    { emoji: '🫠', unicode: 'U+1FAE0', score: 37, primary: 'Sadness', secondary: 'Resignation', arousal: 'low' },
    { emoji: '😣', unicode: 'U+1F623', score: 38, primary: 'Sadness', secondary: 'Struggle', arousal: 'medium' },
    { emoji: '😫', unicode: 'U+1F62B', score: 40, primary: 'Sadness', secondary: 'Exhaustion', arousal: 'medium' },
    { emoji: '😩', unicode: 'U+1F629', score: 42, primary: 'Sadness', secondary: 'Weariness', arousal: 'medium' },
    { emoji: '🥲', unicode: 'U+1F972', score: 45, primary: 'Sadness', secondary: 'Hope', arousal: 'low' },
    { emoji: '😐', unicode: 'U+1F610', score: 48, primary: 'Neutral', secondary: 'Blank', arousal: 'low' },
    { emoji: '😑', unicode: 'U+1F611', score: 50, primary: 'Neutral', secondary: 'Expressionless', arousal: 'low' },
    { emoji: '😶', unicode: 'U+1F636', score: 52, primary: 'Neutral', secondary: 'Empty', arousal: 'low' },
    { emoji: '🫥', unicode: 'U+1FAE5', score: 54, primary: 'Neutral', secondary: 'Hidden', arousal: 'low' },
    { emoji: '😬', unicode: 'U+1F62C', score: 55, primary: 'Neutral', secondary: 'Awkward', arousal: 'medium' },
    { emoji: '🤨', unicode: 'U+1F928', score: 56, primary: 'Surprise', secondary: 'Skepticism', arousal: 'low' },
    { emoji: '😕', unicode: 'U+1F615', score: 58, primary: 'Surprise', secondary: 'Confusion', arousal: 'low' },
    { emoji: '🫣', unicode: 'U+1FAE3', score: 60, primary: 'Surprise', secondary: 'Curiosity', arousal: 'medium' },
    { emoji: '🙂', unicode: 'U+1F642', score: 62, primary: 'Joy', secondary: 'Mild_Happiness', arousal: 'low' },
    { emoji: '😉', unicode: 'U+1F609', score: 65, primary: 'Joy', secondary: 'Playfulness', arousal: 'medium' },
    { emoji: '😊', unicode: 'U+1F60A', score: 68, primary: 'Joy', secondary: 'Contentment', arousal: 'low' },
    { emoji: '😇', unicode: 'U+1F607', score: 70, primary: 'Joy', secondary: 'Serenity', arousal: 'low' },
    { emoji: '😌', unicode: 'U+1F60C', score: 72, primary: 'Joy', secondary: 'Peace', arousal: 'low' },
    { emoji: '😋', unicode: 'U+1F60B', score: 75, primary: 'Joy', secondary: 'Satisfaction', arousal: 'medium' },
    { emoji: '😄', unicode: 'U+1F604', score: 78, primary: 'Joy', secondary: 'Cheerfulness', arousal: 'medium' },
    { emoji: '😎', unicode: 'U+1F60E', score: 80, primary: 'Joy', secondary: 'Confidence', arousal: 'medium' },
    { emoji: '😍', unicode: 'U+1F60D', score: 85, primary: 'Love', secondary: 'Adoration', arousal: 'medium' },
    { emoji: '🤩', unicode: 'U+1F929', score: 88, primary: 'Excitement', secondary: 'Amazement', arousal: 'high' },
    { emoji: '😂', unicode: 'U+1F602', score: 90, primary: 'Excitement', secondary: 'Laughter', arousal: 'high' },
    { emoji: '🥰', unicode: 'U+1F970', score: 95, primary: 'Love', secondary: 'Affection', arousal: 'medium' },
    { emoji: '😁', unicode: 'U+1F601', score: 100, primary: 'Love', secondary: 'Ecstasy', arousal: 'high' }
  ];

  app.innerHTML = `
    <div class="container">
      <h1>Add New Item</h1>
      <form id="addItemForm">
        <div class="form-group">
          <label for="itemType">Type:</label>
          <select id="itemType" required>
            ${localConfig.entryTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
            <option value="Mood">Mood</option>
          </select>
        </div>
        
        <div id="moodFields" style="display: none;">
          <div class="form-group">
            <label for="moodSlider">How are you feeling?</label>
            <div class="slider-container">
              <span class="slider-label">Bad</span>
              <input type="range" id="moodSlider" min="1" max="100" value="50">
              <span class="slider-label">Good</span>
            </div>
            <div class="slider-value">Value: <span id="moodValue">50</span></div>
          </div>
          
          <div class="form-group">
          <label for="itemTitle">Title:</label>
          <input type="text" id="itemTitle">
          <small class="form-text text-muted" id="titleHelp">Optional for mood entries - current date/time will be used.</small>
        </div>
        
        <div class="form-group">
          <label for="itemContent" id="contentLabel">Content:</label>
          <textarea id="itemContent" required></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" id="backButton" class="btn btn-secondary">Back</button>
          <button type="submit" class="btn btn-primary">Save Item</button>
        </div>
      </form>
    </div>
  `;

  // Trigger the change event to set initial state
  const itemTypeSelect = document.getElementById('itemType');
  
  // Show/hide mood fields based on item type and update labels
  itemTypeSelect.addEventListener('change', function () {
    const moodFields = document.getElementById('moodFields');
    const titleField = document.getElementById('titleField');
    const titleInput = document.getElementById('itemTitle');
    const contentLabel = document.getElementById('contentLabel');
    const titleHelp = document.getElementById('titleHelp');
    
    if (this.value === 'Mood') {
      moodFields.style.display = 'block';
      titleInput.required = false;
      titleHelp.style.display = 'block';
      contentLabel.textContent = 'Comment:';
      
      // Initialize mood selection UI
      updateMoodSelection();
    } else {
      moodFields.style.display = 'none';
      titleInput.required = true;
      titleHelp.style.display = 'none';
      contentLabel.textContent = 'Content:';
    }
  });

  // Handle mood slider changes
  const moodSlider = document.getElementById('moodSlider');
  const moodValue = document.getElementById('moodValue');
  const intensitySlider = document.getElementById('intensitySlider');
  const intensityValue = document.getElementById('intensityValue');
  
  moodSlider.addEventListener('input', function() {
    moodValue.textContent = this.value;
    updateMoodSelection();
  });
  
  intensitySlider.addEventListener('input', function() {
    intensityValue.textContent = this.value;
    updateMoodSelection();
  });
  
  let selectedEmoji = null;
  
  // Function to update mood selection based on sliders
  function updateMoodSelection() {
    const moodScore = parseInt(moodSlider.value);
    const intensity = parseInt(intensitySlider.value);
    
    // Get matching emotions based on mood score and intensity
    const matchingEmotions = getMatchingEmoticons(moodScore, intensity, 8);
    
    // Display emotions as icons
    const emotionIconsContainer = document.getElementById('emotionIcons');
    emotionIconsContainer.innerHTML = matchingEmotions.map(emotion => {
      return `<div class="emotion-icon ${selectedEmoji === emotion.emoji ? 'selected' : ''}" 
                  data-emoji="${emotion.emoji}" 
                  data-primary="${emotion.primary}"
                  data-secondary="${emotion.secondary}">
                <span class="emoji">${emotion.emoji}</span>
                <span class="emotion-label">${emotion.secondary}</span>
              </div>`;
    }).join('');
    
    // Add click event listeners to the emotion icons
    document.querySelectorAll('.emotion-icon').forEach(icon => {
      icon.addEventListener('click', function() {
        // Remove selected class from all icons
        document.querySelectorAll('.emotion-icon').forEach(el => el.classList.remove('selected'));
        
        // Add selected class to clicked icon
        this.classList.add('selected');
        
        // Store selected emoji and update details
        selectedEmoji = this.dataset.emoji;
        const primary = this.dataset.primary;
        
        // Update tertiary emotions based on the selected primary emotion
        updateTertiaryEmotions(primary);
      });
    });
    
    // If no emotion is selected yet, auto-select the closest one
    if (!selectedEmoji && matchingEmotions.length > 0) {
      const closestEmotion = matchingEmotions[0];
      selectedEmoji = closestEmotion.emoji;
      
      // Update tertiary emotions
      updateTertiaryEmotions(closestEmotion.primary);
      
      // Select the icon
      setTimeout(() => {
        const firstIcon = document.querySelector('.emotion-icon');
        if (firstIcon) firstIcon.classList.add('selected');
      }, 0);
    }
  }
  
  // Function to update tertiary emotions based on primary emotion
  function updateTertiaryEmotions(primaryEmotion) {
    // Find matching emotion in emotionData
    const matchingEmotion = emotionData.find(emotion => 
      emotion.primary.en.toLowerCase() === primaryEmotion.toLowerCase()
    );
    
    if (matchingEmotion) {
      // Collect all tertiary emotions from all secondary emotions
      const tertiaryEmotions = [];
      matchingEmotion.secondaryEmotions.forEach(secondary => {
        secondary.tertiaryEmotions.forEach(tertiary => {
          if (tertiary.en) {
            tertiaryEmotions.push(tertiary);
          }
        });
      });
      
      // Display tertiary emotion buttons
      const tertiaryContainer = document.getElementById('tertiaryEmotionButtons');
      tertiaryContainer.innerHTML = tertiaryEmotions.map(tertiary => 
        `<button type="button" class="btn mood-btn tertiary-mood" data-value="${tertiary.en}">${tertiary.en}</button>`
      ).join('');
      
      // Add event listeners for tertiary emotions
      document.querySelectorAll('.tertiary-mood').forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove selected class from all tertiary buttons
          document.querySelectorAll('.tertiary-mood').forEach(btn => 
            btn.classList.remove('selected')
          );
          
          // Add selected class to clicked button
          this.classList.add('selected');
        });
      });
    } else {
      // If no matching primary emotion is found
      document.getElementById('tertiaryEmotionButtons').innerHTML = 
        '<p>No specific emotions available for this selection.</p>';
    }
  }

  // Back button functionality
  document.getElementById('backButton').addEventListener('click', renderHomePage);

  // Form submission
  document.getElementById('addItemForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const itemType = document.getElementById('itemType').value;
    let title = document.getElementById('itemTitle').value.trim();
    
    // For mood entries, use current date/time as title if empty
    if (itemType === 'Mood' && !title) {
      const now = new Date();
      title = `Mood - ${now.toLocaleString()}`;
    }
    
    const newItem = {
      id: Date.now(),
      type: itemType,
      title: title,
      content: document.getElementById('itemContent').value,
      createdAt: new Date().toISOString(),
    };
    
    // Add mood data if it's a mood entry
    if (itemType === 'Mood') {
      const selectedTertiary = document.querySelector('.tertiary-mood.selected')?.dataset.value || null;
      const selectedEmotionData = emotionIcons.find(e => e.emoji === selectedEmoji);
      
      newItem.mood = {
        level: document.getElementById('moodSlider').value,
        intensity: document.getElementById('intensitySlider').value,
        emoji: selectedEmoji,
        primary: selectedEmotionData?.primary || null,
        secondary: selectedEmotionData?.secondary || null,
        tertiary: selectedTertiary
      };
    }

    const items = JSON.parse(localStorage.getItem('logseqItems') || '[]');
    items.push(newItem);
    localStorage.setItem('logseqItems', JSON.stringify(items));

    alert('Item saved successfully!');
    renderHomePage();
  });
  
  // Add the following CSS dynamically
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .slider-container {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    
    .slider-label {
      width: 50px;
      text-align: center;
    }
    
    .slider-value {
      text-align: right;
      font-size: 0.9em;
      color: #666;
      margin-top: 2px;
    }
    
    .mood-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 10px 0;
    }
    
    .mood-btn {
      border: 1px solid #ddd;
      padding: 8px 12px;
      margin: 5px;
      border-radius: 20px;
      background-color: #f0f0f0;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .mood-btn:hover {
      background-color: #e0e0e0;
    }
    
    .mood-btn.selected {
      background-color: #4a86e8;
      color: white;
      border-color: #366dc0;
    }
    
    .emotion-icons {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 15px 0;
      justify-content: center;
    }
    
    .emotion-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s;
      width: 80px;
      text-align: center;
    }
    
    .emotion-icon:hover {
      background-color: #e9e9e9;
    }
    
    .emotion-icon.selected {
      background-color: #4a86e8;
      color: white;
    }
    
    .emotion-icon .emoji {
      font-size: 2.5em;
      margin-bottom: 4px;
    }
    
    .emotion-icon .emotion-label {
      font-size: 0.8em;
      word-wrap: break-word;
    }
    
    .selected-emotion {
      display: flex;
      align-items: center;
      padding: 12px;
      background-color: #f0f0f0;
      border-radius: 8px;
      margin: 10px 0;
    }
    
    .selected-emoji {
      font-size: 3em;
      margin-right: 15px;
    }
    
    .emotion-details {
      flex: 1;
    }
    
    .emotion-primary {
      font-weight: bold;
      font-size: 1.1em;
    }
    
    .emotion-secondary {
      color: #666;
    }
    
    #tertiaryEmotionsContainer {
      background-color: #f8f8f8;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
    }
    
    .tertiary-group {
      margin-bottom: 15px;
      background: #f9f9f9;
      border-radius: 6px;
      padding: 10px;
    }
    
    .tertiary-group h4 {
      margin: 0 0 8px 0;
      font-size: 14px;
      color: #555;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }
    
    .tertiary-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    
    .emotion-icons {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 10px;
      margin: 15px 0;
      justify-content: center;
    }
    
    @media (max-width: 600px) {
      .emotion-icons {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `;








  document.head.appendChild(styleElement);
  
  // Set initial view if Mood is preselected
  if (itemTypeSelect.value === 'Mood') {
    itemTypeSelect.dispatchEvent(new Event('change'));
  }
  }

  function renderItemsList(items) {
    return `
      <div class="table-responsive">
        <table class="items-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Type</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${new Date(item.createdAt).toLocaleDateString()}</td>
                <td>${item.title}</td>
                <td>${item.type}</td>
                <td>${item.category}</td>
                <td class="action-buttons">
                  <button class="view-item btn-sm" data-id="${item.id}">View</button>
                  <button class="edit-item btn-sm" data-id="${item.id}">Edit</button>
                  <button class="delete-item btn-sm" data-id="${item.id}">X</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
  
  function renderViewItemsPage() {
    const items = JSON.parse(localStorage.getItem('logseqItems') || '[]');
    
    // Create filters for item types and categories
    const uniqueTypes = [...new Set(items.map(item => item.type))];
    const uniqueCategories = [...new Set(items.map(item => item.category))];
    
    app.innerHTML = `
      <div class="container">
        <h1>View Items</h1>
        
        <div class="filters">
          <div class="form-group">
            <label for="filterType">Filter by Type:</label>
            <select id="filterType">
              <option value="">All Types</option>
              ${uniqueTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label for="filterCategory">Filter by Category:</label>
            <select id="filterCategory">
              <option value="">All Categories</option>
              ${uniqueCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label for="searchItems">Search:</label>
            <input type="text" id="searchItems" placeholder="Search in title or content">
          </div>
        </div>
        
        <div id="itemsList" class="items-list">
          ${items.length > 0 
            ? renderItemsList(items) 
            : '<p class="no-items">No items found. Add some items to get started!</p>'}
        </div>
        
        <div class="form-actions">
          <button id="backButton" class="btn btn-secondary">Back</button>
        </div>
      </div>
    `;
    
    // Back button functionality
    document.getElementById('backButton').addEventListener('click', renderHomePage);
    
    // Setup filter functionality
    const itemsList = document.getElementById('itemsList');
    const filterType = document.getElementById('filterType');
    const filterCategory = document.getElementById('filterCategory');
    const searchItems = document.getElementById('searchItems');
    
    function applyFilters() {
      const typeFilter = filterType.value;
      const categoryFilter = filterCategory.value;
      const searchFilter = searchItems.value.toLowerCase();
      
      const filteredItems = items.filter(item => {
        const matchesType = !typeFilter || item.type === typeFilter;
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesSearch = !searchFilter || 
          item.title.toLowerCase().includes(searchFilter) || 
          item.content.toLowerCase().includes(searchFilter);
        
        return matchesType && matchesCategory && matchesSearch;
      });
      
      itemsList.innerHTML = filteredItems.length > 0 
        ? renderItemsList(filteredItems) 
        : '<p class="no-items">No items match the current filters.</p>';
      
      // Re-attach event listeners for view and delete buttons
      attachItemEventListeners();
    }
    
    filterType.addEventListener('change', applyFilters);
    filterCategory.addEventListener('change', applyFilters);
    searchItems.addEventListener('input', applyFilters);
    
    // Attach event listeners for view and delete buttons
    attachItemEventListeners();
    
    function attachItemEventListeners() {
      // View item details
      document.querySelectorAll('.view-item').forEach(button => {
        button.addEventListener('click', function() {
          const itemId = parseInt(this.dataset.id);
          viewItemDetails(itemId);
        });
      });
      
      // Edit items
      document.querySelectorAll('.edit-item').forEach(button => {
        button.addEventListener('click', function() {
          const itemId = parseInt(this.dataset.id);
          editItem(itemId);
        });
      });
      
      // Delete items
      document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', function() {
          const itemId = parseInt(this.dataset.id);
          deleteItem(itemId);
        });
      });
    }
    
    function viewItemDetails(itemId) {
      const item = items.find(item => item.id === itemId);
      if (!item) return;
      
      app.innerHTML = `
        <div class="container">
          <h1>${item.title}</h1>
          <div class="item-details">
            <div class="item-meta">
              <p><strong>Type:</strong> ${item.type}</p>
              <p><strong>Category:</strong> ${item.category}</p>
              <p><strong>Created:</strong> ${new Date(item.createdAt).toLocaleString()}</p>
              ${item.dueDate ? `<p><strong>Due Date:</strong> ${item.dueDate}</p>` : ''}
              ${item.tags.length > 0 ? `<p><strong>Tags:</strong> ${item.tags.join(', ')}</p>` : ''}
            </div>
            <div class="item-content">
              <h2>Content</h2>
              <div class="content-text">${item.content.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="form-actions">
            <button id="backToList" class="btn btn-secondary">Back to List</button>
            <button id="editItem" class="btn btn-primary" data-id="${item.id}">Edit</button>
          </div>
        </div>
      `;
      
      document.getElementById('backToList').addEventListener('click', renderViewItemsPage);
      // Edit functionality could be added here
    }
    function editItem(itemId) {
      const items = JSON.parse(localStorage.getItem('logseqItems') || '[]');
      const item = items.find(item => item.id === itemId);
      if (!item) return;
      
      app.innerHTML = `
        <div class="container">
          <h1>Edit Item</h1>
          <form id="editItemForm">
            <div class="form-group">
              <label for="itemType">Type:</label>
              <select id="itemType" required>
                ${appConfig.entryTypes.map(type => 
                  `<option value="${type}" ${item.type === type ? 'selected' : ''}>${type}</option>`
                ).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label for="itemCategory">Category:</label>
              <select id="itemCategory" required>
                ${appConfig.categories.map(cat => 
                  `<option value="${cat}" ${item.category === cat ? 'selected' : ''}>${cat}</option>`
                ).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label for="itemTitle">Title:</label>
              <input type="text" id="itemTitle" required value="${item.title}">
            </div>
            
            <div class="form-group">
              <label for="itemContent">Content:</label>
              <textarea id="itemContent" required>${item.content}</textarea>
            </div>
            
            <div class="form-group" id="dueDateContainer" style="${item.type === 'Task' ? 'display: block;' : 'display: none;'}">
              <label for="itemDueDate">Due Date:</label>
              <input type="date" id="itemDueDate" value="${item.dueDate || ''}">
            </div>
            
            <div class="form-group">
              <label for="itemTags">Tags (comma separated):</label>
              <input type="text" id="itemTags" value="${item.tags ? item.tags.join(', ') : ''}">
            </div>
            
            <div class="form-actions">
              <button type="button" id="backButton" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">Update Item</button>
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
      document.getElementById('backButton').addEventListener('click', renderViewItemsPage);
      
      // Form submission
      document.getElementById('editItemForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update item with new values
        item.type = document.getElementById('itemType').value;
        item.category = document.getElementById('itemCategory').value;
        item.title = document.getElementById('itemTitle').value;
        item.content = document.getElementById('itemContent').value;
        item.tags = document.getElementById('itemTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        // Update due date if it's a task
        if (item.type === 'Task') {
          item.dueDate = document.getElementById('itemDueDate').value;
        } else {
          delete item.dueDate;
        }
        
        // Save to localStorage
        const itemIndex = items.findIndex(i => i.id === itemId);
        items[itemIndex] = item;
        localStorage.setItem('logseqItems', JSON.stringify(items));
        
        alert('Item updated successfully!');
        renderViewItemsPage();
      });
    }
    function deleteItem(itemId) {
      if (confirm('Are you sure you want to delete this item?')) {
        const updatedItems = items.filter(item => item.id !== itemId);
        localStorage.setItem('logseqItems', JSON.stringify(updatedItems));
        renderViewItemsPage(); // Refresh the view
      }
    }
  }
  
  function renderSettingsPage() {
    // Get current configuration
    const localConfig = JSON.parse(localStorage.getItem('localAppConfig') || JSON.stringify(appConfig));
    
    app.innerHTML = `
      <div class="container">
        <h1>Settings</h1>
        
        <form id="settingsForm">
          <div class="settings-section">
            <h2>Categories</h2>
            <div id="categoriesList">
              ${localConfig.categories.map((category, index) => `
                <div class="settings-item">
                  <input type="text" value="${category}" class="category-input" data-index="${index}">
                  <button type="button" class="remove-btn" data-type="category" data-index="${index}">✕</button>
                </div>
              `).join('')}
            </div>
            <button type="button" id="addCategoryBtn" class="add-btn">Add Category</button>
          </div>
          
          <div class="settings-section">
            <h2>Entry Types</h2>
            <div id="entryTypesList">
              ${localConfig.entryTypes.map((type, index) => `
                <div class="settings-item">
                  <input type="text" value="${type}" class="type-input" data-index="${index}">
                  <button type="button" class="remove-btn" data-type="entryType" data-index="${index}">✕</button>
                </div>
              `).join('')}
            </div>
            <button type="button" id="addTypeBtn" class="add-btn">Add Entry Type</button>
          </div>
          
          <div class="settings-section">
            <h2>Export Options</h2>
            <div class="export-options">
              ${['logseq', 'obsidian', 'jira', 'onenote', 'keep', 'markdown', 'email', 'json', 'notion', 'evernote'].map(format => {
                const isChecked = localConfig.exportOptions && 
                                localConfig.exportOptions.find(opt => opt.format === format)?.enabled;
                return `
                  <div class="export-item">
                    <input type="checkbox" id="export-${format}" value="${format}" ${isChecked ? 'checked' : ''}>
                    <label for="export-${format}">${format.charAt(0).toUpperCase() + format.slice(1)}</label>
                  </div>
                `;
              }).join('')}
            </div>
            <button type="button" id="exportDataBtn" class="btn btn-primary">Export Data</button>
          </div>
          
          <div class="settings-section">
            <h2>Display</h2>
            <div class="form-group">
              <label for="itemsPerPage">Items per page:</label>
              <select id="itemsPerPage">
                <option value="10" ${localConfig.itemsPerPage === 10 ? 'selected' : ''}>10</option>
                <option value="20" ${localConfig.itemsPerPage === 20 ? 'selected' : ''}>20</option>
                <option value="50" ${localConfig.itemsPerPage === 50 ? 'selected' : ''}>50</option>
                <option value="100" ${localConfig.itemsPerPage === 100 ? 'selected' : ''}>100</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="defaultView">Default view:</label>
              <select id="defaultView">
                <option value="grid" ${localConfig.defaultView === 'grid' ? 'selected' : ''}>Grid</option>
                <option value="list" ${localConfig.defaultView === 'list' ? 'selected' : ''}>List</option>
              </select>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" id="backButton" class="btn btn-secondary">Back</button>
            <button type="button" id="resetSettingsBtn" class="btn btn-warning">Reset to Default</button>
            <button type="submit" class="btn btn-primary">Save Settings</button>
          </div>
        </form>
      </div>
    `;
    
    // Back button
    document.getElementById('backButton').addEventListener('click', renderHomePage);
    
    // Add new category
    document.getElementById('addCategoryBtn').addEventListener('click', function() {
      const categoriesList = document.getElementById('categoriesList');
      const newIndex = document.querySelectorAll('.category-input').length;
      
      const newItem = document.createElement('div');
      newItem.className = 'settings-item';
      newItem.innerHTML = `
        <input type="text" placeholder="New Category" class="category-input" data-index="${newIndex}">
        <button type="button" class="remove-btn" data-type="category" data-index="${newIndex}">✕</button>
      `;
      
      categoriesList.appendChild(newItem);
      
      // Add event listener to new remove button
      newItem.querySelector('.remove-btn').addEventListener('click', removeItem);
    });
    
    // Add new entry type
    document.getElementById('addTypeBtn').addEventListener('click', function() {
      const typesList = document.getElementById('entryTypesList');
      const newIndex = document.querySelectorAll('.type-input').length;
      
      const newItem = document.createElement('div');
      newItem.className = 'settings-item';
      newItem.innerHTML = `
        <input type="text" placeholder="New Entry Type" class="type-input" data-index="${newIndex}">
        <button type="button" class="remove-btn" data-type="entryType" data-index="${newIndex}">✕</button>
      `;
      
      typesList.appendChild(newItem);
      
      // Add event listener to new remove button
      newItem.querySelector('.remove-btn').addEventListener('click', removeItem);
    });
    
    // Remove item functionality
    function removeItem() {
      const type = this.dataset.type;
      const index = parseInt(this.dataset.index);
      
      // Only allow removal if there's more than one item
      const items = document.querySelectorAll(type === 'category' ? '.category-input' : '.type-input');
      if (items.length <= 1) {
        alert(`You must have at least one ${type === 'category' ? 'category' : 'entry type'}.`);
        return;
      }
      
      this.parentElement.remove();
      
      // Update indices for remaining elements
      document.querySelectorAll(type === 'category' ? '.category-input' : '.type-input').forEach((item, idx) => {
        item.dataset.index = idx;
        item.parentElement.querySelector('.remove-btn').dataset.index = idx;
      });
    }
    
    // Add event listeners to all remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', removeItem);
    });
    
    // Export data functionality
    document.getElementById('exportDataBtn').addEventListener('click', function() {
      const exportFormats = [];
      document.querySelectorAll('.export-options input[type="checkbox"]:checked').forEach(checkbox => {
        exportFormats.push(checkbox.value);
      });
      
      if (exportFormats.length === 0) {
        alert('Please select at least one export format.');
        return;
      }
      
      const items = JSON.parse(localStorage.getItem('logseqItems') || '[]');
      
      exportFormats.forEach(format => {
        if (format === 'json') {
          exportUtils.downloadFile(JSON.stringify(items, null, 2), 'logseq-notes-export.json', 'application/json');
        } else if (['markdown', 'obsidian', 'logseq'].includes(format)) {
          const exportData = exportUtils.generateMarkdownExport(items, format);
          exportUtils.downloadFile(exportData, `notes-export-${format}.md`, 'text/markdown');
        } else if (format === 'jira') {
          const exportData = exportUtils.generateJiraExport(items);
          exportUtils.downloadFile(exportData, 'jira-export.csv', 'text/csv');
        } else {
          alert(`Export for ${format} is not yet implemented.`);
        }
      });
    });
    // Reset to default settings
    document.getElementById('resetSettingsBtn').addEventListener('click', function() {
      if (confirm('Are you sure you want to reset all settings to default values?')) {
        localStorage.removeItem('localAppConfig');
        renderSettingsPage(); // Reload the page with default settings
      }
    });
    
    // Save settings
    document.getElementById('settingsForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Gather all settings
      const categories = Array.from(document.querySelectorAll('.category-input'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
        
      const entryTypes = Array.from(document.querySelectorAll('.type-input'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
      
      // Save export options
      const exportOptions = Array.from(document.querySelectorAll('.export-options input[type="checkbox"]'))
        .map(checkbox => ({ 
          format: checkbox.value, 
          enabled: checkbox.checked 
        }));
        
      const itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
      const defaultView = document.getElementById('defaultView').value;
      
      // Validate - make sure we have at least one category and entry type
      if (categories.length === 0) {
        alert('You must have at least one category.');
        return;
      }
      
      if (entryTypes.length === 0) {
        alert('You must have at least one entry type.');
        return;
      }
      
      // Create new config object
      const newConfig = {
        ...localConfig,
        categories,
        entryTypes,
        exportOptions,
        itemsPerPage,
        defaultView
      };
      
      // Save to localStorage
      localStorage.setItem('localAppConfig', JSON.stringify(newConfig));
      
      alert('Settings saved successfully!');
      renderHomePage();
    });
   }
   
   function generateMarkdownExport(items, format) {
    let output = '';
    
    items.forEach(item => {
      switch(format) {
        case 'logseq':
          output += `## ${item.title}\n`;
          output += `- type:: ${item.type}\n`;
          output += `- category:: ${item.category}\n`;
          if (item.tags && item.tags.length > 0) {
            output += `- tags:: ${item.tags.map(tag => `#${tag}`).join(' ')}\n`;
          }
          if (item.dueDate) {
            output += `- due:: ${item.dueDate}\n`;
          }
          output += `- created:: ${new Date(item.createdAt).toISOString().split('T')[0]}\n\n`;
          output += `${item.content}\n\n`;
          break;
          
        case 'obsidian':
          output += `# ${item.title}\n\n`;
          output += `Type: ${item.type}  \n`;
          output += `Category: ${item.category}  \n`;
          if (item.tags && item.tags.length > 0) {
            output += `Tags: ${item.tags.map(tag => `#${tag}`).join(' ')}  \n`;
          }
          if (item.dueDate) {
            output += `Due Date: ${item.dueDate}  \n`;
          }
          output += `Created: ${new Date(item.createdAt).toISOString().split('T')[0]}  \n\n`;
          output += `${item.content}\n\n---\n\n`;
          break;
          
        case 'markdown':
          output += `# ${item.title}\n\n`;
          output += `**Type:** ${item.type}  \n`;
          output += `**Category:** ${item.category}  \n`;
          if (item.tags && item.tags.length > 0) {
            output += `**Tags:** ${item.tags.join(', ')}  \n`;
          }
          if (item.dueDate) {
            output += `**Due Date:** ${item.dueDate}  \n`;
          }
          output += `**Created:** ${new Date(item.createdAt).toISOString().split('T')[0]}  \n\n`;
          output += `${item.content}\n\n---\n\n`;
          break;
      }
    });
    
    return output;
   }
   
   function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
   }

  function renderAboutPage() {
    app.innerHTML = `
      <div class="container">
        <h1>About Logseq Notes App</h1>
        
        <div class="about-section">
          <h2>Application Info</h2>
          <p>Version: 1.0.0</p>
          <p>Last Updated: April 28, 2025</p>
          <p>This is a lightweight note-taking application designed to help you organize your thoughts, tasks, and ideas in a structured way.</p>
        </div>
        
        <div class="about-section">
          <h2>Features</h2>
          <ul>
            <li>Create and organize notes, tasks, journal entries, and ideas</li>
            <li>Categorize entries for better organization</li>
            <li>Add tags to make finding related items easier</li>
            <li>Track due dates for tasks</li>
            <li>Local storage for offline use</li>
            <li>Customizable categories and entry types</li>
          </ul>
        </div>
        
        <div class="about-section">
          <h2>How to Use</h2>
          <h3>Adding Items</h3>
          <p>Click "Add Item" from the main menu to create a new entry. Choose the appropriate type, category, and fill in the details.</p>
          
          <h3>Viewing Items</h3>
          <p>Click "View Items" to see all your saved entries. Use the filters to find specific items by type, category, or by searching for text in the title or content.</p>
          
          <h3>Settings</h3>
          <p>Customize the application by adding or removing categories and entry types. You can also change display preferences.</p>
        </div>
        
        <div class="about-section">
          <h2>Data Storage</h2>
          <p>All your data is stored locally in your browser. No information is sent to any server. Clear your browser data or localStorage to reset the application.</p>
          <p>To backup your data, use the export function in the settings page.</p>
        </div>
        
        <div class="form-actions">
          <button id="backButton" class="btn btn-secondary">Back to Home</button>
        </div>
      </div>
    `;
    
    // Back button functionality
    document.getElementById('backButton').addEventListener('click', renderHomePage);
  }

  // Initialize the app
  renderHomePage();
});