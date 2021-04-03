import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "./Export.css";

function Export() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [todo, setTodo] = React.useState([]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
    }
    return "not-handled";
  };

  const setStyleLine = (type) => {
    const newState = RichUtils.toggleInlineStyle(editorState, type);
    setEditorState(newState);
  };

  const toggleTypeBlock = (headerType) => {
    const newState = RichUtils.toggleBlockType(editorState, headerType);
    setEditorState(newState);
  };

  const converToText = () => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const description = blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");
    return description;
  };

  const saveButton = () => {
    // Save file for download for the input
    const description = converToText();
    const element = document.createElement("a");
    const file = new Blob([description], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  const addTodo = () => {
    const description = converToText();
    todo.push(description);
    setTodo(todo);
  };

  return (
    <>
      <Container>
        <h1 className="title">Todo App</h1>

        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="editor">
              <div className="options">
                <button onClick={() => setStyleLine("BOLD")}>Bold</button>
                <button onClick={() => setStyleLine("ITALIC")}>Italic</button>
                <button onClick={() => setStyleLine("UNDERLINE")}>
                  Underline
                </button>
                <button onClick={() => toggleTypeBlock("header-one")}>
                  H1
                </button>
                <button onClick={() => toggleTypeBlock("header-two")}>
                  H2
                </button>
                <button onClick={() => toggleTypeBlock("header-three")}>
                  H3
                </button>
                <button onClick={() => toggleTypeBlock("header-four")}>
                  H4
                </button>
                <button onClick={() => toggleTypeBlock("header-five")}>
                  H5
                </button>
                <button onClick={() => toggleTypeBlock("header-six")}>
                  H6
                </button>
                <button onClick={() => toggleTypeBlock("unordered-list-item")}>
                  UL
                </button>
                <button onClick={() => toggleTypeBlock("ordered-list-item")}>
                  OL
                </button>
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
          <Col md={{ span: 8, offset: 2 }}>
            <Button className="saveButton" onClick={saveButton}>
              Save as a text file
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              variant="outline-primary"
              className="saveButton"
              onClick={addTodo}
            >
              Add Todo
            </Button>
          </Col>
        </Row>

        <Row>
          <ul>
            {todo.length > 0 ? (
              todo.map((todo) => <li key={todo}>{todo}</li>)
            ) : (
              <p>No todos</p>
            )}
          </ul>
        </Row>
      </Container>
    </>
  );
}

export default Export;
