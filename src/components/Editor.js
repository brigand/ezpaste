import React, {PropTypes} from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import './Editor.css';

export default
class Editor extends React.Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  render() {
    return (
      <div className="Editor">
        <CodeMirror
          preserveScrollPosition
          value={this.props.code}
          onChange={this.props.onChange}
          options={{
            mode: 'javascript',
            lineNumbers: true,
            gutters: ["CodeMirror-lint-markers"],
          }}
        />
      </div>
    );
  }
}
