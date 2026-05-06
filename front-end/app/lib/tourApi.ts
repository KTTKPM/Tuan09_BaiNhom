import api from "~/lib/api"
import type { Tour } from "~/types/tour"

export const tourApi = {
  getAll() {
    return api.get<{success: boolean; count: number; data: Tour[]}>("/tours")
  },
  getById(id: number) {
    return api.get<{success: boolean; data: Tour}>(`/tours/${id}`)
  },
  bookTour(data: { tourId: number; userId: number, quantity: number, totalPrice: number }) {
    return api.post("/tours/book", data)
  },
}
