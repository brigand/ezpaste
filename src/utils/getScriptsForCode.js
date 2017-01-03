import depVersions from '../data/depVersions';

export default function getScriptsForCode(code) {
  const scripts = [];

  if (['React', 'ReactDOM'].some((name) => code.indexOf(name) !== -1)) {
    scripts.push(depVersions.React);
    scripts.push(depVersions.ReactDOM);
  }

  if (code.indexOf('_.') !== -1) {
    scripts.push(depVersions._);
  }

  return scripts;
};
