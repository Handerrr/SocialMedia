import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { User } from '../types';
import * as S from '../Styles/Search';

function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  async function searchUsers(value: string) {
    const response = await api.get(`users/?search=${value}`);

    setUsers(response.data.results);
  }

  useEffect(() => {
    searchUsers('');
  }, []);

  return (
    <>
      <S.Container>
        <S.Input
          placeholder="Pesquisar usuários..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchUsers(e.target.value);
          }}
        />

        <S.UsersList>
          {users.map((user) => (
            <Link
              key={user.id}
              to={`/users/${user.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <S.UserCard>
                {user.profile_pic ? (
                  <S.ProfileImage src={user.profile_pic} />
                ) : (
                  <S.Avatar>{user.username.charAt(0).toUpperCase()}</S.Avatar>
                )}

                <strong>{user.username}</strong>
              </S.UserCard>
            </Link>
          ))}
        </S.UsersList>
      </S.Container>
    </>
  );
}

export default Search;
