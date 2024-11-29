import { SinglePost } from "@/types/Post";
import Link from "next/link";
import LikesButton from "@/components/timeline/LikesButton";
import { formatDate } from "@/utils/date";

type Props = {
  post: SinglePost;
  hasLiked: boolean;
  toggleLikePost: () => Promise<void>;
};

export default function TimelinePost({
  post,
  hasLiked,
  toggleLikePost,
}: Props) {
  const formattedDate = formatDate(post.createdAt);
  const { likes, status, user } = post;
  const likeAmount = likes.length;

  const { username } = user;

  return (
    <li className="flex flex-col items-start my-4 p-4 bg-bg-secondary transition-colors duration-200 text-sm rounded-md">
      <span className="username text-headline-text flex flex-row items-center gap-2">
        <span className="text-paragraph-text">@</span>
        <Link href={`/profile/${username}`}>
          <span className="text-headline-text font-bold">{username}</span>
        </Link>
      </span>
      <span className="text-headline-text tracking-normal leading-tight mt-1 mb-2 block break-all whitespace-pre-wrap max-w-full overflow-wrap-anywhere">
        {status}
      </span>
      <span className="timestamp text-xs text-paragraph-text font-medium">
        {formattedDate}
      </span>

      <ul className="flex flex-row items-center gap-2 mt-2">
        <LikesButton
          likeAmount={likeAmount}
          toggleLikePost={toggleLikePost}
          hasLiked={hasLiked}
        />
        <li className="hover:text-headline-text cursor-pointer">
          comment <span className="text-headline-text font-bold">22K</span>
        </li>
        <li className="hover:text-headline-text cursor-pointer">
          share <span className="text-headline-text font-bold">44</span>
        </li>
      </ul>
    </li>
  );
}
