// Replace your setup.js with this content
const fs = require('fs');
const path = require('path');

try {
  console.log('Starting setup process...');
  
  // Create folder structure
  const directories = [
    './src',
    './src/components',
    './src/utils',
    './src/assets',
    './src/config'
  ];

  directories.forEach(dir => {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
      } else {
        console.log(`Directory already exists: ${dir}`);
      }
    } catch (err) {
      console.error(`Error creating directory ${dir}:`, err);
    }
  });

  // Create config file
  const configPath = path.join('./src/config', 'appConfig.json');
  const configData = {
    categories: ['Personal', 'Work', 'Health', 'Learning', 'Projects'],
    entryTypes: ['Journal Item', 'Note', 'Idea', 'Task'],
    // Rest of your config...
  };

  try {
    fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
    console.log(`Created configuration file at: ${configPath}`);
  } catch (err) {
    console.error('Error writing config file:', err);
  }

  console.log('Setup complete!');
} catch (err) {
  console.error('Top-level error:', err);
}