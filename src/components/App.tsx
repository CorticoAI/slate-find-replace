import Editor from "./Editor";

import "../styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>Slate find & replace!</h1>
        <p>ft. The Great Gatsby</p>
        <Editor />
      </div>
    </div>
  );
}
