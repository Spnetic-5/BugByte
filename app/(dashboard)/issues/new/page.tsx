import dynamic from "next/dynamic"
import IssueFormSkeleton from "@/app/(dashboard)/issues/_components/IssueFormSkeleton"

const IssueForm = dynamic(
  () => import('@/app/(dashboard)/issues/_components/IssueForm'), 
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage