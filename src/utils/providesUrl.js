import React from 'react';

const listeners = [];

window.addEventListener('popstate', () => {
  listeners.forEach(listener => listener());
});

const normalizePathName = (pathname) => {
  if (!pathname) return '/';
  if (pathname[0] === '/') return pathname;
  return `/${pathname}`;
}

const updateUrl = (opts) => {
  const pathname = normalizePathName(opts.pathname);
  const query = opts.query || '';
  const url = query ? `${pathname}?${query}` : pathname;
  history.pushState({}, '', url);
  listeners.forEach(listener => listener());
};

export default (Component) => {
  return class ProvidesUrl extends React.Component {
    constructor(props) {
      super(props);
      this.state = {location: {
        query: '',
        pathname: '/',
      }};
    }

    updateLocation() {
      this.setState({
        location: {
          pathname: window.location.pathname,
          query: window.location.search.slice(1),
        }
      });
    }

    componentWillMount() {
      this.updateLocation();
    }

    componentDidMount() {
      this.handler = this.updateLocation.bind(this);
      listeners.push(this.handler);
    }

    componentWillUnmount() {
      listeners.splice(listeners.indexOf(this.handler), 1);
    }

    render() {
      return <Component
        {...this.props}
        url={this.state.location}
        updateUrl={updateUrl}
      />
    }
  };
};
