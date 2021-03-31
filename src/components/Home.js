import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Home.css';

function Home() {
   
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
    }
    return 'not-handled'
  }

  const setStyleLine = (type) => {
    const newState = RichUtils.toggleInlineStyle(editorState, type)
    setEditorState(newState)
  }

  const toggleTypeBlock = (headerType) => {
    const newState = RichUtils.toggleBlockType(editorState, headerType)
    setEditorState(newState)
  }

  const handleClick = (ev) => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const description = blocks
      .map(block => (!block.text.trim() && "\n") || block.text)
      .join("\n");

    console.log(description);

    const element = document.createElement("a");
    const file = new Blob([description],    
                {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
    
  }

  return (
    <>
      <div className="card">
        <h1>Todo App</h1>              
      </div>

      <div className="card">
        <div className="editor">
          <div className="options">
            <button onClick={() => setStyleLine('BOLD')}>Bold</button>
            <button onClick={() => setStyleLine('ITALIC')}>Italic</button>
            <button onClick={() => setStyleLine('CODE')}>Code</button>
            <button onClick={() => setStyleLine('UNDERLINE')}>Underline</button>
            <button onClick={() => toggleTypeBlock('header-one')}>H1</button>
            <button onClick={() => toggleTypeBlock('header-two')}>H2</button>
            <button onClick={() => toggleTypeBlock('header-three')}>H3</button>
            <button onClick={() => toggleTypeBlock('header-four')}>H4</button>
            <button onClick={() => toggleTypeBlock('header-five')}>H5</button>
            <button onClick={() => toggleTypeBlock('header-six')}>H6</button>            
            <button onClick={() => toggleTypeBlock('unordered-list-item')}>UL</button>
            <button onClick={() => toggleTypeBlock('ordered-list-item')}>OL</button>
          </div>
          <Editor         
            editorState={editorState} 
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}   
          />
        </div>

        <div className="card">
          <button className="button" onClick={handleClick}>Save Text</button>
        </div>
      </div>

    </>
  )
}

export default Home;
