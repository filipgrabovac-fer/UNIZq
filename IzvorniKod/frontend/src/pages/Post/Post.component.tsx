import SelectedPostHeader from "../../components/SelectedPostHeader/SelectedPostHeader";
import { AnswerComponent } from "../../components/AnswerComponent/AnswerComponent";
import { AddAnswerComponent } from "../../components/SearchComponent/AddAnswerComponent";
import { useGetPostDetails } from "./hooks/useGetPostDetails.hook";
import { postRoute } from "../../routes/faculty-subjects.routes";

export const Post = () => {
  const { postId } = postRoute.useParams();

  const { data: postData } = useGetPostDetails({ postId: Number(postId) });

  return (
    <div className="flex flex-col h-full">
      <div className="h-max">
        <SelectedPostHeader
          images={postData?.images ?? []}
          postAuthor={postData?.author ?? ""}
          postData={postData?.postContent ?? ""}
          postName={postData?.postHeader ?? ""}
        />
      </div>

      <div className="h-full overflow-y-auto">
        {postData?.answerDetails?.map((answer, i) => (
          <AnswerComponent
            pictures={answer.answerImages}
            answerText={answer.content}
            answerAuthor={answer.author}
            key={i}
            upvoted={answer.upvoted}
            downvoted={answer.downvoted}
          />
        ))}
      </div>
      <div className="sticky bottom-0 my-2 bg-white">
        <AddAnswerComponent
          postContent={postData?.postHeader ?? "" + postData?.postContent ?? ""}
        />
      </div>
    </div>
  );
};
