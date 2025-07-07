document.getElementById('processBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('upload');
  const file = fileInput.files[0];
  const status = document.getElementById('status');

  if (!file) {
    status.textContent = 'Please select an image.';
    return;
  }

  status.textContent = 'Extracting text...';

  const result = await Tesseract.recognize(file, 'eng');
  const extractedText = result.data.text.trim();
  status.textContent = 'Sending to ChatGPT tab...';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (message) => {
        window.postMessage({ type: "FROM_EXTENSION", text: message }, "*");
      },
      args: [extractedText]
    });
  });
});
