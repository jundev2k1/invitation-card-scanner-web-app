import { BellIcon, CalendarClockIcon, CreditCardIcon, SearchIcon, SettingsIcon, UserCircleIcon } from "@/app/components/icons";
import { Role, UserStatus } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";

enum FeatureModule {
  USER = "User",
  EVENT = "Event",
  EVENT_CATEGORY = "EventCategory"
}

const mockSearchData = Object.freeze([
  {
    meta: {
      id: "019c409a-c289-7d2e-b034-32c91c3103fb",
      name: "Nguyễn Văn A",
      role: Role.ADMIN
    },
    module: FeatureModule.USER
  },
  {
    meta: {
      id: "019c7e09-e299-786b-a310-183f75999dbd",
      name: "Nguyễn Văn B",
      status: UserStatus.WAITING_FOR_APPROVE,
      role: Role.STAFF
    },
    module: FeatureModule.USER
  },
  {
    meta: {
      id: "019c3d0d-18b7-7a4b-b2be-e41fcd8ea767",
      name: "Nguyễn Văn C",
      status: UserStatus.ACTIVE,
      role: Role.STAFF
    },
    module: FeatureModule.USER
  },
  {
    meta: {
      id: "019c657a-b87f-768a-b30b-cc7d5eb252c5",
      name: "Sinh nhật sếp A",
    },
    module: FeatureModule.EVENT
  },
  {
    meta: {
      id: "019c657a-b87f-768a-b30b-cc7d5eb252c6",
      name: "Tiệc tất niên cty ABC"
    },
    module: FeatureModule.EVENT
  }
  // Add more mock items if needed for testing
]);

const features = Object.freeze([
  {
    name: "Dashboard",
    icon: SearchIcon,
    href: "/",
    tags: [
      "dashboard", "analytics", "stats",
      "thongke", "trangchinh", "trangchu", "bangdieukhien"
    ],
  },
  {
    name: "User List",
    icon: UserCircleIcon,
    href: "/users",
    tags: [
      "user", "users", "userpage", "userlist", "list",
      "danhsach", "nguoidung", "moi", "nguoidungmoi", "usermoi",
      "nguoidangky", "dangkymoi", "nguoidangkymoi"
    ]
  },
  {
    name: "Event Category List",
    icon: SettingsIcon,
    href: "/event-categories",
    tags: [
      "page", "list",
      "eventcategory", "eventcategories", "eventcategorylist", "eventcategorypage",
      "category", "categories", "categorylist", "categorypage",
      "trang", "danhsach",
      "danhmuc", "danhmucsukien", "danhmucsukienlist", "danhmucsukienpage",
    ]
  },
  {
    name: "Event List",
    icon: CalendarClockIcon,
    href: "/events",
    tags: [
      "page", "list",
      "event", "events", "eventlist", "eventpage",
      "trang", "danhsach",
      "sukien", "danhsachsukien", "sukienpage", "trangsukien",
    ]
  },
  {
    name: "Event Card List",
    icon: CreditCardIcon,
    href: "/invitation-cards",
    tags: [
      "page", "list",
      "card", "cards", "cardlist", "cardpage", "invitationcard",
      "trang", "danhsach",
      "thiepmoi", "thumoi", "khachmoi",
    ]
  },
  {
    name: "Notification List",
    icon: BellIcon,
    href: "/",
    tags: [
      "new", "news", "bell",
      "notification", "notifications", "notificationlist", "notificationpage",
      "moi",
      "thongbao", "thongbaosukien", "thongbaomoi"
    ]
  }
]);

// Helper function to normalize strings: lowercase, remove accents, replace đ/Đ with d, remove non-alphanumeric except spaces
const normalizeString = (str: string) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s]/g, "") // Keep spaces for better phrase matching
    .replace(/\s+/g, " ") // Normalize multiple spaces
    .trim();
};

export const useSearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiResults, setApiResults] = useState<any[]>([]);

  const MAX_API_RESULTS = 5; // Limit for API/system records
  const MAX_FEATURES = 5; // Limit for quick access features

  // Open the search dialog
  const onOpen = useCallback(() => setOpen(true), []);

  // Close the search dialog and reset states
  const onClose = useCallback(() => {
    setOpen(false);
    setQuery("");
    setApiResults([]);
    setIsApiLoading(false);
  }, []);

  // Keyboard shortcut handler for ⌘+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open ? onClose() : onOpen();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpen, onClose]);

  // API search logic with debounce (simulated API call)
  useEffect(() => {
    if (!query.trim()) {
      setApiResults([]);
      setIsApiLoading(false);
      return;
    }

    setIsApiLoading(true);
    const debounceTimer = setTimeout(() => {
      // Simulation of API Call (replace with real API fetch in production)
      const timer = setTimeout(() => {
        const normalizedQuery = normalizeString(query);
        const results = mockSearchData
          .filter((item) => normalizeString(item.meta.name || "").includes(normalizedQuery))
          .slice(0, MAX_API_RESULTS); // Limit to top N results
        setApiResults(results);
        setIsApiLoading(false);
      }, 1200); // Simulate network delay

      return () => clearTimeout(timer);
    }, 400); // Debounce to prevent rapid calls

    return () => {
      clearTimeout(debounceTimer);
      setIsApiLoading(false); // Safety net
    };
  }, [query]);

  // Local feature search: instant, normalized, matches on name or tags, limited to top N
  const filteredFeatures = useMemo(() => {
    const q = normalizeString(query);
    if (!q) return features.slice(0, MAX_FEATURES); // Show top N even without query if desired, or [] if not

    return features
      .filter((f) => {
        const nameMatch = normalizeString(f.name).includes(q);
        const tagMatch = f.tags.some((tag) => normalizeString(tag).includes(q));
        return nameMatch || tagMatch;
      })
      .slice(0, MAX_FEATURES);
  }, [query]);

  return {
    open,
    onOpen,
    onClose,
    query,
    setQuery,
    isApiLoading,
    filteredFeatures,
    apiResults,
  };
};
