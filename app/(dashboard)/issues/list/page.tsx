import React from "react";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import Pagination from "@/app/components/Pagination";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 7;

  const assignedToUserId =
    searchParams.userId !== "ALL" ? searchParams.userId : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sortOrder }
    : undefined;

  // const users = await axios.get('https://randomuser.me/api/?results=10').then(
  //   (res) => console.log(res)
  // )

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3" className="max-w-screen-lg">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bug Tracker - Bug List",
  description: "View all project bugs",
};

export default IssuesPage;
