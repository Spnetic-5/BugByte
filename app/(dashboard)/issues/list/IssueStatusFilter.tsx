"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSE" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const query = createQuery(status, searchParams);
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content position="popper">
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const createQuery = (status: string, searchParams: ReadonlyURLSearchParams) => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (searchParams.get("orderBy")) {
    params.append("orderBy", searchParams.get("orderBy")!);
    params.append("sortOrder", searchParams.get("sortOrder")!);
  } else {
    // If orderBy parameter is not present, set default ordering by updatedAt in descending order
    params.append("orderBy", "updatedAt");
    params.append("sortOrder", "desc");
  }

  return params.toString().length ? "?" + params.toString() : "";
};

export default IssueStatusFilter;
