"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSE" },
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const changeStatus = (status: Status) => {
    axios
      .patch("/api/issues/" + issue.id, { status })
      .then(() => {
        router.refresh();
        toast.success("Status updated successfully!");
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };

  return (
    <>
      <Select.Root value={issue.status} onValueChange={changeStatus} size="2">
        <Select.Trigger placeholder="Update Status" color="purple" variant="soft" />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Update Status</Select.Label>
            {statuses?.map((status) => (
              <Select.Item key={status.label} value={status.value!}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
