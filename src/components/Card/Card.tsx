import { useCallback, useState } from "react";
import { UserType } from "../../type/UserType"
import photoCover from '../../img/photo-cover.svg';
import { Loader } from "../Loaders/Loader";
import './Card.scss';

interface Props {
  user: UserType;
}

export const Card:React.FC<Props> = ({ user }) => {
  const {
    name, 
    email, 
    phone, 
    position, 
    photo} = user;

    const [isLoadedPhoto, setIsLoadedPhoto] = useState(false);

    const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.src = photoCover;
    }, []);
  
    const handleLoad = useCallback(() => {
      setIsLoadedPhoto(true);
    }, []);

  return (
    <div className="card">
      <img
        className="card__photo" 
        src={photo} 
        alt="user" 
        onError={handleError}
        onLoad={handleLoad}
      />

      {isLoadedPhoto 
        ? (
          <>
            <h3 className="card__title" title={name}>
              {name}
            </h3>
    
            <div className="card__description">
              <p className="card__position">
                {position}
              </p>

              <p className="card__email" title={email}>
                {email}
              </p>
              
              <p className="card__phone">
                {phone}
              </p>
            </div>
          </>
        )
        : (
          <Loader />
        )}
    </div>
  )
}