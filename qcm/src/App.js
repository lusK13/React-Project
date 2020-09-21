import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import QuestionsView from "./components/QuestionsView";
import AddQuestion from "./components/AddQuestion";
import DeleteQuestion from "./components/DeleteQuestion";
import { QuestionsContext } from "./reducer/questionManager";
import { Header, Menu } from "./styled";

const App = () => {
  const [state] = useContext(QuestionsContext);
  const { finish } = state;

  return (
    <>
      <Router>
        <Header>
          <Menu>
            <Link to='/'>Home</Link>
          </Menu>
          <Menu>
            <Link to='/addQuestion'>Add question</Link>
          </Menu>
          <Menu>
            <Link to='/deleteQuestion'>Delete question</Link>
          </Menu>
        </Header>

        <Switch>
          <Route exact path='/'>
            <QuestionsView />
          </Route>

          <Route path='/addQuestion'>
            <AddQuestion />
          </Route>

          <Route path='/deleteQuestion'>
            <DeleteQuestion />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
