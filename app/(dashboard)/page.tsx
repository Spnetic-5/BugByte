import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
// import LatestActivity from "./LatestActivity"
// import { CommentWithIssueAndUser } from "../types"

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSE" } });

  // const comments: CommentWithIssueAndUser[] = await prisma.comment.findMany({
  //   include: {
  //     user: true,
  //     issue: true,
  //   },
  //   take: 5,
  //   orderBy: {
  //     createdAt: 'desc',
  //   }
  // })

  const statusCounts = {
    open,
    inProgress,
    closed,
  };

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary {...statusCounts} />
          <IssueChart {...statusCounts} />
        </Flex>
        <LatestIssues />
      </Grid>
      {/* <Box mt="5">
        <LatestActivity comments={comments} />
      </Box> */}
    </>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BugByte",
  description: "View a summary of project bugs and backlogs",
};
