import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { api } from '../services/api';
import type { ProfileUser, Post } from '../types';
import * as S from '../Styles/Profiles';
import LikeButton from '../components/Button';
import Comments from '../components/Comments';

dayjs.extend(relativeTime);

function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState<ProfileUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [openComments, setOpenComments] = useState<number | null>(null);

  async function toggleFollow() {
    await api.post(`users/${user?.id}/follow/`);

    const response = await api.get(`users/${id}/`);

    setUser(response.data);
  }

  useEffect(() => {
    async function fetchData() {
      const [userResponse, postsResponse] = await Promise.all([
        api.get(`users/${id}/`),
        api.get(`users/${id}/posts/`),
      ]);

      setUser(userResponse.data);

      setPosts(postsResponse.data.results);
    }

    fetchData();
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  return (
    <S.Page>
      <S.Container>
        <S.ProfileHeader>
          {user.profile_pic ? (
            <S.ProfileImage src={user.profile_pic} />
          ) : (
            <S.DefaultAvatar>
              {user.username.charAt(0).toUpperCase()}
            </S.DefaultAvatar>
          )}

          <h1>@{user.username}</h1>

          {user.bio && <p>{user.bio}</p>}

          <S.Stats>
            <div>
              <strong>{user.posts_count}</strong> posts
            </div>

            <button onClick={() => setShowFollowers(!showFollowers)}>
              <strong>{user.followers_count}</strong> seguidores
            </button>

            <button onClick={() => setShowFollowing(!showFollowing)}>
              <strong>{user.following_count}</strong> seguindo
            </button>
          </S.Stats>

          <S.EditButton onClick={toggleFollow}>
            {user.is_following ? 'Seguindo' : 'Seguir'}
          </S.EditButton>
        </S.ProfileHeader>

        {showFollowers && (
          <S.ListBox>
            <h3>Seguidores</h3>

            {user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <S.UserRow key={follower.id}>
                  <span>@{follower.username}</span>
                </S.UserRow>
              ))
            ) : (
              <p>Nenhum seguidor ainda.</p>
            )}
          </S.ListBox>
        )}

        {showFollowing && (
          <S.ListBox>
            <h3>Seguindo</h3>

            {user.following.length > 0 ? (
              user.following.map((following) => (
                <S.UserRow key={following.id}>
                  <span>@{following.username}</span>
                </S.UserRow>
              ))
            ) : (
              <p>Não segue ninguém ainda.</p>
            )}
          </S.ListBox>
        )}

        <S.ListBox>
          <h3>Posts</h3>

          {posts.length === 0 && <p>Esse usuário ainda não postou.</p>}

          {posts.map((post) => (
            <S.PostCard key={post.id}>
              <S.PostHeader>
                {post.author.profile_pic ? (
                  <S.PostAvatar src={post.author.profile_pic} />
                ) : (
                  <S.SmallAvatar>
                    {post.author.username.charAt(0).toUpperCase()}
                  </S.SmallAvatar>
                )}

                <div>
                  <strong>{post.author.username}</strong>

                  <S.PostDate>{dayjs(post.created_at).fromNow()}</S.PostDate>
                </div>
              </S.PostHeader>

              <S.PostText>{post.content}</S.PostText>

              <S.PostActions>
                <LikeButton postId={post.id} initialLikes={post.likes_count} />

                <S.CommentButton
                  onClick={() =>
                    setOpenComments(openComments === post.id ? null : post.id)
                  }
                >
                  💬 {post.comments_count}
                </S.CommentButton>
              </S.PostActions>

              {openComments === post.id && (
                <Comments postId={post.id} postAuthor={post.author.username} />
              )}
            </S.PostCard>
          ))}
        </S.ListBox>
      </S.Container>
    </S.Page>
  );
}

export default UserProfile;
