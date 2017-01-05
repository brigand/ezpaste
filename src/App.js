import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import './App.css';
import Button from './components/Button';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Templates from './components/Templates';
import Help from './components/Help';
import providesUrl from './utils/providesUrl';
import saveManager from './utils/saveManager';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      definitelyShowTemplates: false,
      code: '',
      computedCode: '',
      layout: null,
      showHelp: false,
    };
    this.updateComputedCode = debounce(
      this.updateComputedCode.bind(this),
      500,
    );
    this.handleSave = this.handleSave.bind(this);
  }
  updateCode(code) {
    this.setState({code});
    this.updateComputedCode();
  }
  updateComputedCode() {
    this.setState({computedCode: this.state.code});
  }

  handleSave() {
    saveManager.save(this.state.code, this.state.layout)
    .then((id) => {
      this.props.updateUrl({
        pathname: this.props.url.pathname,
        query: id,
      });
    })
    .catch((err) => {
      console.error(err);
      alert('Save failed, see console for details :/');
    })
  }

  componentDidMount() {
    if (this.props.url.query && this.props.url.query.length > 5) {
      saveManager.load(this.props.url.query)
      .then(({code, layout}) => {
        this.setState({layout});
        this.updateCode(code);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to load ' + this.props.url.query + '. See console for error message.');
      });
    }
  }

  render() {
    const {definitelyShowTemplates, layout, code, showHelp} = this.state;
    const showTemplates = definitelyShowTemplates || (!this.state.code && !this.state.layout);

    return (
      <div className="App">
        <div className="App-header">
          <span className="App-header-name">ezpaste</span>
          <span className="App-header-spacer" />
          {this.renderButtons()}
        </div>
        <div className="App-content">
          {layout && <Editor
            code={code}
            layout={layout}
            onChange={(code) => this.updateCode(code)}
          />}
          {layout && <Preview
            code={this.state.computedCode}
            layout={layout}
          />}
          {showTemplates && this.renderTemplates()}
          {showHelp && this.renderHelp()}
        </div>
      </div>
    );
  }

  renderButtons() {
    return (
      <div className="App-header-buttons-wrapper">
        <div className="App-header-buttons-button">
          <Button
            onClick={() => {
              this.setState({definitelyShowTemplates: true});
            }}
          >
            New
          </Button>
        </div>
        <div className="App-header-buttons-button">
          <Button onClick={this.handleSave}>Save</Button>
        </div>
        <div className="App-header-buttons-button">
          <Button onClick={() => this.setState({showHelp: !this.state.showHelp})}>
            Help
          </Button>
        </div>
      </div>
    )
  }

  renderTemplates() {
    return (
      <div className="App-templates">
        <Templates
          onSelect={({code, layout}) => {
            this.setState({
              layout,
              definitelyShowTemplates: false,
            });
            this.updateCode(code);
          }}
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

  renderHelp() {
    return (
      <div className="App-help">
        <Help />
          <div
            className="App-help-close"
            onClick={() => this.setState({showHelp: false})}
          >
            ×
          </div>
      </div>
    )
  }
}

export default providesUrl(App);
