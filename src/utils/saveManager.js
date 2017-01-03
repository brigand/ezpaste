
const HOST = 'https://api.github.com/'

export default {
  save(code, layout) {
    return fetch(HOST + 'gists', {
      method: 'POST',
      body: JSON.stringify({
        description: 'an ezpaste',
        public: false,
        files: {
          'paste.js': {
            content: code,
          },
          'layout.json': {
            content: JSON.stringify(layout),
          }
        },
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.json()))
    .then(data => {
      return data.id;
    })
  },
  load(id) {
    return fetch(HOST + 'gists/' + id)
    .then(res => res.ok ? res.json() : Promise.reject(res.json()))
    .then(({files}) => {
      const code = files['paste.js'].content;
      const layout = JSON.parse(files['layout.json'].content);
      return {code, layout};
    });
  }
}
