const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacement = `        window.MonacoEnvironment = {
            getWorkerUrl: function(workerId, label) {
                const script = 'self.MonacoEnvironment = { baseUrl: \\'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/\\' }; importScripts(\\'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/base/worker/workerMain.js\\');';
                const blob = new Blob([script], { type: 'text/javascript' });
                return URL.createObjectURL(blob);
            }
        };`;

const start = html.indexOf('window.MonacoEnvironment =');
const end = html.indexOf('</script>', start);

html = html.substring(0, start) + replacement + '\n    ' + html.substring(end);

fs.writeFileSync('index.html', html);
console.log('Fixed MonacoEnvironment Blob URL via script!');
