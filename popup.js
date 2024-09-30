document.getElementById('startButton').addEventListener('click', () => {
  // Query all tabs in the current window
  chrome.tabs.query({}, (tabs) => {
    // Execute the disableMouse function in each tab
    tabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: disableMouse
      });
    });
  });

  // Close the popup after 2 seconds
  setTimeout(() => {
    window.close();
  }, 2000);
});

function disableMouse() {
  // Prevent any mouse action from happening
  const preventMouseActions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  // Disable all mouse events
  document.body.style.cursor = 'none'; // Hide the cursor
  document.addEventListener('mousemove', preventMouseActions, true);
  document.addEventListener('mousedown', preventMouseActions, true);
  document.addEventListener('mouseup', preventMouseActions, true);
  document.addEventListener('click', preventMouseActions, true);
  document.addEventListener('dblclick', preventMouseActions, true);  // Double click initially disabled too
  document.addEventListener('contextmenu', preventMouseActions, true);

  // Restore mouse functionality on double-click
  document.addEventListener('dblclick', () => {
    document.body.style.cursor = ''; // Restore the cursor
    document.removeEventListener('mousemove', preventMouseActions, true);
    document.removeEventListener('mousedown', preventMouseActions, true);
    document.removeEventListener('mouseup', preventMouseActions, true);
    document.removeEventListener('click', preventMouseActions, true);
    document.removeEventListener('contextmenu', preventMouseActions, true);
    document.removeEventListener('dblclick', preventMouseActions, true); // Enable double-click
    alert('Mouse control restored.');
  }, { once: true }); // Restore mouse on double-click, happens only once
}
