import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { CardList } from '../CardsList/CardList';
import { UserType } from '../../type/UserType';
import { wait } from '@testing-library/user-event/dist/utils';
import { Loader } from '../Loaders/Loader';
import { Form } from '../Form/Form';
import './Main.scss';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { BASE_URL, USERS_PER_PAGE } from '../../utils/constants';

export const Main = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countPages, setCountPages] = useState<number>(1);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadError, setLoadError] = useState('');
  
  useEffect(() => {
    setLoadError('')
    setIsLoadingUsers(true)
    wait(1000).then(() =>     // wait(delay) used for loading demo
    axios.get(BASE_URL + `users?page=${currentPage}&count=${USERS_PER_PAGE}`)
      .then(response => {
        if (!response.data.success) {
          throw new Error(
            response.data.message
            + response.data.fails 
              ? response.data.fails.join(' | ') 
              : ''
          )
        }

        setUsers(prevUsers => 
          currentPage > 1 
            ? [...prevUsers, ...response.data.users]
            : response.data.users);
        setCountPages(response.data.total_pages)
      }))
      .catch((error) => setLoadError(
        error.response?.data?.message 
          ? error.response.data.message
          : error.toString()
        )
      )
      .finally(() => setIsLoadingUsers(false));

  }, [currentPage, countPages])

  const handlerOnShowMore = () => {
    setCurrentPage(prevCurrentPage => 
      prevCurrentPage < countPages 
        ? prevCurrentPage + 1
        : prevCurrentPage
    );
  }

  const handleBackToFirstPage = useCallback(() => {
    setUsers([]);
    setCountPages(0);
    setCurrentPage(1);
  }, []);

  return (
    <main className="main container">
      <section className="users main__users">
        <h2 className="users__title " id="users">
          Working with GET request
        </h2>
    
        {(currentPage > 1 || !isLoadingUsers) && <CardList users={users} />}

        {isLoadingUsers && 
          <div className="users__loader">
            <Loader />
          </div>
        }

        {!!loadError.length && <ErrorMessage message={loadError}/>}

        <button 
          className="button button--show-more"
          onClick={handlerOnShowMore}
          disabled={countPages === currentPage || isLoadingUsers}
        >
          Show more
        </button>
      </section>

      <section className="sing-up" id="sing-up">
        <h2 className="sing-up__title">
          Working with POST request
        </h2>
  
        <Form handleBackToFirstPage={handleBackToFirstPage}/>
      </section>
    </main>
  )
}