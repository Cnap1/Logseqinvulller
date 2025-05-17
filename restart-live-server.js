import { exec } from 'child_process';

// Function to execute a shell command
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n${description}...`);
    const process = exec(command);

    process.stdout.on('data', data => console.log(data.toString()));
    process.stderr.on('data', data => console.error(data.toString()));

    process.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${description} failed with exit code ${code}`));
      }
    });
  });
}

(async () => {
  try {
    // Kill any running live server processes
    await runCommand(
      'taskkill /IM node.exe /F',
      'Terminating any running live server processes'
    );

    // Run npm build
    await runCommand('npm run build', 'Building the project');

    // Start http-server
    await runCommand(
      'http-server',
      'Starting http-server on port 5501'
    );

    console.log('\nHTTP server restarted successfully!');
  } catch (error) {
    console.error(`\nError: ${error.message}`);
  }
})();