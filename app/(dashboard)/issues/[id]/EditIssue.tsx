import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link
        href={`/issues/edit/${issueId}`}
        className="flex items-center gap-1"
      > 
        <Pencil2Icon className="mr-2"/>
        <Text>Edit Bug</Text>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
