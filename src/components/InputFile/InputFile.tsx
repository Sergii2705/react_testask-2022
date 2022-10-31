import cn from "classnames";
import './InputFile.scss';

interface Props {
  fileOfPhoto: File | null,
  errorFile: string,
  helperText: string,
  handleInputFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void, 
} 

export const InputFile: React.FC<Props> = (props) => {
  const {
    fileOfPhoto,
    errorFile,
    helperText,
    handleInputFileChange, 
  } = props;

  return (
    <div className="input__wrapper">
      <input 
        name="file" 
        type="file" 
        id="input__file" 
        className="input input__file" 
        onChange={handleInputFileChange}
        accept="image/jpeg"
      />

      <label className="input__file-wrapper" htmlFor="input__file">
        <div 
          className={
            cn('input__file-button', 
              {'input-group--error-border': !!errorFile.length}
            )}
        >
          Upload
        </div>
      
        <div 
          className={
            cn('input__file-button-text', 
              {'input-group--error-border': !!errorFile.length}
            )}
        >
          <span 
            className={
              cn('input__file-text', 
                {'input__file-text--isfile': !!fileOfPhoto}
              )}
          >
            {fileOfPhoto
              ? fileOfPhoto.name
              : 'Upload your photo'
            }
          </span>
        </div>
      </label>
  
      <div 
        className={cn(
          "input-group__add-infor", 
          {"input-group--error-text": !!errorFile.length}
        )} 
      >
        {errorFile.length 
          ? errorFile
          : helperText}
      </div>
    </div>
  )
}