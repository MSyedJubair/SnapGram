import PostForm from "@/components/Forms/PostForm"

const CreatePost = () => {
  return (
    <div className="flex flex-1 overflow-y-auto">
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14">
        <div className="ml-10 max-w-5xl flex flex-row items-center gap-3 justify-start w-full">
          <img src="./assets/icons/add-post.svg" alt="Post" width={36} height={36}/>
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] md:font-bold md:leading-[140%] md:tracking-tighter text-left w-full">Create Post</h2>
        </div>

        <PostForm action="Create"/>
      </div>
    </div>
  )
}

export default CreatePost