import cn from "classnames";
import './Input.scss';

interface Props {
  title: string,
  value: string,
  error: string,
  helperText: string,
  id: string,
  handlerOnChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void, 
} 

export const Input: React.FC<Props> = (props) => {
  const {
    title,
    value,
    error,
    helperText,
    id,
    handlerOnChangeValue, 
  } = props;

  return (
    <div className="input-group form--input">  
      <input 
        type="text" 
        id={id} 
        placeholder=" "   
        className={
          cn('input-group__input', 
          {'input-group--error-border': !!error.length}
        )}
        value={value}
        onChange={handlerOnChangeValue}
      />

      <label 
        htmlFor={id} 
        className={
          cn('input-group__label', 
            {'input-group--error-text': !!error.length}
          )}
      >
        {title}
      </label>
    
      <div 
        className={cn(
          "input-group__add-infor", 
          {"input-group--error-text": !!error.length}
        )} 
      >
        {error.length 
          ? error
          : helperText}
      </div>          
    </div>  
  )
}
