import { useState } from "react"
import { Link } from "react-router"
import { MapPin, Clock, Users, ImageOff } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import type { Tour } from "~/types/tour"
import { formatPrice } from "~/routes/tour-detail"

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="flex flex-col overflow-hidden py-0">
      <div className="relative aspect-video w-full bg-muted">
        {/* {!imageError && (
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
            <ImageOff className="size-8" />
            <span className="text-xs">{tour.destination}</span>
          </div>
        )} */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageOff className="size-8" />
          <span className="text-xs">{tour.destination}</span>
        </div>
        {!tour.available && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Hết chỗ
          </Badge>
        )}
      </div>

      <CardHeader className="flex-1">
        <Link
          to={`/${tour.id}`}
          className="font-heading text-base leading-snug font-medium hover:text-primary transition-colors line-clamp-2"
        >
          {tour.name}
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {tour.destination}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {tour.duration}
          </span>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground line-clamp-2">
        {tour.description}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 pt-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(tour.price)}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="size-3.5" />
            {tour.slots} chỗ còn lại
          </span>
        </div>
        <Button asChild disabled={!tour.available}>
          <Link to={`/${tour.id}`}>Đặt tour</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
