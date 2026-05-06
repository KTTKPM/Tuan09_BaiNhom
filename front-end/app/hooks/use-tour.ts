import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { tourApi } from "~/lib/tourApi"

export function useTour(id?: number) {
  const queryClient = useQueryClient()

  const { data: tours, isLoading: isLoadingTours, error: toursError } = useQuery({
    queryKey: ["tours"],
    queryFn: () => tourApi.getAll().then((res) => res.data.data),
    enabled: id === undefined,
  })

  const { data: tour, isLoading: isLoadingTour, error: tourError } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => tourApi.getById(id!).then((res) => res.data.data),
    enabled: id !== undefined,
  })

  const bookTour = useMutation({
    mutationFn: tourApi.bookTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] })
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["tour", id] })
      }
    },
  })

  return {
    tours,
    tour,
    isLoading: id === undefined ? isLoadingTours : isLoadingTour,
    error: id === undefined ? toursError : tourError,
    bookTour,
  }
}
