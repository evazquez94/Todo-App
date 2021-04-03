import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Home.css";

function Home() {
  const [todo, setTodo] = React.useState([]);
  const [input, setInput] = React.useState("");

  const addTodo = () => {
    let newTodo = todo;
    newTodo.push(input);
    setTodo(newTodo);
    setInput("");
  };

  const onChangeInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <Container>
        <h1 className="title">To do App</h1>

        <Row>
          <Col
            className="todo-list"
            md={{ span: 8, offset: 2 }}
            xs={{ span: 10, offset: 1 }}
          >
            <ul>
              {todo.length > 0 ? (
                todo.map((todo) => {
                  return (
                    <Row className="todo-item">
                      <Col xs={10} sm={10} lg={{span: 8, offset:2}}>
                        <li key={todo}>{todo}</li>
                      </Col>
                      <Col xs={6} sm={6} lg={1}>
                        <i className="far fa-edit" onClick={()=>console.log(todo)}/>
                      </Col>
                      <Col xs={6} sm={6} lg={1}>
                        <i className="fas fa-trash" />
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <>
                  <h3>No to do to show</h3>
                  <p>Add some task in the input below</p>
                </>
              )}
            </ul>
          </Col>
        </Row>

        <Row>
          <Col className="add-todo">
            <input type="text" value={input} onChange={onChangeInput} />
          </Col>
        </Row>
        <Row>
          <Col className="add-todo-button">
            <Button variant="outline-primary" onClick={addTodo}>
              Add Todo
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
