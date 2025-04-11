import "./App.css";

function App() {
  const startScript = () => {
    // Отправляем сообщение в content.js

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "START_SCRIPT" },

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          (response) => {
            console.log("Response from content.js:", response);
          }
        );
      }
    });
  };

  return (
    <div className="card">
      <button onClick={startScript}>start script</button>
    </div>
  );
}

export default App;
