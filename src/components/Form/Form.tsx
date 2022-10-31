import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';
import { PositionType } from '../../type/PositionType';
import { isValidName, isValidEmail, isValidPhone } from '../../utils/inputschecker';
import { Modal } from '../Modal/Modal';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './Form.scss';
import successImage from '../../img/success-image.svg';
import closeIcon from '../../img/close-icon.svg';
import { Input } from '../Input/Input';
import { InputFile } from '../InputFile/InputFile';
import { InputRadio } from '../InputRadio/InputRadio';
import { BASE_URL, MAX_FILE_SIZE } from '../../utils/constants';

interface Props {
  handleBackToFirstPage: () => void,
}

export const Form: React.FC<Props> = ({ handleBackToFirstPage }) => {
  const [positions, setPositions] = useState<PositionType[]>([]); 
  const [isLoadingPositions, setIsLoadingPositions] = useState(true)
  const [activePosition, setActivePosition] = useState(1);
  const [fileOfPhoto, setFileOfPhoto] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorFile, setErrorFile] = useState('');
  const [activeModal, setActiveModal] = useState(false);
  const [submitError, setSubmitError] = useState('') 
  const [errorLoadPositions, setErrorLoadPositions] = useState('')
  const dataRef = useRef();
  
  useEffect(() => {
    setErrorLoadPositions('')
    setIsLoadingPositions(true);
    
    axios.get(BASE_URL + 'positions')
      .then(response => {
        if (!response.data.success) {
          throw new Error(
            response.data.message
            + response.data.fails 
              ? response.data.fails.join(' | ') 
              : ''
          )
        }

        setPositions(response.data.positions)
        setActivePosition(response.data.positions[0].id)
        dataRef.current = response.data.positions[0].id;
      })
      .catch((error) => setErrorLoadPositions(
        error.response?.data?.message 
          ? error.response.data.message
          : error.toString()
        )
        )
      .finally(() => setIsLoadingPositions(false));
  }, [])
  
  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!isValidName(name)) {
      setErrorName('Username should contain 2-60 characters');

      return;
    }
    
    if (!isValidEmail(email)) {
      setErrorEmail('User email, must be a valid email according to RFC2822');
      
      return;    
    }

    if (!isValidPhone(phone)) {
      setErrorPhone('The phone number must be in the format: +380 XX XXXX XX XX');
      
      return;    
    }
    if (!fileOfPhoto) {
      setErrorFile('Select file');
      
      return;    
    } else if (fileOfPhoto.size > MAX_FILE_SIZE) {
      setErrorFile('The photo size must not be greater than 5 Mb');

      return;    
    } 
        
    const formData = new FormData();
    
    setSubmitError('')
    setIsSubmitting(true);

    formData.append('name', name); 
    formData.append('email', email); 
    formData.append('phone', phone); 
    formData.append('position_id', `${activePosition}`); 
    formData.append('photo', fileOfPhoto);

    axios.get(BASE_URL + 'token')
      .then(response => {
        if (!response.data.success) {
          throw new Error('error getting token');
        }
        return axios.post(
          BASE_URL + 'users', 
          formData, 
          { headers: {'Token': response.data.token }}
        )
      })
        .then(response => {
          setName('');
          setEmail('');
          setPhone('');
          setActivePosition(
            dataRef.current 
              ? dataRef.current
              : 1
          );
          setFileOfPhoto(null);
          handleBackToFirstPage();
          setActiveModal(true);
        }) 
        .catch(error => setSubmitError(
          error.response?.data?.message 
          ? error.response.data.message
          : error.toString()
          )
        )
        .finally(() => setIsSubmitting(false))
  }

  const handlerOnChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    setErrorName('');
    setSubmitError('');
  }, []);

  const handlerOnChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setErrorEmail('');
    setSubmitError('');
  }, []);
  
  const handlerOnChangePhone = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
    setErrorPhone('');
    setSubmitError('');
  }, []);

  const handleInputFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setErrorFile('');
      setSubmitError('');
      setFileOfPhoto(event.target.files[0]);
    }  
  }, []);

  return (
    <>
      {!!submitError.length && <ErrorMessage message={submitError} />}

      <form 
        action="" 
        className='form'
        onSubmit={handleOnSubmit}
      >

        <Input
          title={'Your name'}
          value={name}
          error={errorName}
          helperText={'Helper text'}
          id={'name'} 
          handlerOnChangeValue={handlerOnChangeName}
        />

        <Input
          title={'Email'}
          value={email}
          error={errorEmail}
          helperText={'Helper text'}
          id={'email'} 
          handlerOnChangeValue={handlerOnChangeEmail}
        />

        <Input
          title={'Phone'}
          value={phone}
          error={errorPhone}
          helperText={'Helper text'}
          id={'Phone'} 
          handlerOnChangeValue={handlerOnChangePhone}
        />
  
        <InputFile 
          fileOfPhoto={fileOfPhoto}
          errorFile={errorFile}
          helperText={'Helper text'}
          handleInputFileChange={handleInputFileChange}
        /> 
      
        <InputRadio
          positions={positions}
          activePosition={activePosition}
          setActivePosition={setActivePosition}
          isLoadingPositions={isLoadingPositions}
          errorLoadPositions={errorLoadPositions}
        />
  
        <button 
          className="button form__button" 
          disabled={isSubmitting 
            || !!(errorName + errorEmail + errorPhone + errorFile + errorLoadPositions)
          }
          >
          Sign up
        </button>
    </form>
  
    <Modal active={activeModal}>
      <a 
        href="#users" 
        className="close-btn"
        onClick={() => setActiveModal(false)}
      >
        <img className="close-btn__img" src={closeIcon} alt="close-btn" />
      </a>
      
      <h3 className="success-text">
        User successfully registered
      </h3>
      
      <img className="success-img" src={successImage} alt="success" />
    </Modal>
  </>
  )
}
