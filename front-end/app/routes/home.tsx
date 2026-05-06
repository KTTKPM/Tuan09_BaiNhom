import { AlertCircle, Loader2 } from "lucide-react"

import { TourCard } from "~/components/tour-card"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "~/components/ui/empty"
import { useTour } from "~/hooks/use-tour"

export default function HomePage() {
  const { tours, isLoading, error } = useTour()

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-background p-4 md:p-8">
        <div className="mx-auto max-w-6xl flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-dvh bg-background p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Lỗi tải dữ liệu</AlertTitle>
            <AlertDescription>
              Không thể tải danh sách tour. Vui lòng thử lại sau.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (!tours || tours.length === 0) {
    return (
      <div className="min-h-dvh bg-background p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <AlertCircle />
              </EmptyMedia>
              <EmptyTitle>Không có tour nào</EmptyTitle>
              <EmptyDescription>
                Hiện tại chưa có tour du lịch nào. Vui lòng quay lại sau.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Tour du lịch
          </h1>
          <p className="mt-1 text-muted-foreground">
            Khám phá các tour du lịch hấp dẫn nhất
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  )
}
