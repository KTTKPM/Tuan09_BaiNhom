import { Link, useLocation } from "react-router"
import { Menu, Compass, LogIn, UserPlus } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

export function Header() {
  const location = useLocation()
  const isAuthPage = ["/login", "/register"].includes(location.pathname)

  if (isAuthPage) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Compass className="size-5" />
            <span>TourDuLịch</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Trang chủ
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/login">
              <LogIn className="size-4 mr-1.5" />
              Đăng nhập
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/register">
              <UserPlus className="size-4 mr-1.5" />
              Đăng ký
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Menu className="size-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2 pt-2 border-t">
            <Button asChild variant="outline">
              <Link to="/login">
                <LogIn className="size-4 mr-2" />
                Đăng nhập
              </Link>
            </Button>
            <Button asChild>
              <Link to="/register">
                <UserPlus className="size-4 mr-2" />
                Đăng ký
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
