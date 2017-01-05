import React from 'react';
import './Help.css';

export default
class Help extends React.Component {
  render() {
    return (
      <div className="Help">
        <h1>Welcome to ezpaste</h1>
        <p>To start, pick one of the templates. More will be added in the future</p>
        <p>{`In web pastes, you're provided two helper functions: insertHtml and insertCss.
        These can be used with tagged template literals (and es6 feature) to insert
        content into the page. This way, the interface isn't cluttered with
        multiple code editors.
        `}</p>
        <p>{`Libraries you need are automatically detected based on variables you
        use.`}</p>
        <p>
          {`If you run into issues, or want to request features `}
          <a href="https://github.com/brigand/ezpaste/issues/new" target="_blank">
            {`file an issue on the github repo.`}
          </a>
        </p>
      </div>
    );
  }
}
