import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <FaExclamationTriangle className='text-danger' size='5em' />
      <h1>Ошибка 404</h1>
      <Link to='/' className='btn btn-primary'>
        На Главную
      </Link>
    </div>
  );
}