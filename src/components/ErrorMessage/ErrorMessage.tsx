import './ErrorMessage.scss';

interface Props {
  message: string
}

export const ErrorMessage:React.FC<Props> = ({ message}) => {
  return (
    <div  className="error">
      <span className="error__exclamation">🛈</span>
        Error:
      <span className='error__description'>
        {message}
      </span>
    </div>
  )
}