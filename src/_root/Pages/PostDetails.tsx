import PostDetailsCard from "@/components/Shared/PostDetailCard"
import { Spinner } from "@/components/ui/spinner"
import { useGetPost } from "@/lib/react-query/queriesAndMutations"
import type { IPost } from "@/types"
import { useParams } from "react-router-dom"

const PostDetails = () => {
  const { id } = useParams()
  const { data: post, isLoading } = useGetPost(id!)
  
  if (isLoading){
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
        <Spinner/>
        <p className="text-gray-400">Loading Post...</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full items-center">
      <PostDetailsCard post={post as unknown as IPost}/>
    </div>
  )
}

export default PostDetails