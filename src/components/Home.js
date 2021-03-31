import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
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
    // Save file for download for the input
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const description = blocks
      .map(block => (!block.text.trim() && "\n") || block.text)
      .join("\n");

    const element = document.createElement("a");
    const file = new Blob([description], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
    
  }

  return (
    <>
      <Container>        
        <h1 className="title">Todo App</h1>              

        <Row>
          <Col md={{ span: 8, offset: 2 }} sm={12} xs={12}>
            <div className="editor">
              <div className="options">
                <button onClick={() => setStyleLine('BOLD')}>Bold</button>
                <button onClick={() => setStyleLine('ITALIC')}>Italic</button>                
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
          </Col>       
        </Row>

        <Row>
          <Col md={{ span: 8, offset: 2 }} sm={12} xs={12}>
            <Button variant="outline-primary" className="saveButton" onClick={handleClick}>
              Save as a text file
            </Button>
          </Col>
        </Row>

      </Container>

    </>
  )
}

export default Home;
