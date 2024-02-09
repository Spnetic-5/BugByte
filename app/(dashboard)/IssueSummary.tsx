import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: string;
    status: Status;
  }[] = [
    { label: "Open Bugs", value: open.toString() + " 🙂", status: "OPEN" },
    {
      label: "In-progress Bugs",
      value: inProgress.toString() + " 😄",
      status: "IN_PROGRESS",
    },
    { label: "Closed Bugs", value: closed.toString() + " 😎", status: "CLOSE" },
  ];

  return (
    <Flex gap="3">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
