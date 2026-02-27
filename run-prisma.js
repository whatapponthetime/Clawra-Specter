const { exec } = require('child_process');

console.log("Running prisma db push...");
exec('npx prisma db push', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
