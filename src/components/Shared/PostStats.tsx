import { useDeleteSavePost, useGetSaves, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";

type INewPost = {
  $id: string;
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
  userLikes?: string[];
};

type PostProps = {
  post: INewPost;
  userId: string;
};

const PostStats = ({post, userId}:PostProps) => {
  const likesList = post?.userLikes || [] 

  const {mutateAsync: DeleteSavedPost} = useDeleteSavePost()
  const {mutateAsync: likePost} = useLikePost()
  const {mutateAsync: savePost} = useSavePost()
  const {data: saves} = useGetSaves()

  const [isLiked, setisLiked] = useState<boolean>(likesList.includes(userId))
  const savedDoc = saves?.find(
    (save) => save.post === post.$id
  )

  const isSaved = !!savedDoc

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();    

    let likesArray = [...likesList]

    if(isLiked) {
        likesArray = likesArray.filter((id) => (id !== userId))
        setisLiked(false)
    } else {
        likesArray.push(userId)
        setisLiked(true)
    }

    likePost({ postId: post.$id, likesArray });
  }

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    if (isSaved){
      DeleteSavedPost(savedDoc.$id)
    } else{
      savePost({postId: post.$id, userId: userId})
    }
  }

  return (
    <div className="flex justify-between items-center px-5 py-4 border-t border-dark-4">
      
      {/* Left Side - Like */}
      <button
        onClick={handleLike}
        className="flex items-center gap-2 group transition"
      >
        <div className="p-2 rounded-full bg-dark-3 group-hover:bg-primary-500/20 transition">
          <img
            src={
                isLiked ? 
                './assets/icons/liked.svg' :
                './assets/icons/like.svg'
            }
            alt="like"
            className="w-5 h-5"
          />
        </div>

        <span
          className={`text-sm ${
             "text-primary-500" 
          }`}
        >
          {likesList.length}
        </span>
      </button>

      {/* Right Side - Save */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 group transition"
      >
        <div className="p-2 rounded-full bg-dark-3 group-hover:bg-primary-500/20 transition">
          <img
            src={
               isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
            }
            alt="save"
            className="w-5 h-5"
          />
        </div>
      </button>
    </div>
  );
};

export default PostStats;
