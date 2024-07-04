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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import GetFarmerName from "./utils/farmersAPI";

import React, { Suspense, useEffect, useState } from "react";
import { getUser, updateExpertStatus } from "../utils/apis";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";

interface DashboardProps {
  name: string;
  email: string;
  role: string;
  exp: number | undefined;
  signOut: () => void;
}

const ExpertDashboard: React.FC<DashboardProps> = ({
  name,
  email,
  role,
  exp,
  signOut,
}) => {
  const [activeClass, setActiveClass] = useState(
    "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
  );
  const [activeState, setActiveState] = useState("Offline");

  const token = Cookies.get("token");
  const user = Cookies.get("user");
  const [isFetching, setIsFetching] = useState(false);
  const [refreshButtonColor, setRefreshButtonColor] =
    useState("/reload-light.svg");
  const [famersList, setFamersList] = useState([]);
  const GetFarmers = async () => {
    if (user != undefined) {
      setIsFetching(true);
      const result = await getUser(JSON.parse(user)._id);
      setFamersList(result.results.farmerInvitations);
      setIsFetching(false);
    }
  };

  const setState = async () => {
    if (activeState === "Offline") {
      setActiveState("Online");
      const result = await updateExpertStatus(token, "Online");
      if (result.status != "success") {
        setActiveState("Offline");
        toast({
          variant: "destructive",
          title: "You are Offline",
          description: "Profile set to offline...",
        });
      } else {
        setActiveState("Online");
        toast({
          title: "You are Online",
          description: "Profile set to online...",
        });
      }
    } else {
      setActiveState("Offline");
      const result = await updateExpertStatus(token, "Offline");
      if (result.status === "success") setActiveState("Offline");
      else setActiveState("Online");
    }
  };

  useEffect(() => {
    // getFarmers();
    if (activeState === "Offline") {
      setActiveClass(
        "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
      );
    } else {
      setActiveClass(
        "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
      );
    }
  });
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
                    Farmer Invitations
                    <span>
                      <Image
                        src={refreshButtonColor}
                        alt="reload button"
                        width={25}
                        height={25}
                        onClick={GetFarmers}
                        className={`cursor-pointer transition-transform duration-700 ${
                          isFetching ? "rotate-animation" : ""
                        }`}
                      />
                    </span>
                    <Button onClick={setState} className={activeClass}>
                      {activeState}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sr. No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Requested at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {famersList.map((farmerId, index) => {
                        return (
                          <Suspense
                            key={index}
                            fallback={
                              <TableRow>
                                <td>loading...</td>
                              </TableRow>
                            }
                          >
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="font-medium">
                                {GetFarmerName(farmerId)}
                              </TableCell>
                              <TableCell>
                                {/* <Badge className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"> */}
                                <Badge className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10 hover:bg-green-50 cursor-default">
                                  Online
                                </Badge>
                              </TableCell>
                              <TableCell>09:30 AM</TableCell>
                              <TableCell>
                                <button
                                  type="button"
                                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                                >
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                                >
                                  Reject
                                </button>
                              </TableCell>
                            </TableRow>
                          </Suspense>
                        );
                      })}
                    </TableBody>
                  </Table>
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

export default ExpertDashboard;
