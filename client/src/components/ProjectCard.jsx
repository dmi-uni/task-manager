export default function ProjectCard({ project }) {
    return (
      <div className='col-md-6'>
        <div className='card mb-3'>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center'>
              <h5 className='card-title'>{project.name}</h5>
  
              <a className='btn btn-light' href={`/projects/${project.id}`}>
                Посмотреть
              </a>
            </div>
            <p className='small'>
              Статус: <strong className={(project.status === 'Завершен' ? 'complete' : '')}>{project.status}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }