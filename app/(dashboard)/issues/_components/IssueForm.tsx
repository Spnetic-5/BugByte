"use client";

import axios from "axios";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Issue } from "@prisma/client";
import { error } from "console";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueFormData = z.infer<typeof issueSchema>;

// interface IssueForm {
//   title: string;
//   description: string;
// }

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmit(true);
      await axios.post("/api/issues", data);
      router.push('/issues/list');
    } catch (error) {
      setSubmit(false);
      setError("An unexpected error occurred !");
    }
  });

  return (
    <div className="max-w-lg">
      {error && (
        <Callout.Root color="red" className="mb-2">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            defaultValue={issue?.title}
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={submit}>
          {issue ? "Update Issue" : "Submit New Issue"} {submit && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
