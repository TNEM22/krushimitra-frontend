import Image from "next/image";
import Link from "next/link";
import {
  ChevronDownIcon,
  GlobeIcon,
  Home,
  ListFilter,
  Package,
  PanelLeft,
  Search,
  ShoppingCart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { appointExpert, getExperts, rejectExpert } from "../utils/apis";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";

interface DashboardProps {
  name: string;
  email: string;
  role: string;
  signOut: () => void;
}

const FarmerDashboard: React.FC<DashboardProps> = ({
  name,
  email,
  role,
  signOut,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [refreshButtonColor, setRefreshButtonColor] =
    useState("/reload-light.svg");
  const [mainColor, setMainColor] = useState(
    "flex min-h-screen w-full flex-col bg-muted/40"
  );
  const [mainColor2, setMainColor2] = useState(
    "grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"
  );
  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
    if (!isDarkMode) {
      setMainColor("flex h-full w-full flex-col bg-black dark text-foreground");
      setMainColor2(
        "grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 bg-black"
      );
      setRefreshButtonColor("/reload-dark.svg");
    } else {
      setMainColor("flex min-h-screen w-full flex-col bg-muted/40");
      setMainColor2(
        "grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"
      );
      setRefreshButtonColor("/reload-light.svg");
    }
  };
  const [isFetching, setIsFetching] = useState(false);
  const [experts, setExperts] = useState<any[]>([]);
  const GetExperts = async () => {
    setIsFetching(true);
    const result = await getExperts();
    setExperts(result.data.users);
    if (result.status !== "success") {
      console.log(result);
    } else {
      // console.log(experts);
      console.log("success");
    }
    setIsFetching(false);
  };
  useEffect(() => {
    GetExperts();
  }, []);

  const token = Cookies.get("token");
  const handleExpert = async (expertId: string) => {
    const btn = document.getElementById(expertId);
    console.log(btn?.innerText);
    if (btn?.innerText === "Connect") {
      btn.innerText = "Connecting";
      btn.classList.add("bg-yellow-600", "hover:bg-yellow-600");
      const result = await appointExpert(token, expertId);
      if (result.status === "success") {
        toast({
          title: "Appointment Booked",
        });
        btn.innerText = "Connecting";
        btn.classList.add("bg-yellow-600", "hover:bg-yellow-600");
      } else {
        toast({
          variant: "destructive",
          title: "Appointment Not Booked",
        });
        btn.innerText = "Connect";
        btn.classList.remove("bg-yellow-600", "hover:bg-yellow-600");
      }
    } else if (btn?.innerText === "Connecting") {
      btn.innerText = "Connect";
      btn.classList.remove("bg-yellow-600", "hover:bg-yellow-600");
      const result = await rejectExpert(token, expertId);
      if (result.status === "success") {
        toast({
          title: "Appointment Cancelled",
        });
        btn.innerText = "Connect";
        btn.classList.remove("bg-yellow-600", "hover:bg-yellow-600");
      } else {
        toast({
          variant: "destructive",
          title: "Appointment Not Cancelled",
        });
        btn.innerText = "Connecting";
        btn.classList.add("bg-yellow-600", "hover:bg-yellow-600");
      }
    }
  };
  return (
    <div className={mainColor}>
      {/* Side Bar For laptop and desktops */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-accent hover:text-foreground md:h-8 md:w-8 bg-primary text-primary-foreground rounded-full"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-screen">
        {/* All headers */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/* The guiding line */}
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">{role}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* <BreadcrumbPage>Dashboard</BreadcrumbPage> */}
                <BreadcrumbPage>Hi 👋🏼 {name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* Language Changer */}
          <div className="relative ml-auto flex-1 md:grow-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <GlobeIcon className="h-4 w-4" />
                  <span>English</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup defaultValue="en">
                  <DropdownMenuRadioItem value="en">
                    English
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="mr">
                    मराठी
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="hi">
                    हिंदी
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Search the experts */}
          {/* <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
            </div> */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDarkModeToggle}
              className="bg-muted hover:bg-muted-foreground"
            >
              {isDarkMode ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
          {/* Profile options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/logo.png"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={signOut}>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className={mainColor2}>
          <Tabs defaultValue="all" className="h-full">
            {/* Tabs and Filters */}
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="visited">Visited</TabsTrigger>
              </TabsList>
              {/* Filter Button */}
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle className="w-full flex justify-between items-center">
                    Experts
                    <span>
                      <Image
                        src={refreshButtonColor}
                        alt="reload button"
                        width={25}
                        height={25}
                        onClick={GetExperts}
                        className={`cursor-pointer transition-transform duration-700 ${
                          isFetching ? "rotate-animation" : ""
                        }`}
                      />
                    </span>
                  </CardTitle>
                  <CardDescription>Get your best experts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {experts.map((expert: any) => {
                      let statusClass =
                        "absolute top-2 right-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-50 cursor-default";
                      let isDisabled = true;
                      if (expert.status === "Online") {
                        statusClass =
                          "absolute top-2 right-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10 hover:bg-green-50 cursor-default";
                        isDisabled = false;
                      }
                      return (
                        <Suspense key={expert._id} fallback={<p>loading...</p>}>
                          <Card key={expert._id} className="relative max-w-60">
                            <img
                              src={expert.photo}
                              alt={"someone"}
                              width={200}
                              height={200}
                              className="rounded-t-lg object-cover w-full aspect-square"
                            />
                            <Badge className={statusClass}>
                              {expert.status}
                            </Badge>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-bold">{expert.name}</h3>
                                  <p className="text-muted-foreground text-sm">
                                    {expert.exp} years experience
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">
                                    ₹{expert.hourlyRate}/hr
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center p-4 bg-muted">
                              <Button
                                id={expert._id}
                                variant="default"
                                onClick={() => handleExpert(expert._id)}
                                className="flex-1 mr-2"
                                disabled={isDisabled}
                              >
                                Connect
                              </Button>
                              <Button
                                variant="outline"
                                // onClick={() => handleViewMore(expert)}
                                className="flex-1"
                              >
                                View More
                              </Button>
                            </CardFooter>
                          </Card>
                        </Suspense>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="visited" className="h-full">
              <div className="flex items-center justify-center rounded-lg border text-center border-dashed shadow-sm h-1/2">
                <h3 className="text-2xl font-bold tracking-tight">
                  🚧 This Section is under development 🚧
                </h3>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
