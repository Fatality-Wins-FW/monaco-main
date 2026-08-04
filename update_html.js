const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacement = `<script>
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
        window.MonacoEnvironment = {
            getWorkerUrl: function(workerId, label) {
                const script = 'self.MonacoEnvironment = { baseUrl: \\'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/\\' }; importScripts(\\'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/base/worker/workerMain.js\\');';
                const blob = new Blob([script], { type: 'text/javascript' });
                return URL.createObjectURL(blob);
            }
        };
    </script>`;

html = html.replace(/<script>\s*require\.config\(\{ paths: \{ 'vs': 'https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/monaco-editor\/0\.45\.0\/min\/vs' \}\}\);\s*<\/script>/, replacement);

fs.writeFileSync('index.html', html);
console.log('Replaced MonacoEnvironment via script!');
