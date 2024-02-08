import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Issue } from "@prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSE" } });

  const issues: Issue[] = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

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
        <LatestIssues issues={issues} />
      </Grid>
    </>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BugByte",
  description: "View a summary of project bugs and backlogs",
};
