import React, {PropTypes} from 'react';

export default
class Editor extends React.Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}
