import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";

function Todo({ todo }) {
  return (
    <div style={{ textDecoration: todo.completed ? "line-through" : "" }}>
      <Row className="todo-item">
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 10, offset: 1 }}
          lg={{ span: 8, offset: 2 }}
        >
          <li>{todo.title}</li>
        </Col>
        {/* <Col xs={6} sm={6} lg={1}>
          <i className="far fa-edit" onClick={edit} />
        </Col>
        <Col xs={6} sm={6} lg={1}>
          <i className="fas fa-trash" />
        </Col> */}
      </Row>
    </div>
  );
}

function CreateTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Add a new task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Home() {
  const [todo, setTodo] = React.useState([
    {
      title: "Do homework",
      completed: false,
    },
    {
      title: "Do exercises",
      completed: true,
    },
  ]);

  const addTodo = (title) => {
    const newTodo = [...todo, { title, completed: false }];
    setTodo(newTodo);
  };

  return (
    <>
      <Container>
        <h1 className="title">TODO LIST</h1>

        <Row>
          <Col
            className="todo-list"
            md={{ span: 8, offset: 2 }}
            xs={{ span: 10, offset: 1 }}
          >
            {todo.map((todo, index) => (
              <Todo todo={todo} index={index} key={index} />
            ))}
          </Col>
        </Row>

        <Row>
          <Col
            className="add-todo"
            md={{ span: 8, offset: 2 }}
            xs={{ span: 10, offset: 1 }}
          >
            <CreateTodo addTodo={addTodo} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
