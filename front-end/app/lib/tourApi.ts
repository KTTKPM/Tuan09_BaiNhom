import api from "~/lib/api"
import type { Tour } from "~/types/tour"

export const tourApi = {
  getAll() {
    return api.get<Tour[]>("/tours")
  },
  getById(id: number) {
    return api.get<Tour>(`/tours/${id}`)
  },
  bookTour(data: { tourId: number; userId: number, quantity: number, totalPrice: number }) {
    return api.post("/book-tour", data)
  },
}
