window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data || event.data.type !== "FROM_EXTENSION") return;

  const inputBox = document.querySelector("textarea");
  if (!inputBox) return;

  inputBox.value = event.data.text;

  inputBox.dispatchEvent(new Event("input", { bubbles: true }));

  setTimeout(() => {
    const sendButton = inputBox.closest('form').querySelector('button');
    if (sendButton) sendButton.click();
  }, 300);
});
