import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <>
      <p>Page not found.</p>
      <Link to={'/'}>Go back home</Link>
    </>
  );
}

export default NotFoundPage;
