import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [language, setLanguage] = useState("en");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [sortBy, setSortBy] = useState("experience");
  const experts = [
    {
      id: 1,
      name: "Dr. Amisha Patel",
      photo: "/placeholder.svg",
      hourlyRate: 50,
      experience: 8,
      languages: ["en", "mr", "hi"],
    },
    {
      id: 2,
      name: "Raj Kumar",
      photo: "/placeholder.svg",
      hourlyRate: 35,
      experience: 5,
      languages: ["en", "hi"],
    },
    {
      id: 3,
      name: "Priya Sharma",
      photo: "/placeholder.svg",
      hourlyRate: 45,
      experience: 10,
      languages: ["en", "mr"],
    },
    {
      id: 4,
      name: "Aditya Deshmukh",
      photo: "/placeholder.svg",
      hourlyRate: 55,
      experience: 12,
      languages: ["en", "hi"],
    },
    {
      id: 5,
      name: "Neha Patil",
      photo: "/placeholder.svg",
      hourlyRate: 40,
      experience: 7,
      languages: ["en", "mr", "hi"],
    },
    {
      id: 6,
      name: "Jai Singh",
      photo: "/placeholder.svg",
      hourlyRate: 30,
      experience: 3,
      languages: ["en", "hi"],
    },
    {
      id: 7,
      name: "Meena Desai",
      photo: "/placeholder.svg",
      hourlyRate: 50,
      experience: 9,
      languages: ["en", "mr"],
    },
    {
      id: 8,
      name: "Rahul Gupta",
      photo: "/placeholder.svg",
      hourlyRate: 60,
      experience: 15,
      languages: ["en", "hi"],
    },
  ];
  const filteredExperts = useMemo(() => {
    return experts.sort((a, b) => {
      if (sortBy === "experience") {
        return b.experience - a.experience;
      } else {
        return a.hourlyRate - b.hourlyRate;
      }
    });
  }, [sortBy]);
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };
  const handleConnect = (expert) => {
    setSelectedExpert(expert);
    setIsVideoCallOpen(true);
  };
  const handleEndCall = () => {
    setIsVideoCallOpen(false);
    setSelectedExpert(null);
  };
  const handleViewMore = (expert) => {
    setSelectedExpert(expert);
  };
  const handleSortChange = (value) => {
    setSortBy(value);
  };
  return (
    <div
      className={`flex flex-col min-h-screen bg-background text-foreground ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-muted">
        <div className="flex items-center gap-4">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            Farmer's Connect
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {language === "en"
                  ? "English"
                  : language === "mr"
                  ? "\u092E\u0930\u093E\u0920\u0940"
                  : "\u0939\u093F\u0902\u0926\u0940"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuRadioGroup defaultValue="en">
                <DropdownMenuRadioItem
                  value="en"
                  onSelect={() => handleLanguageChange("en")}
                >
                  English
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem
                  value="mr"
                  onSelect={() => handleLanguageChange("mr")}
                >
                  मराठी
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem
                  value="hi"
                  onSelect={() => handleLanguageChange("hi")}
                >
                  हिंदी
                </DropdownMenuRadioItem>
                {/* <DropdownMenuSeparator />
                <DropdownMenuRadioItem
                  value="jp"
                  onSelect={() => handleLanguageChange("jp")}
                >
                  日本語
                </DropdownMenuRadioItem> */}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
      </header>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {language === "en"
              ? "Connect with Agricultural Experts"
              : language === "mr"
              ? "\u0915\u0943\u0937\u0940 \u0924\u091C\u094D\u091C\u094D\u091E\u093E\u0902\u0936\u0940 \u091C\u094B\u0921\u093E"
              : "\u0915\u0943\u0937\u093F \u0935\u093F\u0936\u0947\u0937\u091C\u094D\u091E\u094B\u0902 \u0938\u0947 \u091C\u0941\u0921\u093C\u0947\u0902"}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {sortBy === "experience"
                  ? language === "en"
                    ? "Sort by Experience"
                    : language === "mr"
                    ? "\u0905\u0928\u0941\u092D\u0935\u093E\u0928\u0941\u0938\u093E\u0930 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u093E"
                    : "\u0905\u0928\u0941\u092D\u0935 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0947\u0902"
                  : language === "en"
                  ? "Sort by Rate"
                  : language === "mr"
                  ? "\u0926\u0930\u093E\u0928\u0941\u0938\u093E\u0930 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u093E"
                  : "\u0926\u0930 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0947\u0902"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => handleSortChange("experience")}>
                {language === "en"
                  ? "Sort by Experience"
                  : language === "mr"
                  ? "\u0905\u0928\u0941\u092D\u0935\u093E\u0928\u0941\u0938\u093E\u0930 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u093E"
                  : "\u0905\u0928\u0941\u092D\u0935 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0947\u0902"}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSortChange("rate")}>
                {language === "en"
                  ? "Sort by Rate"
                  : language === "mr"
                  ? "\u0926\u0930\u093E\u0928\u0941\u0938\u093E\u0930 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u093E"
                  : "\u0926\u0930 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0947\u0902"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="bg-card text-card-foreground">
              <div className="flex flex-col items-center justify-center gap-4 p-6">
                <img
                  src="/placeholder.svg"
                  alt={expert.name}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <div className="text-center">
                  <h3 className="text-lg font-bold">{expert.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en"
                      ? `${expert.experience} years experience`
                      : language === "mr"
                      ? `${expert.experience} वर्षांचा अनुभव`
                      : `${expert.experience} वर्षों का अनुभव`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en"
                      ? `₹${expert.hourlyRate}/hr`
                      : language === "mr"
                      ? `₹${expert.hourlyRate}/तास`
                      : `₹${expert.hourlyRate}/घंटा`}
                  </p>
                </div>
                <div className="flex gap-2">
                  {expert.languages.includes(language) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnect(expert)}
                    >
                      {language === "en"
                        ? "Connect"
                        : language === "mr"
                        ? "\u091C\u094B\u0921\u093E"
                        : "\u091C\u0941\u0921\u093C\u0947\u0902"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewMore(expert)}
                  >
                    {language === "en"
                      ? "View More"
                      : language === "mr"
                      ? "\u0905\u0927\u093F\u0915 \u092A\u0939\u093E"
                      : "\u0905\u0927\u093F\u0915 \u0926\u0947\u0916\u0947\u0902"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      {isVideoCallOpen && selectedExpert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card text-card-foreground p-6 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/placeholder.svg"
                  alt={selectedExpert.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <h3 className="text-lg font-bold">{selectedExpert.name}</h3>
              </div>
              <Button variant="outline" size="sm" onClick={handleEndCall}>
                {language === "en"
                  ? "End Call"
                  : language === "mr"
                  ? "\u0915\u0949\u0932 \u0938\u0902\u092A\u0935\u093E"
                  : "\u0915\u0949\u0932 \u0938\u092E\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902"}
              </Button>
            </div>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src={`https://meet.jit.si/${selectedExpert.id}`}
                frameBorder="0"
                allow="camera;microphone"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
      {selectedExpert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card text-card-foreground p-6 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/placeholder.svg"
                  alt={selectedExpert.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <h3 className="text-lg font-bold">{selectedExpert.name}</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedExpert(null)}
              >
                {language === "en"
                  ? "Close"
                  : language === "mr"
                  ? "\u092C\u0902\u0926 \u0915\u0930\u093E"
                  : "\u092C\u0902\u0926 \u0915\u0930\u0947\u0902"}
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Years of Experience"
                    : language === "mr"
                    ? "\u0905\u0928\u0941\u092D\u0935\u093E\u091A\u0947 \u0935\u0930\u094D\u0937\u0947"
                    : "\u0905\u0928\u0941\u092D\u0935 \u0915\u0947 \u0935\u0930\u094D\u0937"}
                </p>
                <p className="text-lg font-bold">
                  {selectedExpert.experience}{" "}
                  {language === "en"
                    ? "years"
                    : language === "mr"
                    ? "\u0935\u0930\u094D\u0937\u0947"
                    : "\u0935\u0930\u094D\u0937"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Hourly Rate"
                    : language === "mr"
                    ? "\u0924\u093E\u0938\u093E\u0920\u0940 \u0926\u0930"
                    : "\u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0926\u0930"}
                </p>
                <p className="text-lg font-bold">
                  {language === "en"
                    ? `₹${selectedExpert.hourlyRate}/hr`
                    : language === "mr"
                    ? `₹${selectedExpert.hourlyRate}/तास`
                    : `₹${selectedExpert.hourlyRate}/घंटा`}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Languages"
                    : language === "mr"
                    ? "\u092D\u093E\u0937\u093E"
                    : "\u092D\u093E\u0937\u093E\u090F\u0902"}
                </p>
                <div className="flex gap-2">
                  {selectedExpert.languages.map((lang) => (
                    <Badge
                      key={lang}
                      variant={lang === language ? "secondary" : "outline"}
                    >
                      {lang === "en"
                        ? "English"
                        : lang === "mr"
                        ? "\u092E\u0930\u093E\u0920\u0940"
                        : "\u0939\u093F\u0902\u0926\u0940"}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
