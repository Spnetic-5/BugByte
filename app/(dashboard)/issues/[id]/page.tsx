import { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid, Text, Strong } from "@radix-ui/themes";
import IssueDetails from "./IssueDetails";
import StatusSelect from "./StatusSelect";
import EditIssueButton from "./EditIssue";
import DeleteIssueButton from "./DeleteIssue";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof parseInt(params.id) !== "number") notFound();
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();

  return (
    <div>
      <Grid rows={{ initial: "1" }} gap="5" display="grid">
        {/* {session && ( */}
        <Box width="max-content">
          <Flex direction="row" gap="2">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
            <StatusSelect issue={issue} />
          </Flex>
        </Box>
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        {/* )} */}
      </Grid>
    </div>
  );
};

export default IssueDetailPage;
