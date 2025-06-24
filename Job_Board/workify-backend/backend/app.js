const express = require('express');
const app = express();
const port = 3000;

app.get('/start-task', async (req, res) => {
    const { exec } = require('child_process');
    exec('python3 ../worker/call_task.py', (err, stdout) => {
        if (err) return res.status(500).send('Task failed');
        res.send(`Task started: ${stdout}`);
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
