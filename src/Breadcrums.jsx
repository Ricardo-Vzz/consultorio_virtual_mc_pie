import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
  return (
    <nav aria-label="breadcrumb">
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        {paths.map((path, index) => (
          <li key={index} style={{ marginRight: '8px' }}>
            {index < paths.length - 1 ? (
              <Link to={path.href} style={{ textDecoration: 'none', color: 'blue' }}>
                {path.label}
              </Link>
            ) : (
              <span style={{ fontWeight: 'bold' }}>{path.label}</span>
            )}
            {index < paths.length - 1 && ' / '}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;