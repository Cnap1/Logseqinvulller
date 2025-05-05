// src/utils/exportUtils.js
function generateMarkdownExport(items, format) {
    let output = '';
    
    items.forEach(item => {
      switch(format) {
        case 'logseq':
          output += `- ${item.title}\n`;
          break;
        case 'obsidian':
          output += `# ${item.title}\n\n${item.content}\n`;
          break;
        case 'markdown':
          output += `## ${item.title}\n\n${item.content}\n`;
          break;
      }
    });
    
    return output;
  }
  
  function generateJiraExport(items) {
    // CSV header
    let output = 'Summary,Type,Status,Priority,Description,Due Date,Labels\n';
    items.forEach(item => {
      // Map fields to JIRA format
      const summary = escapeCsvField(item.title);
      const type = escapeCsvField(item.type === 'Task' ? 'Task' : 'Story');
      const status = escapeCsvField(item.type === 'Task' ? 'To Do' : 'Open');
      const priority = escapeCsvField('Medium');
      const description = escapeCsvField(item.content);
      const dueDate = item.dueDate ? escapeCsvField(item.dueDate) : '';
      const labels = item.tags && item.tags.length > 0 ? 
        escapeCsvField(item.tags.join(' ')) : '';
      
      output += `${summary},${type},${status},${priority},${description},${dueDate},${labels}\n`;
    });
    
    return output;
  }
  
  function escapeCsvField(field) {
    if (typeof field !== 'string') {
      return '""';
    }
    
    const escaped = field.replace(/"/g, '""');
    
    if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')) {
      return `"${escaped}"`;
    }
    
    return escaped;
  }
  
  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  
  const exportFormatters = {
    'json': {
      generate: (items) => JSON.stringify(items, null, 2),
      filename: 'logseq-notes-export.json',
      mimeType: 'application/json'
    },
    'markdown': {
      generate: (items) => generateMarkdownExport(items, 'markdown'),
      filename: 'notes-export-markdown.md',
      mimeType: 'text/markdown'
    },
    'obsidian': {
      generate: (items) => generateMarkdownExport(items, 'obsidian'),
      filename: 'notes-export-obsidian.md',
      mimeType: 'text/markdown'
    },
    'logseq': {
      generate: (items) => generateMarkdownExport(items, 'logseq'),
      filename: 'notes-export-logseq.md',
      mimeType: 'text/markdown'
    },
    'jira': {
      generate: (items) => generateJiraExport(items),
      filename: 'jira-export.csv',
      mimeType: 'text/csv'
    }
  };
  
  module.exports = {
    generateMarkdownExport,
    generateJiraExport,
    downloadFile,
    exportFormatters
  };