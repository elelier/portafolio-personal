const React = require('react');

const applyProps = (node, props) => {
  Object.entries(props || {}).forEach(([key, value]) => {
    if (key === 'children' || value == null) {
      return;
    }

    if (key === 'charSet') {
      node.setAttribute('charset', value);
      return;
    }

    node.setAttribute(key, value);
  });
};

function Helmet({ children }) {
  React.useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {
        return;
      }

      if (child.type === 'title') {
        document.title = React.Children.toArray(child.props.children).join('');
        return;
      }

      if (child.type === 'html') {
        if (child.props.lang) {
          document.documentElement.lang = child.props.lang;
        }
        return;
      }

      if (child.type === 'meta' || child.type === 'link') {
        const node = document.createElement(child.type);
        applyProps(node, child.props);
        document.head.appendChild(node);
      }
    });
  }, [children]);

  return null;
}

function HelmetProvider({ children }) {
  return children;
}

module.exports = {
  Helmet,
  HelmetProvider,
};
