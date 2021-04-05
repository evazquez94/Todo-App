import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";

function Todo({ todo, index, completeTodo, removeTodo }) {
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
        <Col xs={6} sm={6} lg={1}>
          <button className="button" onClick={() => completeTodo(index)}>
            <i className="far fa-check-circle" />
          </button>
        </Col>
        <Col xs={6} sm={6} lg={1}>
          <button className="button" onClick={() => removeTodo(index)}>
            <i className="far fa-trash-alt" />
          </button>
        </Col>
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
      completed: false,
    },
  ]);
  const [todoLeft, setTodoLeft] = React.useState(0);

  React.useEffect(() => { 
    setTodoLeft(todo.filter(todo => !todo.completed).length);  
  });
    
  const addTodo = title => {
    const newTodo = [...todo, { title, completed: false }];
    setTodo(newTodo);
  };

  const completeTodo = index => {
    const newTodo = [...todo];
    newTodo[index].completed = !newTodo[index].completed;
    setTodo(newTodo);
  };

  const removeTodo = index => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  }

  const title = "todo list";

  return (
    <>
      <Container>
        <h1 className="title">{title.toUpperCase()}</h1>
        <h2 className="title">PENDING TASKS - {todoLeft}</h2>
        <Row>
          <Col
            className="todo-list"
            md={{ span: 8, offset: 2 }}
            xs={{ span: 10, offset: 1 }}
          >
            {todo.map((todo, index) => (
              <Todo
                todo={todo}
                index={index}
                key={index}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
              />
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
