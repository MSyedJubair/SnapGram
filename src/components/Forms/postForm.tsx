import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useUpdatePost, useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useUserContext } from "@/context/AuthContext";
import { postValidation } from "@/lib/Validation";
import FileUploader from "../Shared/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import type { Models } from "appwrite";
import { toast } from "sonner";

export interface Post extends Models.Document {
  Caption: string;
  location?: string;
  Tags?: string[];
  imageURL?: URL;
  userId: string;
}

type Props = {
  post?:Post,
  action:  "Create" | "Update"
};

const PostForm = ({ post, action }: Props) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutateAsync: createPost, isPending: isPostCreating } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdatingPost } = useUpdatePost()

  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: post ? post?.Caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.Tags?.join(",") : "",
    },
  });

  async function onSubmit(data: z.infer<typeof postValidation>) {
    // Create new post
    if (action === 'Create'){
      const newPost = await createPost({ ...data, userId: user.id });

      if (!newPost) {
      toast("Something Went wrong.....");
    }
    } else {
      // Update Post
      const updatedPost = await updatePost({
        postId: post?.$id || '',
        post: {
          ...data,
          userId: user.id
        }
      })
      if (!updatedPost) {
        toast("Something Went wrong.....");
      }
    }

    navigate("/");
  }

  return (  
    <Card className="w-full max-w-5xl h-auto flex flex-col gap-9 bg-transparent">
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="caption"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Caption</FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Write your post's caption here...."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="file"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Add Photo
                  </FieldLabel>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageURL}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Add Location
                  </FieldLabel>
                  <Input {...field} type="text" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Add Tags
                  </FieldLabel>
                  <Input {...field} type="text" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Cancle
          </Button>
          <Button type="submit" form="form-rhf-demo" disabled={isPostCreating || isUpdatingPost}>
            {action === 'Create' ? 'Submit' : 'Update' }
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default PostForm;
