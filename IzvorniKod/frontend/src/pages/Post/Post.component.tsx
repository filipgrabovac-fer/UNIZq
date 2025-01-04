import SelectedPostHeader from "../../components/SelectedPostHeader/SelectedPostHeader";
import { postRoute } from "../../routes/faculty-subjects.routes";
import { useGetPostDetails } from "./hooks/useGetPostDetails.hook";

export const Post = () => {
  const { postId } = postRoute.useParams();

  const { data, isLoading } = useGetPostDetails({ postId: 1 });

  return (
    <SelectedPostHeader images={[]} postAuthor="" postData="" postName="" />
  );
};
