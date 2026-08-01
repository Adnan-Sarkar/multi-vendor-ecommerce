import { getAdminReviews } from "@/services/adminReviewService";
import { AdminReviewsTable } from "./components/AdminReviewsTable";
import { ReviewStatusTabs } from "./components/ReviewStatusTabs";

interface AdminReviewsPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

const ALLOWED_STATUSES = ["pending", "approved"];

export default async function AdminReviewsPage({
  searchParams,
}: AdminReviewsPageProps) {
  const { page, status } = await searchParams;
  const currentPage = Number(page) || 1;
  const activeStatus =
    status && ALLOWED_STATUSES.includes(status) ? status : "";

  const { data, meta } = await getAdminReviews(currentPage, activeStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="mt-1 text-sm text-gray-500">
          All customer reviews. Approve pending ones to show them on product
          pages.
        </p>
      </div>

      <ReviewStatusTabs activeStatus={activeStatus} />

      <AdminReviewsTable reviews={data} meta={meta} />
    </div>
  );
}
