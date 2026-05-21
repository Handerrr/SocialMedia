import { useEffect, useState } from 'react';
import { api } from '../services/api';
import * as S from '../Styles/Feed';
import type { ProfileUser, Post } from '../types';
import LikeButton from '../components/Button';
import Comments from '../components/Comments';
import { Link } from 'react-router-dom';

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [openComments, setOpenComments] = useState<number | null>(null);

  async function loadPosts() {
    const response = await api.get('posts/');
    setPosts(response.data.results);
  }

  async function loadUser() {
    const response = await api.get('profile/');
    setUser(response.data);
  }

  async function createPost() {
    if (!content.trim()) return;

    await api.post('posts/', { content });

    setContent('');
    loadPosts();
  }

  useEffect(() => {
    loadPosts();
    loadUser();
  }, []);

  return (
    <S.Page>
      <S.Container>
        <S.CreatePostBox>
          {user?.profile_pic_url ? (
            <S.ProfileImage src={user.profile_pic_url} />
          ) : (
            <S.Avatar>{user?.username.charAt(0).toUpperCase()}</S.Avatar>
          )}

          <div style={{ width: '100%' }}>
            <S.Input
              placeholder="Digite o que você quiser"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div style={{ textAlign: 'right' }}>
              <S.Button onClick={createPost}>Postar</S.Button>
            </div>
          </div>
        </S.CreatePostBox>

        <S.Divider />

        {posts.map((post) => (
          <div key={post.id}>
            <S.Post>
              {post.author.profile_pic_url ? (
                <S.ProfileImage src={post.author.profile_pic_url} />
              ) : (
                <S.Avatar>
                  {post.author.username.charAt(0).toUpperCase()}
                </S.Avatar>
              )}

              <S.PostContent>
                <Link
                  to={`/users/${post.author.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div>
                    <S.Username>{post.author.username}</S.Username>

                    <S.Handle>@ {post.author.username}</S.Handle>
                  </div>
                </Link>

                <S.Text>{post.content}</S.Text>

                <S.Actions>
                  <LikeButton
                    postId={post.id}
                    initialLikes={post.likes_count}
                  />

                  <S.CommentButton
                    onClick={() =>
                      setOpenComments(openComments === post.id ? null : post.id)
                    }
                  >
                    💬 {post.comments_count}
                  </S.CommentButton>
                </S.Actions>

                {openComments === post.id && (
                  <Comments
                    postId={post.id}
                    postAuthor={post.author.username}
                  />
                )}
              </S.PostContent>
            </S.Post>

            <S.Divider />
          </div>
        ))}
      </S.Container>
    </S.Page>
  );
}

export default Feed;
