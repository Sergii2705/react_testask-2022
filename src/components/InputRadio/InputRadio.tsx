import { PositionType } from "../../type/PositionType";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import './InputRadio.scss';

interface Props {
  positions: PositionType[],
  activePosition: number;
  setActivePosition: (activePos: number) => void,
  isLoadingPositions: boolean,
  errorLoadPositions: string,
} 

export const InputRadio: React.FC<Props> = (props) => {
  const {
    positions,
    activePosition,
    setActivePosition,
    isLoadingPositions,
    errorLoadPositions,
  } = props;

  return (
    <div className="form__position">
      <h3 className="form__position-title">Select your position</h3>
      {!!errorLoadPositions.length && 
        <ErrorMessage
          message={'Error loading positions | ' + errorLoadPositions}
        />}
      <div className="form__radio-buttons">
        {!isLoadingPositions &&
          positions.map(({ id, name }) => (
            <label 
              key={id}
              className="radio"
            >
              <input 
                type="radio" 
                name="position" 
                value={name} 
                checked={id === activePosition}
                className="radio__input" 
                onChange={() => setActivePosition(id)}
              />
      
              <span className="radio__button"></span>
                
              {name}
            </label>
          ))
        }
      </div>
    </div>
  )
}
