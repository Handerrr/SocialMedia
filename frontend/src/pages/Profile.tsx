import { useEffect, useState } from 'react';
import { api } from '../services/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from '../components/Button';
import Comments from '../components/Comments';
import type { ProfileUser, Post } from '../types';
import * as S from '../Styles/Profiles';

import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);

function Profile() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await api.get('profile/');
      setUser(res.data);

      const postsRes = await api.get(`users/${res.data.id}/posts/`);

      setPosts(postsRes.data.results);
    }

    load();
  }, []);

  async function deletePost(postId: number) {
    const confirmDelete = window.confirm('Deseja excluir esse post?');

    if (!confirmDelete) return;

    await api.delete(`posts/${postId}/delete/`);

    setPosts((prev) => prev.filter((post) => post.id !== postId));
  }

  if (!user) return <p>Carregando ...</p>;

  return (
    <>
      <S.Container>
        <S.ProfileHeader>
          {user.profile_pic_url ? (
            <S.ProfileImage src={user.profile_pic_url} />
          ) : (
            <S.DefaultAvatar>
              {user.username.charAt(0).toUpperCase()}
            </S.DefaultAvatar>
          )}
          <h1>{user.username}</h1>
          <span>@{user.username}</span>
          {user.bio && <p>{user.bio}</p>}
          <S.Stats>
            <button onClick={() => setShowFollowers(!showFollowers)}>
              <strong>{user.followers_count}</strong> followers
            </button>

            <button onClick={() => setShowFollowing(!showFollowing)}>
              <strong>{user.following_count}</strong> following
            </button>

            <div>
              <strong>{user.posts_count}</strong> posts
            </div>
          </S.Stats>

          <S.EditButton onClick={() => navigate('/profile/edit')}>
            Edit profile
          </S.EditButton>
        </S.ProfileHeader>

        {showFollowers && (
          <S.ListBox>
            <h3>Followers</h3>

            {user.followers.map((f) => (
              <p key={f.id}>@{f.username}</p>
            ))}
          </S.ListBox>
        )}

        {showFollowing && (
          <S.ListBox>
            <h3>Following</h3>

            {user.following.map((f) => (
              <p key={f.id}>@{f.username}</p>
            ))}
          </S.ListBox>
        )}
        <S.ListBox>
          <h3>Posts</h3>

          {posts.length === 0 ? (
            <p>Você ainda não publicou nada.</p>
          ) : (
            posts.map((post) => (
              <S.PostCard key={post.id}>
                <S.PostHeader>
                  {post.author.profile_pic_url ? (
                    <S.PostAvatar src={post.author.profile_pic_url} />
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
                  <Button postId={post.id} initialLikes={post.likes_count} />

                  <S.CommentButton
                    onClick={() =>
                      setOpenComments(openComments === post.id ? null : post.id)
                    }
                  >
                    💬 {post.comments_count}
                  </S.CommentButton>

                  <S.DeleteButton onClick={() => deletePost(post.id)}>
                    🗑 Excluir
                  </S.DeleteButton>
                </S.PostActions>

                {openComments === post.id && (
                  <Comments
                    postId={post.id}
                    postAuthor={post.author.username}
                  />
                )}
              </S.PostCard>
            ))
          )}
        </S.ListBox>
      </S.Container>
    </>
  );
}

export default Profile;
