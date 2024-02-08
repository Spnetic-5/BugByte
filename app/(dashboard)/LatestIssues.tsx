import React from "react";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import { Issue } from "@prisma/client";

interface Props {
  issues: Issue[];
}

const LatentIssues = ({ issues }: Props) => {
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex justify="between">
                <Flex direction="column" align="start" gap="2">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <IssueStatusBadge status={issue.status} />
                </Flex>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Root>
    </Card>
  );
};

export default LatentIssues;
