import Container from "@/components/atoms/Container";
import Pill from "@/components/atoms/Pill";
import { SinglePost } from "@/types/Post";
import { formatDate } from "@/utils/date";

type Props = {
  post: SinglePost;
  toggleLikePost: () => void;
};

export default function TimelinePost({ post, toggleLikePost }: Props) {
  const { createdAt, status, user } = post;
  const { username } = user;
  const formattedDate = formatDate(createdAt);

  return (
    <Container title={`@ ${username}`} titleLevel="h2">
      <p className="content">{status}</p>

      <div
        className="
        flex flex-row justify-between items-center
        gap-4
        mt-4
        text-xs tracking-normal leading-tight
      "
      >
        <div className="flex flex-row gap-2 items-center">
          <Pill className="flex flex-row gap-2 items-center" onClick={toggleLikePost}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill={post.hasLiked ? "red" : "white"}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{post.likes.length} likes</span>
          </Pill>
          <Pill className="flex flex-row gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
            </svg>
            <span>{post.commentAmount} comments</span>
          </Pill>
        </div>

        <span className="text-paragraph-text">posted {formattedDate}</span>
      </div>
    </Container>
  );
}
