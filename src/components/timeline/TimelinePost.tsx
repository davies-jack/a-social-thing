import { SinglePost } from "@/types/Post";
import Link from "next/link";
import LikesButton from "@/components/timeline/LikesButton";
import { formatDate } from "@/utils/date";
import Pill from "@/components/atoms/Pill";
import Container from "../atoms/Container";

type Props = {
  post: SinglePost;
  hasLiked: boolean;
  toggleLikePost: () => Promise<void>;
  commentAmount: number;
};

export default function TimelinePost({ post, hasLiked, toggleLikePost, commentAmount }: Props) {
  const formattedDate = formatDate(post.createdAt);
  const { likes, status, user } = post;
  const likeAmount = likes.length;

  const formattedCommentsPrefix = commentAmount === 0 || commentAmount > 1 ? "comments" : "comment";

  const { username } = user;

  return (
    <li className="flex flex-col items-start">
      <Container title={username} titleLevel="h2" spacing={{ marginTop: "4" }}>
        <span className="text-headline-text tracking-normal leading-tight mt-1 mb-2 block break-all whitespace-pre-wrap max-w-full overflow-wrap-anywhere">
          {status}
        </span>
        <ul className="flex flex-row justify-between gap-2 mt-2 w-full">
          <div className="flex flex-row items-center gap-2">
            <LikesButton
              likeAmount={likeAmount}
              toggleLikePost={toggleLikePost}
              hasLiked={hasLiked}
            />
            <Link href={`/post/${post.id}`}>
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

                <div>
                  <span className="text-headline-text font-bold">{commentAmount}</span>{" "}
                  {formattedCommentsPrefix}
                </div>
              </Pill>
            </Link>
          </div>

          <li className="self-center lowercase font-medium text-xs flex flex-row gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#94a1b2"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>

            {formattedDate}
          </li>
        </ul>
      </Container>
    </li>
  );
}
