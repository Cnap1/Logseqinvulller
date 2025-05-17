const path = require('path');
  const filePath = path.resolve(__dirname, '../src/assets/expanded-emotion-wheel-translations-with-source.csv');
function parseCSV() {
  const filePath = path.resolve(__dirname, '..src/assets/expanded-emotion-wheel-translations-with-source.csv');
  const csvData = fs.readFileSync(filePath, 'utf8');

  return csvData
    .split('\n')
    .slice(2) // Skip the header rows
    .map(row => row.split(',').slice(0, 3)); // Extract columns 1, 2, and 3
}


module.exports = { parseCSV };