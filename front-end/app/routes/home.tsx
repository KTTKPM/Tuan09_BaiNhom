import { useState } from "react"
import { AlertCircle } from "lucide-react"

import { TourCard } from "~/components/tour-card"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "~/components/ui/empty"
import { tours } from "~/data/tours"
import type { Tour } from "~/types/tour"

export function isValidTour(tour: unknown): tour is Tour {
  return (
    typeof tour === "object" &&
    tour !== null &&
    "id" in tour &&
    "name" in tour &&
    "destination" in tour &&
    "duration" in tour &&
    "price" in tour &&
    "slots" in tour &&
    "description" in tour &&
    "image" in tour &&
    "available" in tour &&
    typeof (tour as Tour).id === "number" &&
    typeof (tour as Tour).name === "string" &&
    (tour as Tour).name.length > 0 &&
    typeof (tour as Tour).destination === "string" &&
    (tour as Tour).destination.length > 0 &&
    typeof (tour as Tour).duration === "string" &&
    (tour as Tour).duration.length > 0 &&
    typeof (tour as Tour).price === "number" &&
    (tour as Tour).price >= 0 &&
    typeof (tour as Tour).slots === "number" &&
    (tour as Tour).slots >= 0 &&
    typeof (tour as Tour).description === "string" &&
    (tour as Tour).description.length > 0 &&
    typeof (tour as Tour).image === "string" &&
    (tour as Tour).image.length > 0 &&
    typeof (tour as Tour).available === "boolean"
  )
}



export default function HomePage() {
  const [tourData] = useState<unknown[]>(tours)

  const validTours = tourData.filter(isValidTour)
  const invalidCount = tourData.length - validTours.length

  if (tourData.length === 0) {
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

        {invalidCount > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="size-4" />
            <AlertTitle>Dữ liệu không hợp lệ</AlertTitle>
            <AlertDescription>
              Có {invalidCount} tour có dữ liệu không hợp lệ và đã bị bỏ qua.
            </AlertDescription>
          </Alert>
        )}

        {validTours.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <AlertCircle />
              </EmptyMedia>
              <EmptyTitle>Không có tour hợp lệ</EmptyTitle>
              <EmptyDescription>
                Tất cả dữ liệu tour đều không hợp lệ. Vui lòng kiểm tra lại.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {validTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
