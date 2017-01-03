import React, {PropTypes} from 'react';
import getScriptsForCode from '../utils/getScriptsForCode';
import './Preview.css';

export default
class Preview extends React.Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    layout: PropTypes.object,
  };

  render() {

    return (
      <div className="Preview">
        {this.props.layout.right === 'web'
          ? this.renderWeb()
          : this.props.layout.right === 'console'
          ? this.renderConsole()
          : <div>Uh-oh. The layout is {this.props.layout.right} and I {"don't"} know what to do!</div>
        }
      </div>
    );
  }

  renderWeb() {
    const path = 'preview/web-preview.html';
    const payload = {
      scripts: getScriptsForCode(this.props.code),
      src: this.props.code + '\n\n// cache buster: ' + Math.random(),
    };
    const src = path + '?' + encodeURIComponent(JSON.stringify(payload));
    return <iframe src={src} />;
  }
}
