import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router"
import { MapPin, Clock, Users, ArrowLeft, AlertCircle, ImageOff, Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "~/components/ui/empty"
import { useTour } from "~/hooks/use-tour"

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)
}

export default function TourDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const tourId = id ? Number(id) : undefined
  const { tour, isLoading, error, bookTour } = useTour(tourId)

  const handleBook = async () => {
    if (!tour || !tourId) return
    await bookTour.mutateAsync({
      tourId,
      userId: 1,
      quantity: 1,
      totalPrice: tour.price,
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  if (!id || isNaN(Number(id))) {
    return (
      <div className="min-h-dvh bg-background p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>ID tour không hợp lệ</AlertTitle>
            <AlertDescription>
              ID tour phải là một số. Vui lòng quay lại trang chủ.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 size-4" />
                Quay lại
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-background p-4 md:p-8 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !tour) {
    return (
      <div className="min-h-dvh bg-background p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <AlertCircle />
              </EmptyMedia>
              <EmptyTitle>Không tìm thấy tour</EmptyTitle>
              <EmptyDescription>
                Tour với ID {tourId} không tồn tại hoặc có lỗi xảy ra.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          <div className="mt-4 flex justify-center">
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 size-4" />
                Quay lại danh sách tour
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Button variant="link" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 size-4" />
              Quay lại
            </Link>
          </Button>
        </div>

        {showSuccess && (
          <Alert className="mb-6 border-green-500 text-green-700 dark:text-green-400">
            <CheckCircle2 className="size-4" />
            <AlertTitle>Đặt tour thành công!</AlertTitle>
            <AlertDescription>
              Tour của bạn đã được đặt. Chúng tôi sẽ liên hệ bạn sớm.
            </AlertDescription>
          </Alert>
        )}

        <Card className="py-0">
          <div className="relative aspect-video w-full bg-muted">
            {!imageError && (
              <img
                src={`/images/${tour.image}`}
                alt={tour.name}
                className={`h-full w-full object-cover transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.hidden = true
                  setImageError(true)
                }}
              />
            )}
            {imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageOff className="size-12" />
                <span className="text-sm">{tour.destination}</span>
              </div>
            )}
            {!tour.available && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                Hết chỗ
              </Badge>
            )}
          </div>

          <CardHeader>
            <CardTitle className="text-2xl">{tour.name}</CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {tour.destination}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {tour.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-4" />
                {tour.slots} chỗ còn lại
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-base font-medium mb-2">
                  Mô tả
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {tour.description}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Giá tour</span>
                  <span className="text-2xl font-semibold text-foreground">
                    {formatPrice(tour.price)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link to="/">Quay lại</Link>
            </Button>
            <Button
              disabled={!tour.available || bookTour.isPending}
              onClick={handleBook}
            >
              {bookTour.isPending ? (
                <>
                  <Loader2 className="mr-2 size-3.5 animate-spin" />
                  Đang xử lý...
                </>
              ) : tour.available ? (
                "Đặt tour ngay"
              ) : (
                "Tour đã hết chỗ"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
