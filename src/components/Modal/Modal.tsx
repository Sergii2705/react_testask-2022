import cn from 'classnames';
import './Modal.scss';

interface Props {
  active: boolean,
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ active, children }) => {
  return (
    <div 
      className={cn('modal', {active})} 
    >
      <div 
        className={cn('modal__content', {active})}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}