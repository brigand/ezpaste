import React, {PropTypes} from 'react';
import TEMPLATE_TYPES from '../data/templateTypes';
import './Templates.css';

export default
class Templates extends React.Component {
  static propTypes = {
    code: PropTypes.string,
  };

  render() {
    return (
      <div className="Templates">
        {TEMPLATE_TYPES.map((data, index) => {
          return this.renderTemplate(data);
        })}
      </div>
    );
  }

  renderTemplate(data) {
    let className = 'Templates-template';
    if (data.disabled) {
      className += ' Templates-template-disabled';
    }
    return (
      <div
        key={data.name}
        className={className}
        onClick={() => {
          if (data.disabled) return;

          this.props.onSelect({
            layout: data.layout,
            code: data.code,
          });
        }}
      >
        <div className="Templates-template-icon">
        </div>
        <div className="Templates-template-name">
          {data.name}
        </div>
        <div className="Templates-template-description">
          {data.description}
        </div>
      </div>
    )
  }
}
