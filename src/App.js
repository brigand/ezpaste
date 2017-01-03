import React, { Component } from 'react';
import './App.css';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Templates from './components/Templates';
import providesUrl from './utils/providesUrl';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      definitelyShowTemplates: false,
      code: '',
    };
  }
  render() {
    const showTemplates = this.state.definitelyShowTemplates || this.props.url.query.length < 2;
    return (
      <div className="App">
        <div className="App-header">
          test stuff
        </div>
        <div className="App-content">
          <Editor
            code={this.state.code}
            onChange={(code) => this.setState({code})}
          />
          <Preview
            code={this.state.code}
          />
          {showTemplates && this.renderTemplates()}
        </div>
      </div>
    );
  }

  renderTemplates() {
    return (
      <div className="App-templates">
        <Templates
        />
        {this.state.definitelyShowTemplates && <div
          className="App-templates-close"
          onClick={() => this.setState({definitelyShowTemplates: false})}
        >
          ×
        </div>}
      </div>
    )
  }
}

export default providesUrl(App);
