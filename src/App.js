import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Quill from './components/quill'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onChange = (editorState) => {
    console.log(editorState);
    this.setState({ editorState });
  }

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  handleKeyCommand = (command) => {
    console.log(command);
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    // console.log(newState);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div>
              <button onClick={this.onToggleCode}>Code Block</button>
              <button onClick={this.onUnderlineClick}>Underline</button>
              <Editor
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
              />
            </div>
            <br/>            
            <Link to="/quill"><button>Quill</button></Link>
          </Route>
          <Route path="/quill">
            <Quill />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;