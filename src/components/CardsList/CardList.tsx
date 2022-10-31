import { UserType } from '../../type/UserType';
import { Card } from '../Card/Card';
import './CardsList.scss';

interface Props {
  users: UserType[],
}

export const CardList: React.FC<Props> = ({ users }) => (
  <div className="users__cards">
    {users.map(user => (
      <Card key={user.id} user={user}/>
    ))}
  </div>
)
