import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AddFile from './components/add-file';
import FileList from './components/file-list';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/add">
            <AddFile />
          </Route>
          <Route path="/">
            <FileList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
