import { POST_CATEGORIES } from '../config';

type PostCategories = 'CS' | 'Generics' | 'ETC';

export default function PostCategories() {
  return (
    <div>
      {POST_CATEGORIES.map((post) => {
        console.log('post', post);
        return (
          <div className="border-black flex-col	">
            <span
            // href={`posts/${post.toLowerCase()}`}
            >
              {post}
            </span>
          </div>
        );
      })}
    </div>
  );
}
