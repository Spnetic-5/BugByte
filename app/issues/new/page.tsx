"use client";

import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

<SimpleMDE />;

const NewIssue = () => {
  return (
    <div className='max-w-lg space-y-3'>
        <TextField.Root>
          <TextField.Input placeholder='Title' />
        </TextField.Root>
        <SimpleMDE placeholder='Description' />
        <Button>
          Submit Issue
        </Button>
    </div>
  )
}

export default NewIssue