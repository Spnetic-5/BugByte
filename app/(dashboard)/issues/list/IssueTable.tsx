import React from "react";
import { Table } from "@radix-ui/themes";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import Link from "next/link";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

type SortOrder = "desc" | "asc";

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Updated",
    value: "updatedAt",
    className: "hidden md:table-cell",
  },
];

const SortIcon = ({ sortOrder }: { sortOrder: SortOrder }) => {
  if (sortOrder === "asc") return <ArrowUpIcon className="inline ml-2" />;
  else if (sortOrder === "desc")
    return <ArrowDownIcon className="inline ml-2" />;

  return null;
};

const IssueTable = async ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value.toString(),
                    sortOrder:
                      searchParams.orderBy === column.value
                        ? searchParams.sortOrder === "asc"
                          ? "desc"
                          : searchParams.sortOrder === "desc"
                          ? undefined
                          : "asc"
                        : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <SortIcon sortOrder={searchParams.sortOrder} />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>{" "}
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.updatedAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export interface IssueQuery {
  userId?: string;
  status: Status;
  orderBy: keyof Issue;
  sortOrder: SortOrder;
  page: string;
}

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
