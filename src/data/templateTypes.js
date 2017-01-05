// templateTypes

export default [
  {
    name: 'Web',
    description: 'A web project with live preview',
    layout: {
      left: 'js',
      right: 'web',
    },
    code: `
insertHtml\`
<div id="content">
</div>
\`;

insertCss\`
#content { background: #eee }
\`;

var content = document.getElementById('content');
content.textContent = 'Hello, world!';
`.trim(),
  },
  {
    name: 'Console',
    disabled: true,
    description: 'Console preview instead of a web page',
    layout: {
      left: 'js',
      right: 'console',
    },
    code: `
console.log('Hello, world!');
`.trim(),
  },
  {
    name: 'React.js',
    description: 'A React.js project with live preview',
    layout: {
      left: 'js',
      right: 'web',
    },
    code: `
insertHtml\`<div id="root"></div>\`;
insertCss\`
.App { color: #333; }
\`;


class App extends React.Component {
  render() {
    return (
      <div className="App">Hello, world!</div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
`.trim(),
  },
  // {
  //   name: 'Angular 1.x',
  //   description: 'An Angular 1.x project with live preview',
  // },
  // {
  //   name: 'Angular 2.x',
  //   description: 'An Angular 2.x project with live preview',
  // },
];
