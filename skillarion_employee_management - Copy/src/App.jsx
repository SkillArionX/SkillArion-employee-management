import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  LayoutDashboard, Users, Clock, ClipboardList, FolderUp, Briefcase,
  Award, FileBarChart, Settings as SettingsIcon, LogOut, Plus, X,
  Search, Check, Ban, Trash2, Pencil, Bell, ChevronRight, Upload,
  Download, CheckCircle2, XCircle, AlertTriangle, Clock3, Filter,
  ArrowLeft, FolderKanban, CalendarX, Megaphone, History, TrendingUp,
  Flame, Image as ImageIcon, FileText, UserCog, Paperclip, Camera, MapPin
} from "lucide-react";

const LOGO_DATA_URI = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCADIAMgDASIAAhEBAxEB/8QAHQABAAEEAwEAAAAAAAAAAAAAAAcBBAYIAgUJA//EAD4QAAEDAwMBBgIIAwYHAAAAAAEAAgMEBQYHESExCBITQVFhcYEJFCIjMkJSkRVigjNTcpKhoiQ0Y3OxweH/xAAbAQEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EAC4RAAIBAwMCBAUEAwAAAAAAAAABAgMEEQUhQRIxBhNRkXGBwdHwFWGx4SIyof/aAAwDAQACEQMRAD8A9U0REAREQBERAEREAREQBERAEREAREQBERAFQjdWNPd6CquNZaYJw+qoWxPnjHWMSAlm/wAe6VfLxST7DsVREXoCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA4KL8115suA3V1oyPF8hgedzFM2GF0U7fWN3i8/8AkeYClA/6KMu0JUWum0xuQuFBFWTzllNRMezvOE7zsHM8+8B3jx6LivnVp0JTpSw1v2ybaCjKajJZyQfiGvNNZtUcizO8U1bLbL4C0QQhhljDCBDuC4DhgIPPmVsJgGqdHqQySosuO3uCij3BrKuGOOEu/S0h5Lj8Bx5rVG46QagYtZKPMrvjRfQ95ss0BO74WAg/fNHLQR+3nst08dltlRYbfU2WGKKgnpY5aZkTA1rY3NBaABwOCobRJ3c5yjWeEt8NbvP0O6+VFJSprPHsdsqoisxGBERAEREAREQBERAEREAREQBERAU42VCN/JPRY/l2ZWTCbJPfr9WiGnh4A23fI7yY0eZP/wB6LVOcacXObwkepOTwjIe8qb+y1NybtXZhXVL48WttHbKQH7D5m+PMR6n8jfhsfiVbWDtVagW+pab5S26602/3jfD8CTb2c37I+YKhn4hs1Poy/jjb7nb+nXGM4Nuhtsqg7/lKxDT/AFGx7Uezi62Kod32ODKmmlIEsD/Rw9D5EcH91l3e25JU1SqRrRU6bymcUoOD6ZLc5beXkrKqtlDWzU01ZSxzPpJfGgL27+HJsR3h6HYkb+59Veb9CoK1717qdNNQNK9LccZTy3rPskp6epEg7/gWtkjfrEgHk924a0n/AKh6tWyNN1X0pfi3PM4JzcxkjSx7QWkbEEcFW9BbqO2UcVBQU8dPTwjaOONvda0b77AeQ9ldjoqrHpWcgIiLIBERAEREAREQBERAEREAREQBERAcHD/Rad9prLqq+6hTWBkx+pWNrYWMB4Mr2Bz3fHkN/pW4u3TdaN69WqotOq1+ZMwhlVKyricfzNkaDx89x8lXPEk6kLZKHZvckdLjF1m36EfoiKhFkM90Ry6pxDUa01EcpFLXzsoKtm/Do5CACf8ACdnfJbygADfdefuAWqpveb2G2UrC6SouEA48mBwLj8gCfkvQIDjuq7+GJzlQlF9k9vqV7VYpVItd8FeAF5nYTnbO0n9J9SZFbpvreO4VHWU9A5p3aaekgljEoPo6qm8QH0cFPX0hfagptENM5cExi4huaZhTyU9KI3/boKI7tlqjtyCeY4/5ySP7MqAvohsBdPkOe6nVMGzKOkp7HSyEdXyv8aYD4CKD/MvoVnbu3tKl3PlYXz2bIhvLwem6IihjMIiIAiIgCIiAIiIAiIgCIiAIiIAiIgKcbeyinXHR9mpVsir7U+OG+UDSIHv4bPH1MTj5c8g+RJ9VKp67Kh36lc9xb07qm6VRZTM6dSVKSlHued9+xu/YvWut1/tNTQVDTt3JoyN/cHoR7jhW9rtNzvVYy32e31NbUyHZsVPEXuPyC9EaqlpayIw1dNFPG7qyRocP2Kt2w2qy0skscNJQU0bTJK5rWxMYAOXE8AADzVYfhZOe09vhuSv6vLH+u/xIf0D0SqMHc7KspjZ/GZmGOCAEOFJG7ruRwZD046N48yuXag7UeC9mXC33e+zsr8gr2PbZrJHJtLVydO+79ETT+J5+A3cQFCfaZ+ks0602hq8Y0akpsxybuuiNax/etdE/9RkH/MEekZ7nq/jZeWmeagZlqflNbmeeX6rvF5uDu9NU1Dtzt5MaBwxg6BoAAHQL6LoPhrphFSXTBe7Im4ryqycpdz76l6k5dq5m10z7N7o+uu91l8WV/RkbOjYo2/kjaNgB5AL2Z7CekUuj3Zuxm03Cl8C7Xxhv1yaRs4TVABY13u2FsLCPVhXmp2D+zTWa/wCr1Jcb1bnuw3FJY6+8yvZ9ipeDvFSe5kI+2P7sP6Ejf2vDWtHdbwApDX7mEYxs6XG7+iNMFyzmiIqybAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA4jjqFjGdaj4JpnZn5BqBl9qsNA3cCevqWwh5/S0E7vd7NBPstLfpA+27nejOXUmkukFxoaK6G3isu9yfTieelMp+6iiDt2Nd3B3yXNdxJHttyvM3MM2zHP7zLkOcZPdL9cpfxVVwqnzv29AXk7D0A4CndO0KrdwVWUsRfuYOfSeles/0r+D2L6xadEsTnyWrG7GXW6h1NRA+rIv7WUex8JaH6xdqTXTXWWRmoOeVs9ue7vMtNI76tQN9PuY9g/byMnfPuopRWu00m1s94x39XuzBtsKQtCtEM27QOoVDp/hNGTLOfFrKx7SYLfTAjvTSn0G/A6kkAclXegvZ51I7RWXx4rgFpe6GIsNwukwIo7fEfzSu9euzR9t23A4JHs/2dOzngXZtwePEsOp/HrKgMkut2mjAqbjOB+J/6WDchkY4aD5klx5NV1eFlDy6W83/z92Ixyd1olo3huhGnlt06wmi8OkoW96eoe0eNWVB28SeU+b3EfIAAcAKQd+dk2PqnAVBlKVSTnN5bNxVERegIiIAiIgCIiAIiIAiIgCIiAIiICh2811GV5LacOxq65bfqkU1tstHNX1cp/JFEwvef2BXb8Eb+q0d+lO1pOGaQW/Si0VhZc82qN6sMP2m26nIc/f078vhM9wJAt1pQdzXjTXP4zxvB5jar6iXbVnUnJNR74531u/3CWsLCd/BjJ2jiHtHGGNHs0LE1kGEafZzqTemY7gGKXS/3GTb/AIegpnTOaP1P2GzGe52A9Vu3ol9FBm99dT3fXLKYcbozs59ptTmVNa4fpdNzFEfh4vyX0Ore2unwUZSxjjn2NKTkaIWay3jIrpTWTH7VWXK41kgipqSkhfNNM8+TWsBJPwW9/Zw+i2yjJPq+U9oOumx+2HaSOw0UrXV0w67TS8thHsN39f7Mrf8A0e7Omjug9t+paaYVRW2eRobUXB7fGraj/uTv3eRvz3QQ0eQCk09FWb/xFUrf40F0r15/o2KPqYvgWnWE6W41TYfp/jVFZLTSD7unpY+6C7zc93V7jty5xLj5lZSusberTJdHWOO4U8leyLx30zZAZGR7gd5wHQcjr1XZb87KteZ5jcs5M8YKoiLIBERAEREAREQBERAEREAREQBERAEREBQdFrBqJ2H8R1z1orNWdacgrbzQxRQ0Nnx6kc6mpqeljG/dmlB8SQukdJIQ3w9i/bc7LaBcOByVlCrKi3KDwx3McwvAcL05ssePYFi1rsNsj5FNQUrYWk/qd3R9p3udyfVZC6RsbS97g0Abkk9FFOovaGxDCTLbrc4Xi7M4MFO/7uI/zydPkNz67LWjONYM6z5747xdnwUTjxRUu8UAHuOr/wColQeoa9Qtm9+qX53Z22+n1a+72Rs9mvaH0+xEPpqavN6rmceBQkOaD/NL+EfLc+ygPNe0jqFlPiUltqWWKhfx4dET4xHvKef8vcUUru8LxipzLK7ZjVJuH104je4fkj6yO+TAT8lVq+sXd/Py4vCfC+5L07Chbrre+PU2h7MmIy2fDZsouAe6vyGXxi9+5f4Ddwzcn1Je73BCmgkHkK1oKKmtdDT2yjhEVPSxMhiYOjWNGwH7BXf2VeLOirehGmuCv1pupNyfJVERdZrCIiAIiIAiIgCIiAIiIAiIgCIiA4gDbYFCNgqjbyC6u/3y245a6q83eqjp6OjjMssjzsA3/wBk9APMrCc1BdUuwS6tkcL/AJHZ8YtdRe75Xx0lJTN7z5Hn9gB5k+QHJWpeqfaCyLOJZrVYZZrTZOW9xju7PUD1e4dAf0jj13XRatar3bU69GSR0lNaKZ5FHR79B/eO9Xn/AE6D3wJUfVtanXk6NB4j/P8ARYLLT40111N3/ARcmte9wYxpc4nYADckqS8L7PeoeXGOee3iz0L+fHrwWOI/li/GfmAPdQVG1q3UsQi2yQqVqdFZk8EZLYzsm4WTLcs7rIeGj6hRlw8+DK4f7Rv7uWdYX2acBxnw6q6wvv1Yznv1g2hB9ohx/m7ylamp4aWFtNTQshijHdaxjQ1rR6ADorZpOhVLeqq1ZrbghrzUY1YOlT55LnghVRFbCICIiAIiIAiIgCIiAIiIAiIgCIiAIiID5lwHOy067QOrMmb31+O2eoP8EtcpYCw8VM44Mh9QOQ35nz4nnX/Nn4Zp7V/VJfDr7qfqFOQeW98HvuHwYDz6kLTCioqu41cNBQU0lRU1Egjiijbu6R5OwACqfiG+nta0ue/0RL6Zbxea0/kfENLiGtBJPAA81M+nHZnyXKGRXXLJpLJb37ObEW71Ug/wniP4nn2Uq6N6B27Co4MgyeGKtv5aHMaftR0Xsz1f6u8vL1MzAcdVr0zw8sKrde33MrvUnnppe5h+HaU4NgjA6wWKFtSBzVTfeTn+s9PgNgsxOwag39d1U/BWqnRp0Y9NNYX7ERKcpvMnkqiItxiEREAREQBERAEREAREQBERAEREAREQBEVHfhKPYGpPauyI3HN6HHI5N4bTSB72+ksvJ/2CP91n/Zz0iZjtthzi/Ug/itwj71JG9vNNARwfZzh+wO3mVHuP42NWe0FeamuZ41roa6Woqd+Q+KJ3hxR/1bN49N1tsA1gAHQKs6faq6up3lTtlpfLkk7mt5NGNCHpufRERWYjAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCt6ydtNSTVBG4ijc87ew3VwuBDXAgjcHghYTj1LAIc7M+JT2XDp8nuEZbW5HN9Z3cOfAG/h/uS93wcFMm3G5XyjiigjbFGwNY0BrWtGwAHQAL7E7BaregremqceDKpN1JuT5KoiLoMQiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiID//Z";

/* ============================== DESIGN TOKENS ==============================
   Palette: deep ink navy (#12213B) + slate surfaces + a single warm signal
   accent (amber, #E8A33D) reserved for "in-progress / needs attention",
   with a cool emerald (#1F9D6C) reserved exclusively for "done / eligible".
   Everything else stays quiet: near-white surfaces, slate text.
   Type: tight, confident uppercase eyebrows + a plain, dense body face —
   this is an ops tool, not a marketing page. Numbers get tabular treatment.
=============================================================================*/

const COLORS = {
  ink: "#1E1A5C",
  ink2: "#332C82",
  slate: "#635E85",
  slateLight: "#9C97BC",
  bg: "#F5F4FA",
  surface: "#FFFFFF",
  border: "#E5E2F2",
  amber: "#B9974F",
  amberBg: "#F6F0E1",
  emerald: "#1F9D6C",
  emeraldBg: "#E7F7EF",
  red: "#D9483C",
  redBg: "#FBEAE8",
  blue: "#4C4796",
  blueBg: "#ECEAF7",
};

const uid = (p = "id") => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
const todayStr = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
const fmtTime = (t) => { if (!t) return "--:--"; const d = new Date(t); return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }); };
const daysBetween = (a, b) => Math.floor((new Date(b) - new Date(a)) / 86400000);
const clampPct = (n) => Math.max(0, Math.min(100, Math.round(n)));
const roleLabel = (role) => (role === "Intern/Employee" ? "Intern" : role);
const isIntern = (user) => user?.role === "Intern/Employee";
const isEmployee = (user) => user?.role === "Employee";
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
// Uploads to Supabase Storage when it's configured (see src/main.jsx), so the
// file lives as a real object in the bucket and only its URL is stored in the
// database. Falls back to embedding the file as a base64 data URL when no
// Supabase project is connected (e.g. local testing), so uploads still work
// either way — the rest of the app just treats the result as a URL string.
async function uploadOrEncode(file, folder) {
  if (typeof window !== "undefined" && window.uploadFile) {
    return await window.uploadFile(file, folder);
  }
  return await fileToDataUrl(file);
}

/* ============================== DEFAULT DB ============================== */

const defaultCertSettings = {
  requiredDays: 90,
  requiredAttendancePct: 85,
  requiredTasks: 10,
};

function seedDb() {
  const adminId = "admin_seed";
  const studentId = "student_seed";
  const joinDate = new Date(); joinDate.setDate(joinDate.getDate() - 14);
  const projectId = "proj_seed";
  return {
    users: [
      {
        id: adminId, name: "System Admin", email: "admin@skillariondevelopment.in", phone: "",
        role: "Admin", username: "admin@skillariondevelopment.in", password: "Academia@270525",
        department: "Administration", domain: "", joiningDate: todayStr(), status: "Active",
      },
      {
        id: studentId, name: "Vinod Gadekari", email: "vinod.gadekari@skillariondevelopment.in", phone: "",
        role: "Intern/Employee", username: "vinod.gadekari", password: "vinod@123",
        department: "Engineering", domain: "Web Development", joiningDate: joinDate.toISOString().slice(0, 10), endDate: "", status: "Active",
        bdAccess: false,
      },
    ],
    attendance: [],
    attendanceCorrections: [],
    tasks: [],
    assignments: [],
    submissions: [],
    bdContent: [],
    workLogs: [],
    notifications: [],
    certSettings: defaultCertSettings,
    certIssued: [],
    projects: [
      {
        id: projectId, name: "Onboarding Sandbox", title: "Ramp-up sandbox for new joiners",
        description: "Starter project every new intern is assigned to while ramping up.",
        domain: "Web Development", startDate: joinDate.toISOString().slice(0, 10), endDate: "",
        status: "Active", internIds: [studentId], teamLeadId: null,
        documentName: null, documentDataUrl: null,
      },
    ],
    leaveRequests: [],
    announcements: [],
    auditLog: [],
  };
}

/* ============================== STORAGE HOOK ============================== */

function normalizeDb(loaded) {
  const seeded = seedDb();
  // Merge: keep everything the loaded db already has, but guarantee every
  // top-level collection/object this app now expects actually exists.
  // This protects against a database saved by an earlier version of the
  // app (before Projects/Leave/Announcements/Audit Log/Corrections existed)
  // crashing the whole portal on load.
  const users = (Array.isArray(loaded.users) && loaded.users.length ? loaded.users : seeded.users).map((u) => ({
    bdAccess: false, endDate: "",
    ...u,
  }));
  // Keep the supplied default credentials available even when an older
  // app-db already exists in browser storage.
  const admin = users.find((u) => u.role === "Admin" && u.username === "admin@skillariondevelopment.in") || users.find((u) => u.role === "Admin");
  if (admin) {
    admin.username = "admin@skillariondevelopment.in";
    admin.email = "admin@skillariondevelopment.in";
    admin.password = "Academia@270525";
    admin.status = "Active";
  }
  const defaultIntern = users.find((u) => u.username === "vinod.gadekari") || users.find((u) => isIntern(u));
  if (defaultIntern) {
    defaultIntern.username = "vinod.gadekari";
    defaultIntern.password = "vinod@123";
    defaultIntern.status = "Active";
  }
  const projects = (Array.isArray(loaded.projects) ? loaded.projects : seeded.projects).map((p) => ({
    title: "", teamLeadId: null, documentName: null, documentDataUrl: null,
    ...p,
  }));
  return {
    users,
    attendance: Array.isArray(loaded.attendance) ? loaded.attendance : [],
    attendanceCorrections: Array.isArray(loaded.attendanceCorrections) ? loaded.attendanceCorrections : [],
    tasks: Array.isArray(loaded.tasks) ? loaded.tasks : [],
    assignments: Array.isArray(loaded.assignments) ? loaded.assignments : [],
    submissions: Array.isArray(loaded.submissions) ? loaded.submissions : [],
    bdContent: Array.isArray(loaded.bdContent) ? loaded.bdContent : [],
    workLogs: Array.isArray(loaded.workLogs) ? loaded.workLogs : [],
    notifications: Array.isArray(loaded.notifications) ? loaded.notifications : [],
    certSettings: loaded.certSettings && typeof loaded.certSettings === "object" ? loaded.certSettings : defaultCertSettings,
    certIssued: Array.isArray(loaded.certIssued) ? loaded.certIssued : [],
    projects,
    leaveRequests: Array.isArray(loaded.leaveRequests) ? loaded.leaveRequests : [],
    announcements: Array.isArray(loaded.announcements) ? loaded.announcements : [],
    auditLog: Array.isArray(loaded.auditLog) ? loaded.auditLog : [],
  };
}

function useDb() {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("app-db", true);
        if (res && res.value) {
          const normalized = normalizeDb(JSON.parse(res.value));
          setDb(normalized);
          // Persist the normalized shape so future loads skip this migration.
          window.storage.set("app-db", JSON.stringify(normalized), true).catch(() => {});
        } else {
          const seeded = seedDb();
          await window.storage.set("app-db", JSON.stringify(seeded), true);
          setDb(seeded);
        }
      } catch (e) {
        const seeded = seedDb();
        try { await window.storage.set("app-db", JSON.stringify(seeded), true); } catch (e2) {}
        setDb(seeded);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next) => {
    setDb(next);
    try {
      await window.storage.set("app-db", JSON.stringify(next), true);
    } catch (e) {
      setError("Could not save — your last change may not persist.");
    }
  }, []);

  const update = useCallback((mutator) => {
    setDb((prev) => {
      if (!prev) return prev;
      const next = mutator(structuredClone(prev));
      window.storage.set("app-db", JSON.stringify(next), true).catch(() => setError("Could not save — your last change may not persist."));
      return next;
    });
  }, []);

  return { db, loading, error, setError, update, persist };
}

/* ============================== SHARED UI ============================== */

function Badge({ children, tone = "slate" }) {
  const map = {
    slate: { bg: "#EEF1F6", fg: COLORS.slate },
    amber: { bg: COLORS.amberBg, fg: "#7C6224" },
    emerald: { bg: COLORS.emeraldBg, fg: "#146B48" },
    red: { bg: COLORS.redBg, fg: "#A5352C" },
    blue: { bg: COLORS.blueBg, fg: "#332C82" },
    ink: { bg: "#EAEDF5", fg: COLORS.ink },
  };
  const c = map[tone] || map.slate;
  return (
    <span style={{ background: c.bg, color: c.fg }} className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase whitespace-nowrap">
      {children}
    </span>
  );
}

function statusTone(status) {
  switch (status) {
    case "Working": case "Completed": case "Approved": case "Eligible": case "Active": case "Issued": return "emerald";
    case "Pending": case "In Progress": case "Submitted": case "Half-day": return "amber";
    case "Rejected": case "Overdue": case "Inactive": case "Not Eligible": case "Disabled": case "Changes Requested": return "red";
    default: return "slate";
  }
}

function Card({ children, className = "", style = {} }) {
  return (
    <div className={`rounded-2xl bg-white border ${className}`} style={{ borderColor: COLORS.border, ...style }}>
      {children}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", icon: Icon, className = "", type = "button", disabled }) {
  const styles = {
    primary: { background: COLORS.ink, color: "#fff" },
    outline: { background: "#fff", color: COLORS.ink, border: `1px solid ${COLORS.border}` },
    ghost: { background: "transparent", color: COLORS.slate },
    danger: { background: COLORS.red, color: "#fff" },
    subtle: { background: "#EEF1F6", color: COLORS.ink },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles[variant]}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition active:scale-[0.98] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

function StatCard({ label, value, sub, icon: Icon, tone = "ink" }) {
  const toneColors = { ink: COLORS.ink, amber: COLORS.amber, emerald: COLORS.emerald, blue: COLORS.blue, red: COLORS.red };
  return (
    <Card className="p-4 flex flex-col gap-3 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: COLORS.slateLight }}>{label}</span>
        {Icon && <Icon size={16} color={toneColors[tone]} />}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold tabular-nums" style={{ color: COLORS.ink }}>{value}</span>
      </div>
      {sub && <span className="text-xs" style={{ color: COLORS.slateLight }}>{sub}</span>}
    </Card>
  );
}

function ProgressBar({ pct, tone = "ink", height = 8 }) {
  const toneColors = { ink: COLORS.ink, amber: COLORS.amber, emerald: COLORS.emerald, blue: COLORS.blue };
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ background: "#EEF1F6", height }}>
      <div style={{ width: `${clampPct(pct)}%`, background: toneColors[tone], height: "100%", borderRadius: 999, transition: "width .4s ease" }} />
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(30,26,92,0.45)" }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`bg-white rounded-2xl w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[88vh] overflow-y-auto shadow-2xl`}>
        <div className="flex items-center justify-between px-5 py-4 border-b sticky top-0 bg-white z-10" style={{ borderColor: COLORS.border }}>
          <h3 className="font-semibold text-base" style={{ color: COLORS.ink }}>{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} color={COLORS.slate} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: COLORS.slateLight }}>{label}</span>
      {children}
    </label>
  );
}

const inputCls = "w-full px-3 py-2 rounded-lg text-sm border outline-none focus:ring-2 transition";
const inputStyle = { borderColor: COLORS.border, "--tw-ring-color": "#2F6FED33" };

function TextInput(props) {
  return <input {...props} className={`${inputCls} ${props.className || ""}`} style={{ ...inputStyle, ...(props.style || {}) }} />;
}
function TextArea(props) {
  return <textarea {...props} className={`${inputCls} ${props.className || ""}`} style={{ ...inputStyle, ...(props.style || {}) }} />;
}
function Select({ children, ...props }) {
  return <select {...props} className={`${inputCls} bg-white ${props.className || ""}`} style={{ ...inputStyle, ...(props.style || {}) }}>{children}</select>;
}
function Switch({ checked, onChange, label, sub }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className="w-9 h-5 rounded-full relative transition shrink-0" style={{ background: checked ? COLORS.emerald : COLORS.border }}>
        <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: checked ? 18 : 2 }} />
      </button>
      <span>
        {label && <span className="block text-sm font-medium" style={{ color: COLORS.ink }}>{label}</span>}
        {sub && <span className="block text-xs" style={{ color: COLORS.slateLight }}>{sub}</span>}
      </span>
    </label>
  );
}

function EmptyState({ title, sub, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center gap-2">
      {Icon && <Icon size={28} color={COLORS.slateLight} />}
      <p className="font-medium text-sm" style={{ color: COLORS.ink }}>{title}</p>
      {sub && <p className="text-xs max-w-xs" style={{ color: COLORS.slateLight }}>{sub}</p>}
    </div>
  );
}

function Toast({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-[fadein_.2s_ease]"
          style={{ background: t.tone === "error" ? COLORS.red : COLORS.ink, color: "#fff" }}>
          {t.tone === "error" ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, tone = "ok") => {
    const id = uid("t");
    setToasts((p) => [...p, { id, msg, tone }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 2600);
  }, []);
  return { toasts, push };
}

/* ============================== DERIVED / CALC HELPERS ============================== */

function computeWorkingHours(checkIn, checkOut) {
  if (!checkIn || !checkOut) return null;
  const ms = new Date(checkOut) - new Date(checkIn);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
}

function computeWorkingHoursDecimal(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, ms / 3600000);
}

function computeStreak(presentDatesSet) {
  let streak = 0;
  const d = new Date();
  if (!presentDatesSet.has(d.toISOString().slice(0, 10))) {
    d.setDate(d.getDate() - 1); // don't break the streak just for not having checked in yet today
  }
  while (presentDatesSet.has(d.toISOString().slice(0, 10))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function certProgressFor(db, userId) {
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;
  const settings = db.certSettings || defaultCertSettings;
  const joined = user.joiningDate;
  const records = db.attendance.filter((a) => a.userId === userId);
  const presentDays = records.filter((a) => a.status === "Working").length;
  const attendancePct = records.length ? clampPct((presentDays / records.length) * 100) : 0;
  const myTasks = db.tasks.filter((t) => t.internId === userId);
  const tasksCompleted = myTasks.filter((t) => t.status === "Approved").length;
  const issued = (db.certIssued || []).find((c) => c.userId === userId);

  if (isEmployee(user)) {
    const hasEndDate = !!user.endDate;
    const today = todayStr();
    const totalDays = hasEndDate ? Math.max(1, daysBetween(joined, user.endDate) + 1) : 0;
    const dayNumber = hasEndDate ? Math.max(1, Math.min(totalDays, daysBetween(joined, today) + 1)) : Math.max(1, daysBetween(joined, today) + 1);
    const daysRemaining = hasEndDate ? Math.max(0, daysBetween(today, user.endDate)) : 0;
    const periodDone = hasEndDate && today >= user.endDate;
    return {
      joined, endDate: user.endDate || null, dayNumber, daysCompleted: dayNumber,
      daysRemaining, progressPct: hasEndDate ? clampPct((dayNumber / totalDays) * 100) : 0,
      attendancePct, tasksCompleted, requiredTasks: 0, requiredDays: totalDays || 0,
      requiredAttendancePct: 0, periodDone, attendanceOk: true, tasksOk: true,
      status: user.status === "Disabled" ? "Disabled" : periodDone ? "Completed" : "Active",
      issued: null, employee: true,
    };
  }

  const dayNumber = Math.max(1, daysBetween(joined, todayStr()) + 1);
  const daysCompleted = Math.min(dayNumber, settings.requiredDays);
  const daysRemaining = Math.max(0, settings.requiredDays - daysCompleted);
  const periodDone = daysCompleted >= settings.requiredDays;
  const attendanceOk = attendancePct >= settings.requiredAttendancePct;
  const tasksOk = tasksCompleted >= settings.requiredTasks;
  const eligible = periodDone && attendanceOk && tasksOk;
  return {
    joined, endDate: null, dayNumber, daysCompleted, daysRemaining,
    progressPct: clampPct((daysCompleted / settings.requiredDays) * 100),
    attendancePct, tasksCompleted, requiredTasks: settings.requiredTasks,
    requiredDays: settings.requiredDays, requiredAttendancePct: settings.requiredAttendancePct,
    periodDone, attendanceOk, tasksOk,
    status: issued ? "Completed" : eligible ? "Eligible" : "Not Eligible",
    issued: issued || null, employee: false,
  };
}

function addNotification(db, { userId, message, type = "info", relatedId = null }) {
  db.notifications.unshift({ id: uid("ntf"), userId, message, type, relatedId, date: new Date().toISOString(), read: false });
  return db;
}

const DOMAINS = ["AI/ML", "Web Development", "IoT", "Cloud", "Other"];

function addAudit(db, { actorName, action, entityType, entityLabel }) {
  db.auditLog = db.auditLog || [];
  db.auditLog.unshift({ id: uid("audit"), actorName, action, entityType, entityLabel, timestamp: new Date().toISOString() });
  return db;
}

/* ============================== LOGIN SCREEN ============================== */

function LoginScreen({ db, onLogin }) {
  const [portal, setPortal] = useState("student"); // "student" | "admin"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const switchPortal = (p) => { setPortal(p); setErr(""); setUsername(""); setPassword(""); };

  const submit = () => {
    const uname = username.trim();
    if (!uname || !password) { setErr("Enter both a username and password."); return; }
    const user = db.users.find((u) => u.username.toLowerCase() === uname.toLowerCase() && u.password === password);
    if (!user) { setErr("Incorrect username or password."); return; }
    if (user.status === "Disabled") { setErr("This account has been disabled. Contact your Admin."); return; }
    const isAdminAccount = user.role === "Admin";
    if (portal === "admin" && !isAdminAccount) { setErr("That account isn't an Admin account. Use the Student / Team login instead."); return; }
    if (portal === "student" && isAdminAccount) { setErr("That's an Admin account. Use the Admin login instead."); return; }
    setErr("");
    onLogin(user);
  };

  const onKeyDown = (e) => { if (e.key === "Enter") submit(); };

  return (
    <div className="min-h-full w-full flex items-center justify-center p-6" style={{ background: `linear-gradient(160deg, ${COLORS.ink} 0%, #120F45 60%, #1E1A5C 100%)` }}>
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
        <div className="hidden md:flex flex-col justify-between p-10" style={{ background: `linear-gradient(160deg, #2A2478, #14113F)` }}>
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white">
              <img src={LOGO_DATA_URI} alt="SkillArion Development" className="w-6 h-6 object-contain" />
            </div>
            <div className="leading-tight">
              <span className="font-semibold tracking-wide text-sm block">SkillArion Development</span>
              <span className="text-[10px] block" style={{ color: COLORS.amber }}>Bridging Academia to Industry Excellence</span>
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: COLORS.amber }}>Day-90 Certification Track</p>
            <h1 className="text-3xl font-bold text-white leading-tight mb-3">One check-in a day.<br />One certificate at the end.</h1>
            <p className="text-sm max-w-sm" style={{ color: "#AEB9CE" }}>Attendance, tasks and Business Development uploads — tracked from the day you join to the day you're certified.</p>
          </div>
          <p className="text-xs" style={{ color: "#6E7C97" }}>Accounts are issued by your Admin — there is no self-signup.</p>
        </div>
        <div className="bg-white p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2.5 mb-6 md:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: COLORS.bg }}>
              <img src={LOGO_DATA_URI} alt="SkillArion Development" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-semibold text-sm" style={{ color: COLORS.ink }}>SkillArion Development</span>
          </div>
          <h2 className="text-xl font-bold mb-1" style={{ color: COLORS.ink }}>Sign in</h2>
          <p className="text-sm mb-5" style={{ color: COLORS.slate }}>Choose your login, then enter the credentials your Admin gave you.</p>

          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl mb-5" style={{ background: COLORS.bg }}>
            <button type="button" onClick={() => switchPortal("student")}
              className="py-2 rounded-lg text-sm font-semibold transition"
              style={{ background: portal === "student" ? "#fff" : "transparent", color: portal === "student" ? COLORS.ink : COLORS.slateLight, boxShadow: portal === "student" ? "0 1px 3px rgba(30,26,92,0.12)" : "none" }}>
              Student / Team Login
            </button>
            <button type="button" onClick={() => switchPortal("admin")}
              className="py-2 rounded-lg text-sm font-semibold transition"
              style={{ background: portal === "admin" ? "#fff" : "transparent", color: portal === "admin" ? COLORS.ink : COLORS.slateLight, boxShadow: portal === "admin" ? "0 1px 3px rgba(30,26,92,0.12)" : "none" }}>
              Admin Login
            </button>
          </div>

          <div onKeyDown={onKeyDown}>
            <Field label="Username">
              <TextInput autoFocus value={username} onChange={(e) => setUsername(e.target.value)} placeholder={portal === "admin" ? "admin" : "e.g. student"} />
            </Field>
            <Field label="Password">
              <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </Field>
            {err && <p className="text-sm mb-3 flex items-center gap-1.5" style={{ color: COLORS.red }}><AlertTriangle size={14} />{err}</p>}
            <Btn onClick={submit} className="w-full justify-center mt-1">Sign in</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== APP SHELL ============================== */

const ADMIN_NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "insights", label: "Insights", icon: TrendingUp },
  { id: "users", label: "Interns", icon: Users },
  { id: "employees", label: "Employees", icon: Briefcase },
  { id: "attendance", label: "Attendance", icon: Clock },
  { id: "worklog", label: "Daily Work Log", icon: Camera },
  { id: "tasks", label: "Task Review", icon: ClipboardList },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "leave", label: "Leave", icon: CalendarX },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "bd", label: "Business Development", icon: Briefcase },
  { id: "certifications", label: "Internship Progress", icon: Award },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "auditlog", label: "Audit Log", icon: History },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const USER_NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "insights", label: "My Insights", icon: TrendingUp },
  { id: "attendance", label: "My Attendance", icon: Clock },
  { id: "worklog", label: "Daily Work Log", icon: Camera },
  { id: "tasks", label: "My Tasks", icon: ClipboardList },
  { id: "projects", label: "My Projects", icon: FolderKanban },
  { id: "leave", label: "Leave", icon: CalendarX },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "bd", label: "Business Development", icon: Briefcase },
  { id: "certifications", label: "My Progress", icon: Award },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function Sidebar({ nav, active, setActive, user, onLogout, unread, unreadAnnouncements }) {
  return (
    <div className="w-60 shrink-0 h-full flex flex-col text-white" style={{ background: COLORS.ink }}>
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white">
          <img src={LOGO_DATA_URI} alt="SkillArion Development" className="w-5 h-5 object-contain" />
        </div>
        <div className="leading-tight min-w-0">
          <span className="font-semibold tracking-wide text-sm block truncate">SkillArion Development</span>
          <span className="text-[9px] block truncate" style={{ color: COLORS.amber }}>Bridging Academia to Industry</span>
        </div>
      </div>
      <div className="px-5 py-3 mb-2">
        <p className="text-sm font-semibold truncate">{user.name}</p>
        <p className="text-[11px] truncate" style={{ color: "#8592AC" }}>{roleLabel(user.role)}{user.department ? ` · ${user.department}` : ""}</p>
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {nav.map((n) => {
          const Icon = n.icon;
          const isActive = active === n.id;
          const badgeCount = n.id === "notifications" ? unread : n.id === "announcements" ? unreadAnnouncements : 0;
          return (
            <button key={n.id} onClick={() => setActive(n.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition relative"
              style={{ background: isActive ? "rgba(255,255,255,0.09)" : "transparent", color: isActive ? "#fff" : "#AEB9CE", fontWeight: isActive ? 600 : 500 }}>
              <Icon size={16} />
              {n.label}
              {badgeCount > 0 && (
                <span className="ml-auto text-[10px] font-bold rounded-full px-1.5 py-0.5" style={{ background: COLORS.amber, color: COLORS.ink }}>{badgeCount}</span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm" style={{ color: "#AEB9CE" }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}

function PageHeader({ title, sub, right }) {
  return (
    <div className="flex items-start justify-between mb-5 gap-3 flex-wrap">
      <div>
        <h1 className="text-xl font-bold" style={{ color: COLORS.ink }}>{title}</h1>
        {sub && <p className="text-sm mt-0.5" style={{ color: COLORS.slate }}>{sub}</p>}
      </div>
      {right && <div className="flex items-center gap-2 flex-wrap">{right}</div>}
    </div>
  );
}

/* ============================== ADMIN: DASHBOARD ============================== */

function AdminDashboard({ db }) {
  const users = db.users;
  const today = todayStr();
  const presentToday = db.attendance.filter((a) => a.date === today && a.status === "Working").length;
  const checkedIn = db.attendance.filter((a) => a.date === today && a.checkIn && !a.checkOut).length;
  const checkedOut = db.attendance.filter((a) => a.date === today && a.checkOut).length;
  const pendingTasks = db.tasks.filter((t) => t.status === "Pending" || t.status === "In Progress" || t.status === "Submitted").length;
  const completedTasks = db.tasks.filter((t) => t.status === "Approved").length;
  const eligibleCount = users.filter((u) => u.role !== "Admin" && certProgressFor(db, u.id)?.status !== "Not Eligible").length;

  const last7 = [...Array(7)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().slice(0, 10);
    const present = db.attendance.filter((a) => a.date === ds && a.status === "Working").length;
    return { day: d.toLocaleDateString("en-US", { weekday: "short" }), Working: present };
  });

  const taskPie = [
    { name: "Pending", value: db.tasks.filter((t) => t.status === "Pending").length, color: COLORS.slateLight },
    { name: "In Progress", value: db.tasks.filter((t) => t.status === "In Progress").length, color: COLORS.blue },
    { name: "Submitted", value: db.tasks.filter((t) => t.status === "Submitted").length, color: COLORS.amber },
    { name: "Approved", value: db.tasks.filter((t) => t.status === "Approved").length, color: COLORS.emerald },
    { name: "Changes Requested", value: db.tasks.filter((t) => t.status === "Changes Requested").length, color: COLORS.red },
  ].filter((d) => d.value > 0);

  const certBar = users.filter((u) => u.role !== "Admin").slice(0, 8).map((u) => ({
    name: u.name.split(" ")[0], pct: certProgressFor(db, u.id)?.progressPct || 0,
  }));

  return (
    <div>
      <PageHeader title="Dashboard" sub={`Welcome back — here's where things stand today, ${fmtDate(today)}.`} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard label="Total Users" value={users.length} icon={Users} />
        <StatCard label="Active Users" value={users.filter((u) => u.status === "Active").length} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Working Today" value={presentToday} icon={Clock} tone="blue" />
        <StatCard label="Checked In Now" value={checkedIn} icon={Clock3} tone="amber" />
        <StatCard label="Checked Out Today" value={checkedOut} icon={CheckCircle2} tone="ink" />
        <StatCard label="Pending Tasks" value={pendingTasks} icon={ClipboardList} tone="amber" />
        <StatCard label="Completed Tasks" value={completedTasks} icon={Check} tone="emerald" />
        <StatCard label="Cert. Eligible" value={eligibleCount} icon={Award} tone="emerald" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-4 lg:col-span-2">
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.ink }}>Attendance trend — last 7 days</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last7}>
                <CartesianGrid stroke={COLORS.border} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.border}`, fontSize: 12 }} />
                <Line type="monotone" dataKey="Working" stroke={COLORS.blue} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.ink }}>Task status split</p>
          <div style={{ height: 220 }}>
            {taskPie.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={taskPie} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                    {taskPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.border}`, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <EmptyState title="No tasks yet" icon={ClipboardList} />}
          </div>
        </Card>
        <Card className="p-4 lg:col-span-3">
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.ink }}>90-day certification progress by user</p>
          <div style={{ height: 220 }}>
            {certBar.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={certBar}>
                  <CartesianGrid stroke={COLORS.border} vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.border}`, fontSize: 12 }} />
                  <Bar dataKey="pct" fill={COLORS.amber} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <EmptyState title="No interns/employees yet" icon={Award} />}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================== ADMIN: INSIGHTS ============================== */

function AdminInsights({ db }) {
  const last7 = [...Array(7)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().slice(0, 10);
    const present = db.attendance.filter((a) => a.date === ds && a.status === "Working").length;
    const absent = db.attendance.filter((a) => a.date === ds && a.status === "Inactive").length;
    return { day: d.toLocaleDateString("en-US", { weekday: "short" }), Working: present, Inactive: absent };
  });

  const projectPerf = db.projects.map((p) => {
    const tasks = db.tasks.filter((t) => t.projectId === p.id);
    const approved = tasks.filter((t) => t.status === "Approved").length;
    const completion = tasks.length ? clampPct((approved / tasks.length) * 100) : 0;
    return { name: p.name.length > 14 ? p.name.slice(0, 13) + "…" : p.name, completion, tasksCount: tasks.length };
  });

  return (
    <div>
      <PageHeader title="Insights" sub="How attendance is trending and how each project is progressing." />
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.ink }}>Attendance — last 7 days</p>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7}>
                <CartesianGrid stroke={COLORS.border} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.border}`, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Working" fill={COLORS.emerald} radius={[6, 6, 0, 0]} />
                <Bar dataKey="Inactive" fill={COLORS.red} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.ink }}>Project performance — task completion rate</p>
          <div style={{ height: 260 }}>
            {projectPerf.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectPerf}>
                  <CartesianGrid stroke={COLORS.border} vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: COLORS.slate }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.border}`, fontSize: 12 }}
                    formatter={(value, key, entry) => [`${value}% (${entry.payload.tasksCount} task${entry.payload.tasksCount !== 1 ? "s" : ""})`, "Completion"]} />
                  <Bar dataKey="completion" fill={COLORS.amber} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <EmptyState title="No projects yet" icon={FolderKanban} />}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================== ADMIN: USERS ============================== */

function UserFormModal({ onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || {
    name: "", email: "", phone: "", role: "Intern/Employee", department: "", domain: DOMAINS[0],
    joiningDate: todayStr(), endDate: "", username: "", password: "", status: "Active", bdAccess: false,
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSave = form.name && form.username && (initial ? true : form.password) && form.email &&
    (form.role !== "Employee" || form.endDate);
  return (
    <Modal title={initial ? "Edit Person" : "Add Person"} onClose={onClose} wide>
      <div className="grid md:grid-cols-2 gap-x-4">
        <Field label="Full name"><TextInput value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jordan Reyes" /></Field>
        <Field label="Email"><TextInput type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jordan@company.com" /></Field>
        <Field label="Phone"><TextInput value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 010 2200" /></Field>
        <Field label="Role">
          <Select value={form.role} onChange={(e) => set("role", e.target.value)}>
            <option value="Intern/Employee">Intern</option>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </Select>
        </Field>
        <Field label="Department"><TextInput value={form.department} onChange={(e) => set("department", e.target.value)} placeholder="Engineering" /></Field>
        <Field label="Domain">
          <Select value={form.domain || DOMAINS[0]} onChange={(e) => set("domain", e.target.value)}>
            {DOMAINS.map((d) => <option key={d}>{d}</option>)}
          </Select>
        </Field>
        <Field label="Joining date"><TextInput type="date" value={form.joiningDate} onChange={(e) => set("joiningDate", e.target.value)} /></Field>
        {form.role === "Employee" && <Field label="Employment end date"><TextInput type="date" value={form.endDate || ""} min={form.joiningDate} onChange={(e) => set("endDate", e.target.value)} /></Field>}
        <Field label="Username"><TextInput value={form.username} onChange={(e) => set("username", e.target.value)} placeholder="j.reyes" /></Field>
        <Field label={initial ? "Password (leave blank to keep)" : "Password"}><TextInput type="text" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Temporary password" /></Field>
        <Field label="Status">
          <Select value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option>Active</option>
            <option>Disabled</option>
          </Select>
        </Field>
      </div>
      {form.role !== "Admin" && (
        <div className="mt-1 mb-3 p-3 rounded-lg" style={{ background: COLORS.bg }}>
          <Switch checked={!!form.bdAccess} onChange={(v) => set("bdAccess", v)}
            label="Business Development access" sub="Only interns with this switched on can see the Business Development section." />
        </div>
      )}
      <div className="flex justify-end gap-2 mt-2">
        <Btn variant="outline" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!canSave} onClick={() => onSave(form)}>{initial ? "Save changes" : "Create account"}</Btn>
      </div>
    </Modal>
  );
}

function AdminUsers({ db, update, push, personType = "Interns" }) {
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState(personType === "Employees" ? "Employee" : "Intern/Employee");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detail, setDetail] = useState(null);

  const list = db.users.filter((u) =>
    (personType === "Employees" ? u.role === "Employee" : u.role === "Intern/Employee") &&
    (roleFilter === "All" || u.role === roleFilter) &&
    (u.name.toLowerCase().includes(q.toLowerCase()) || u.username.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))
  );

  const usernameTaken = (uname, ignoreId) => db.users.some((u) => u.username.toLowerCase() === uname.toLowerCase() && u.id !== ignoreId);

  const createUser = (form) => {
    if (usernameTaken(form.username)) { push("That username is already in use.", "error"); return; }
    update((d) => {
      const newUser = { id: uid("u"), ...form };
      d.users.push(newUser);
      addNotification(d, { userId: newUser.id, message: `Welcome — your account has been created by Admin.`, type: "account" });
      addAudit(d, { actorName: "Admin", action: "INTERN_CREATED", entityType: "User", entityLabel: newUser.name });
      return d;
    });
    push("Account created.");
    setShowForm(false);
  };

  const saveEdit = (form) => {
    if (usernameTaken(form.username, editing.id)) { push("That username is already in use.", "error"); return; }
    update((d) => {
      const idx = d.users.findIndex((u) => u.id === editing.id);
      d.users[idx] = { ...d.users[idx], ...form, password: form.password ? form.password : d.users[idx].password };
      addAudit(d, { actorName: "Admin", action: "INTERN_UPDATED", entityType: "User", entityLabel: d.users[idx].name });
      return d;
    });
    push("User updated.");
    setEditing(null);
  };

  const toggleStatus = (u) => {
    update((d) => {
      const idx = d.users.findIndex((x) => x.id === u.id);
      d.users[idx].status = d.users[idx].status === "Active" ? "Disabled" : "Active";
      addAudit(d, { actorName: "Admin", action: d.users[idx].status === "Disabled" ? "INTERN_DEACTIVATED" : "INTERN_REACTIVATED", entityType: "User", entityLabel: d.users[idx].name });
      return d;
    });
    push(u.status === "Active" ? "User disabled." : "User re-activated.");
  };

  const removeUser = (u) => {
    if (!confirm(`Delete ${u.name}? This removes their account permanently.`)) return;
    update((d) => { d.users = d.users.filter((x) => x.id !== u.id); addAudit(d, { actorName: "Admin", action: "INTERN_DELETED", entityType: "User", entityLabel: u.name }); return d; });
    push("User deleted.");
  };

  if (detail) return <AdminUserDetail db={db} user={detail} onBack={() => setDetail(null)} />;

  return (
    <div>
      <PageHeader title={personType} sub="Every account is created and managed here — there is no public sign-up."
        right={<Btn icon={Plus} onClick={() => setShowForm(true)}>Add Person</Btn>} />
      <Card className="p-3 mb-4 flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2" color={COLORS.slateLight} />
          <TextInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, username, email…" style={{ paddingLeft: 30 }} />
        </div>
        <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-44">
          <option value={personType === "Employees" ? "Employee" : "Intern/Employee"}>{personType === "Employees" ? "Employee" : "Intern"}</option>
        </Select>
      </Card>
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b" style={{ borderColor: COLORS.border }}>
              {["Name", "Role", "Department", "Joined", "BD Access", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: COLORS.slateLight }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id} className="border-b last:border-0 hover:bg-slate-50" style={{ borderColor: COLORS.border }}>
                <td className="px-4 py-3 cursor-pointer" onClick={() => setDetail(u)}>
                  <p className="font-medium" style={{ color: COLORS.ink }}>{u.name}</p>
                  <p className="text-xs" style={{ color: COLORS.slateLight }}>@{u.username} · {u.email}</p>
                </td>
                <td className="px-4 py-3">{roleLabel(u.role)}</td>
                <td className="px-4 py-3">{u.department || "—"}</td>
                <td className="px-4 py-3">{fmtDate(u.joiningDate)}</td>
                <td className="px-4 py-3">{u.role === "Admin" ? <span style={{ color: COLORS.slateLight }}>—</span> : <Badge tone={u.bdAccess ? "emerald" : "slate"}>{u.bdAccess ? "Yes" : "No"}</Badge>}</td>
                <td className="px-4 py-3"><Badge tone={statusTone(u.status)}>{u.status}</Badge></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => setEditing(u)} className="p-1.5 rounded-lg hover:bg-slate-100" title="Edit"><Pencil size={14} color={COLORS.slate} /></button>
                    <button onClick={() => toggleStatus(u)} className="p-1.5 rounded-lg hover:bg-slate-100" title="Disable/enable">{u.status === "Active" ? <Ban size={14} color={COLORS.amber} /> : <Check size={14} color={COLORS.emerald} />}</button>
                    <button onClick={() => removeUser(u)} className="p-1.5 rounded-lg hover:bg-slate-100" title="Delete"><Trash2 size={14} color={COLORS.red} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && <EmptyState title="No users found" sub="Try a different search or add a new person." icon={Users} />}
      </Card>
      {showForm && <UserFormModal onClose={() => setShowForm(false)} onSave={createUser} />}
      {editing && <UserFormModal initial={{ ...editing, password: "" }} onClose={() => setEditing(null)} onSave={saveEdit} />}
    </div>
  );
}

function AdminUserDetail({ db, user, onBack }) {
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Attendance", "Tasks", "Projects", "Progress"];
  const cert = certProgressFor(db, user.id);
  const myAttendance = db.attendance.filter((a) => a.userId === user.id).sort((a, b) => b.date.localeCompare(a.date));
  const myTasks = db.tasks.filter((t) => t.internId === user.id).sort((a, b) => b.date.localeCompare(a.date));
  const myProjects = db.projects.filter((p) => (p.internIds || []).includes(user.id));
  const totalHours = myAttendance.reduce((sum, a) => {
    if (!a.checkIn || !a.checkOut) return sum;
    return sum + (new Date(a.checkOut) - new Date(a.checkIn));
  }, 0);
  const totalHoursStr = `${Math.floor(totalHours / 3600000)}h ${Math.floor((totalHours % 3600000) / 60000)}m`;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm mb-4 font-medium" style={{ color: COLORS.slate }}><ArrowLeft size={15} /> Back to people</button>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: COLORS.ink }}>{user.name[0]}</div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: COLORS.ink }}>{user.name}</h1>
          <p className="text-sm" style={{ color: COLORS.slate }}>{roleLabel(user.role)} · {user.domain || user.department || "—"} · joined {fmtDate(user.joiningDate)}</p>
        </div>
        <Badge tone={statusTone(user.status)}>{user.status}</Badge>
      </div>
      <div className="flex gap-1 mb-5 border-b" style={{ borderColor: COLORS.border }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="px-3 py-2 text-sm font-medium relative -mb-px"
            style={{ color: tab === t ? COLORS.ink : COLORS.slateLight, borderBottom: tab === t ? `2px solid ${COLORS.ink}` : "2px solid transparent" }}>{t}</button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid md:grid-cols-4 gap-3">
          <StatCard label="Attendance %" value={`${cert?.attendancePct ?? 0}%`} icon={Clock} />
          <StatCard label="Total working hours" value={totalHoursStr} icon={Clock3} />
          <StatCard label="Tasks approved" value={`${cert?.tasksCompleted ?? 0}`} icon={Check} tone="emerald" />
          <StatCard label={isEmployee(user) ? "Employment progress" : "Internship progress"} value={`${cert?.progressPct ?? 0}%`} icon={Award} tone="amber" />
        </div>
      )}
      {tab === "Attendance" && (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b" style={{ borderColor: COLORS.border }}>{["Date", "Check In", "Check Out", "Hours", "Status"].map(h => <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase" style={{ color: COLORS.slateLight }}>{h}</th>)}</tr></thead>
            <tbody>{myAttendance.map((a) => (
              <tr key={a.id} className="border-b last:border-0" style={{ borderColor: COLORS.border }}>
                <td className="px-4 py-3">{fmtDate(a.date)}</td>
                <td className="px-4 py-3">{fmtTime(a.checkIn)}</td>
                <td className="px-4 py-3">{fmtTime(a.checkOut)}</td>
                <td className="px-4 py-3">{computeWorkingHours(a.checkIn, a.checkOut) || "—"}</td>
                <td className="px-4 py-3"><Badge tone={statusTone(a.status)}>{a.status}</Badge></td>
              </tr>
            ))}</tbody>
          </table>
          {!myAttendance.length && <EmptyState title="No attendance recorded yet" icon={Clock} />}
        </Card>
      )}
      {tab === "Tasks" && (
        <div className="grid gap-2">
          {myTasks.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm" style={{ color: COLORS.ink }}>{t.title}</p>
                <Badge tone={statusTone(t.status)}>{t.status}</Badge>
              </div>
              <p className="text-xs" style={{ color: COLORS.slateLight }}>{fmtDate(t.date)}</p>
              {t.description && <p className="text-xs mt-1" style={{ color: COLORS.slate }}>{t.description}</p>}
            </Card>
          ))}
          {!myTasks.length && <EmptyState title="No tasks logged" icon={ClipboardList} />}
        </div>
      )}
      {tab === "Projects" && (
        <div className="grid gap-2">
          {myProjects.map((p) => (
            <Card key={p.id} className="p-4 flex items-center justify-between">
              <div><p className="font-medium text-sm" style={{ color: COLORS.ink }}>{p.name}</p><p className="text-xs" style={{ color: COLORS.slateLight }}>{p.domain}</p></div>
              <Badge tone={p.status === "Active" ? "blue" : p.status === "Completed" ? "emerald" : "slate"}>{p.status}</Badge>
            </Card>
          ))}
          {!myProjects.length && <EmptyState title="Not assigned to any project" icon={FolderKanban} />}
        </div>
      )}
      {tab === "Progress" && cert && (
        <Card className="p-5 max-w-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>Day {cert.dayNumber} / {cert.requiredDays}</p>
            <Badge tone={statusTone(cert.status)}>{cert.status}</Badge>
          </div>
          <ProgressBar pct={cert.progressPct} tone="amber" />
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div><p style={{ color: COLORS.slateLight }} className="text-xs">Days remaining</p><p className="font-semibold">{cert.daysRemaining}</p></div>
            <div><p style={{ color: COLORS.slateLight }} className="text-xs">Attendance</p><p className="font-semibold">{cert.attendancePct}%</p></div>
            <div><p style={{ color: COLORS.slateLight }} className="text-xs">Tasks approved</p><p className="font-semibold">{cert.tasksCompleted} / {cert.requiredTasks}</p></div>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ============================== ADMIN: ATTENDANCE ============================== */

function AdminAttendance({ db, update, push }) {
  const [userFilter, setUserFilter] = useState("All");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("All");

  const rows = db.attendance
    .filter((a) => userFilter === "All" || a.userId === userFilter)
    .filter((a) => !month || a.date.startsWith(month))
    .filter((a) => status === "All" || a.status === status)
    .sort((a, b) => b.date.localeCompare(a.date));

  const corrections = (db.attendanceCorrections || []).filter((c) => c.status === "Pending");

  const decideCorrection = (corr, decision) => {
    update((d) => {
      const c = d.attendanceCorrections.find((x) => x.id === corr.id);
      c.status = decision;
      if (decision === "Approved") {
        const att = d.attendance.find((a) => a.id === corr.attendanceId);
        if (att) att.status = corr.requestedStatus;
      }
      addNotification(d, { userId: corr.userId, message: `Your attendance correction request for ${fmtDate(corr.date)} was ${decision.toLowerCase()}.`, type: "attendance" });
      addAudit(d, { actorName: "Admin", action: decision === "Approved" ? "CORRECTION_APPROVED" : "CORRECTION_REJECTED", entityType: "Attendance", entityLabel: `${db.users.find(u => u.id === corr.userId)?.name} — ${corr.date}` });
      return d;
    });
    push(`Correction ${decision.toLowerCase()}.`);
  };

  const exportCsv = () => {
    const header = "User,Date,Check In,Check Out,Working Hours,Status\n";
    const body = rows.map((r) => {
      const u = db.users.find((x) => x.id === r.userId);
      return [u?.name || "—", r.date, fmtTime(r.checkIn), fmtTime(r.checkOut), computeWorkingHours(r.checkIn, r.checkOut) || "", r.status].join(",");
    }).join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "attendance_report.csv"; a.click();
  };

  return (
    <div>
      <PageHeader title="Attendance" sub="Full attendance history across every user. Records cannot be edited directly — only via correction requests." right={<Btn icon={Download} variant="outline" onClick={exportCsv}>Export CSV</Btn>} />

      {corrections.length > 0 && (
        <Card className="p-4 mb-4">
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.ink }}>Pending correction requests</p>
          <div className="grid gap-2">
            {corrections.map((c) => {
              const u = db.users.find((x) => x.id === c.userId);
              return (
                <div key={c.id} className="rounded-xl p-3 flex items-center justify-between gap-3" style={{ background: COLORS.bg }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: COLORS.ink }}>{u?.name} · {fmtDate(c.date)} → requesting <b>{c.requestedStatus}</b></p>
                    <p className="text-xs" style={{ color: COLORS.slate }}>{c.reason}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Btn variant="subtle" onClick={() => decideCorrection(c, "Approved")}>Approve</Btn>
                    <Btn variant="outline" onClick={() => decideCorrection(c, "Rejected")}>Reject</Btn>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Card className="p-3 mb-4 flex flex-wrap gap-2">
        <Select value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="w-48">
          <option value="All">All users</option>
          {db.users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </Select>
        <TextInput type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="w-44" />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-36">
          <option value="All">All status</option><option>Working</option><option>Inactive</option><option>Half-day</option><option>Leave</option>
        </Select>
      </Card>
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b" style={{ borderColor: COLORS.border }}>{["User", "Date", "Check In", "Check Out", "Working Hours", "Status"].map(h => <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase" style={{ color: COLORS.slateLight }}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => {
            const u = db.users.find((x) => x.id === r.userId);
            return (
              <tr key={r.id} className="border-b last:border-0 hover:bg-slate-50" style={{ borderColor: COLORS.border }}>
                <td className="px-4 py-3 font-medium" style={{ color: COLORS.ink }}>{u?.name || "—"}</td>
                <td className="px-4 py-3">{fmtDate(r.date)}</td>
                <td className="px-4 py-3">{fmtTime(r.checkIn)}</td>
                <td className="px-4 py-3">{fmtTime(r.checkOut)}</td>
                <td className="px-4 py-3">{computeWorkingHours(r.checkIn, r.checkOut) || "—"}</td>
                <td className="px-4 py-3"><Badge tone={statusTone(r.status)}>{r.status}</Badge></td>
              </tr>
            );
          })}</tbody>
        </table>
        {!rows.length && <EmptyState title="No attendance records match these filters" icon={Clock} />}
      </Card>
    </div>
  );
}

/* ============================== TASKS (intern creates & logs; admin reviews) ============================== */
// Per spec: interns create their own daily tasks (title, description, priority, date,
// associated project, optional attachment, optional repo link) and submit for review.
// Lifecycle: Pending -> In Progress -> Submitted -> Approved / Changes Requested.

function TaskFormModal({ db, user, onClose, onSave }) {
  const myProjects = db.projects.filter((p) => (p.internIds || []).includes(user.id));
  const [form, setForm] = useState({
    title: "", description: "", priority: "Medium", date: todayStr(),
    projectId: myProjects[0]?.id || "", attachmentName: "", repoLink: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSave = form.title && form.date;

  return (
    <Modal title="Log a Task" onClose={onClose} wide>
      <Field label="Task title"><TextInput autoFocus value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Implement login form validation" /></Field>
      <Field label="Description"><TextArea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="What did / will you work on" /></Field>
      <div className="grid md:grid-cols-2 gap-x-4">
        <Field label="Priority">
          <Select value={form.priority} onChange={(e) => set("priority", e.target.value)}><option>Low</option><option>Medium</option><option>High</option></Select>
        </Field>
        <Field label="Date"><TextInput type="date" value={form.date} onChange={(e) => set("date", e.target.value)} /></Field>
        <Field label="Associated project">
          <Select value={form.projectId} onChange={(e) => set("projectId", e.target.value)}>
            <option value="">— None —</option>
            {myProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </Select>
        </Field>
        <Field label="Repository link (optional)"><TextInput value={form.repoLink} onChange={(e) => set("repoLink", e.target.value)} placeholder="https://github.com/…" /></Field>
      </div>
      <Field label="Attachment (optional)">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm" style={{ borderColor: COLORS.border, color: COLORS.slate }}>
          <Upload size={15} />{form.attachmentName || "Choose a file to attach"}
          <input type="file" className="hidden" onChange={(e) => set("attachmentName", e.target.files?.[0]?.name || "")} />
        </label>
      </Field>
      <div className="flex justify-end gap-2 mt-2">
        <Btn variant="outline" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!canSave} onClick={() => onSave(form)}>Save task</Btn>
      </div>
    </Modal>
  );
}

function AdminTasks({ db, update, push }) {
  const [internFilter, setInternFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [feedbackFor, setFeedbackFor] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const rows = db.tasks
    .filter((t) => internFilter === "All" || t.internId === internFilter)
    .filter((t) => projectFilter === "All" || t.projectId === projectFilter)
    .filter((t) => statusFilter === "All" || t.status === statusFilter)
    .sort((a, b) => b.date.localeCompare(a.date));

  const interns = db.users.filter((u) => u.role !== "Admin");

  const review = (task, decision, feedback) => {
    update((d) => {
      const t = d.tasks.find((x) => x.id === task.id);
      t.status = decision;
      if (feedback) t.adminFeedback = feedback;
      addNotification(d, { userId: task.internId, message: `Your task "${task.title}" was ${decision === "Approved" ? "approved" : "sent back with changes requested"}.`, type: "task" });
      addAudit(d, { actorName: "Admin", action: decision === "Approved" ? "TASK_APPROVED" : "TASK_CHANGES_REQUESTED", entityType: "Task", entityLabel: task.title });
      return d;
    });
    push(decision === "Approved" ? "Task approved." : "Changes requested.");
    setFeedbackFor(null); setFeedbackText("");
  };

  return (
    <div>
      <PageHeader title="Task Review" sub="Daily tasks logged by interns, awaiting your review." />
      <Card className="p-3 mb-4 flex flex-wrap gap-2">
        <Select value={internFilter} onChange={(e) => setInternFilter(e.target.value)} className="w-48">
          <option value="All">All interns</option>
          {interns.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </Select>
        <Select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="w-48">
          <option value="All">All projects</option>
          {db.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-44">
          <option value="All">All status</option>
          <option>Pending</option><option>In Progress</option><option>Submitted</option><option>Approved</option><option>Changes Requested</option>
        </Select>
      </Card>
      <div className="grid gap-3">
        {rows.map((t) => {
          const u = db.users.find((x) => x.id === t.internId);
          const p = db.projects.find((x) => x.id === t.projectId);
          return (
            <Card key={t.id} className="p-4">
              <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>{t.title}</p>
                    <Badge tone={t.priority === "High" ? "red" : t.priority === "Medium" ? "amber" : "slate"}>{t.priority}</Badge>
                  </div>
                  <p className="text-xs" style={{ color: COLORS.slateLight }}>{u?.name} · {fmtDate(t.date)}{p ? ` · ${p.name}` : ""}</p>
                </div>
                <Badge tone={statusTone(t.status)}>{t.status}</Badge>
              </div>
              {t.description && <p className="text-sm mb-1" style={{ color: COLORS.slate }}>{t.description}</p>}
              {t.repoLink && <p className="text-xs mb-1" style={{ color: COLORS.blue }}>{t.repoLink}</p>}
              {t.attachmentName && <p className="text-xs mb-2 flex items-center gap-1" style={{ color: COLORS.slateLight }}><FolderUp size={12} />{t.attachmentName}</p>}
              {t.adminFeedback && <p className="text-xs mb-2 italic" style={{ color: COLORS.slate }}>Feedback: {t.adminFeedback}</p>}
              {t.status === "Submitted" && (
                feedbackFor === t.id ? (
                  <div className="mt-2">
                    <TextArea rows={2} value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="What needs to change?" className="mb-2" />
                    <div className="flex gap-2">
                      <Btn variant="outline" onClick={() => review(t, "Changes Requested", feedbackText)}>Send</Btn>
                      <Btn variant="ghost" onClick={() => { setFeedbackFor(null); setFeedbackText(""); }}>Cancel</Btn>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <Btn variant="subtle" icon={Check} onClick={() => review(t, "Approved")}>Approve</Btn>
                    <Btn variant="outline" icon={X} onClick={() => setFeedbackFor(t.id)}>Request changes</Btn>
                  </div>
                )
              )}
            </Card>
          );
        })}
        {!rows.length && <EmptyState title="No tasks match these filters" sub="Tasks logged by interns will show up here for review." icon={ClipboardList} />}
      </div>
    </div>
  );
}


/* ============================== BUSINESS DEVELOPMENT ============================== */

function BdUploadModal({ onClose, onSave, user }) {
  const [form, setForm] = useState({ title: "", description: "", category: "Document", fileName: "", fileDataUrl: "", fileType: "" });
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadOrEncode(file, "bd");
      setForm((f) => ({ ...f, fileName: file.name, fileType: file.type, fileDataUrl: url }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title="Upload Business Development File" onClose={onClose}>
      <Field label="Title"><TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Q3 Partner Deck" /></Field>
      <Field label="Description"><TextArea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="What is this file, and who it's for" /></Field>
      <Field label="Category">
        <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
          <option>Document</option><option>PDF</option><option>Image</option><option>Presentation</option><option>Excel file</option><option>Report</option><option>Other</option>
        </Select>
      </Field>
      <Field label="Photo / File">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm" style={{ borderColor: COLORS.border, color: COLORS.slate }}>
          {form.fileType?.startsWith("image/") ? <ImageIcon size={15} /> : <Paperclip size={15} />}
          {busy ? "Reading file…" : (form.fileName || "Choose a photo or file to attach")}
          <input type="file" className="hidden" onChange={onFile} accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" />
        </label>
        {form.fileType?.startsWith("image/") && form.fileDataUrl && (
          <img src={form.fileDataUrl} alt="Preview" className="mt-2 rounded-lg max-h-40 object-contain border" style={{ borderColor: COLORS.border }} />
        )}
      </Field>
      <div className="flex justify-end gap-2 mt-2">
        <Btn variant="outline" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!form.title || busy} onClick={() => onSave(form)}>Upload</Btn>
      </div>
    </Modal>
  );
}

function BusinessDevelopment({ db, update, push, user, canManage }) {
  const [showForm, setShowForm] = useState(false);
  const items = db.bdContent.slice().sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));

  const upload = (form) => {
    update((d) => {
      d.bdContent.unshift({ id: uid("bd"), ...form, uploadedBy: user.name, uploadDate: todayStr(), status: "Published" });
      d.users.forEach((u) => { if (u.id !== user.id) addNotification(d, { userId: u.id, message: `New Business Development file: "${form.title}"`, type: "bd" }); });
      return d;
    });
    push("File uploaded.");
    setShowForm(false);
  };

  const remove = (item) => {
    if (!confirm(`Remove "${item.title}"?`)) return;
    update((d) => { d.bdContent = d.bdContent.filter((x) => x.id !== item.id); return d; });
    push("File removed.");
  };

  return (
    <div>
      <PageHeader title="Business Development" sub="Shared documents, decks and reports for the BD function."
        right={canManage && <Btn icon={Upload} onClick={() => setShowForm(true)}>Upload File</Btn>} />
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((it) => (
          <Card key={it.id} className="p-4">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: COLORS.blueBg }}><FolderUp size={16} color={COLORS.blue} /></div>
                <div>
                  <p className="font-medium text-sm" style={{ color: COLORS.ink }}>{it.title}</p>
                  <p className="text-xs" style={{ color: COLORS.slateLight }}>{it.category} · {it.uploadedBy} · {fmtDate(it.uploadDate)}</p>
                </div>
              </div>
              <Badge tone="emerald">{it.status}</Badge>
            </div>
            {it.description && <p className="text-sm mt-2" style={{ color: COLORS.slate }}>{it.description}</p>}
            {it.fileType?.startsWith("image/") && it.fileDataUrl && (
              <img src={it.fileDataUrl} alt={it.fileName} className="mt-3 rounded-lg max-h-48 w-full object-cover border" style={{ borderColor: COLORS.border }} />
            )}
            <div className="flex items-center gap-2 mt-3">
              {it.fileName && <span className="text-xs px-2 py-1 rounded-md" style={{ background: COLORS.bg, color: COLORS.slate }}>{it.fileName}</span>}
              {it.fileDataUrl ? (
                <a href={it.fileDataUrl} download={it.fileName} className="ml-auto">
                  <Btn variant="ghost" icon={Download} className="!px-2">Download</Btn>
                </a>
              ) : (
                <span className="ml-auto text-xs" style={{ color: COLORS.slateLight }}>No file attached</span>
              )}
              {canManage && <button onClick={() => remove(it)} className="p-1.5 rounded-lg hover:bg-slate-100"><Trash2 size={14} color={COLORS.red} /></button>}
            </div>
          </Card>
        ))}
      </div>
      {!items.length && <EmptyState title="No Business Development files yet" sub="Uploaded decks, reports and documents will show up here." icon={Briefcase} />}
      {showForm && <BdUploadModal user={user} onClose={() => setShowForm(false)} onSave={upload} />}
    </div>
  );
}

/* ============================== DAILY WORK LOG ============================== */

function WorkLogFormModal({ onClose, onSave }) {
  const [form, setForm] = useState({ description: "", location: "", photoDataUrl: "", photoType: "" });
  const [busy, setBusy] = useState(false);
  const [locating, setLocating] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadOrEncode(file, "worklog");
      setForm((f) => ({ ...f, photoDataUrl: url, photoType: file.type }));
    } finally {
      setBusy(false);
    }
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { set("location", `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`); setLocating(false); },
      () => { setLocating(false); },
      { timeout: 8000 }
    );
  };

  return (
    <Modal title="Add Daily Work Update" onClose={onClose}>
      <Field label="What did you work on today?">
        <TextArea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe today's work…" />
      </Field>
      <Field label="Location (optional)">
        <div className="flex gap-2">
          <TextInput value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Office, city, or coordinates" />
          <Btn type="button" variant="outline" onClick={useMyLocation} disabled={locating} className="shrink-0">{locating ? "Locating…" : "Use my location"}</Btn>
        </div>
      </Field>
      <Field label="Photo (optional)">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm" style={{ borderColor: COLORS.border, color: COLORS.slate }}>
          <Camera size={15} />
          {busy ? "Reading photo…" : (form.photoDataUrl ? "Photo attached — tap to replace" : "Attach a photo")}
          <input type="file" className="hidden" accept="image/*" onChange={onFile} />
        </label>
        {form.photoDataUrl && (
          <img src={form.photoDataUrl} alt="Preview" className="mt-2 rounded-lg max-h-40 object-contain border" style={{ borderColor: COLORS.border }} />
        )}
      </Field>
      <div className="flex justify-end gap-2 mt-2">
        <Btn variant="outline" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!form.description || busy} onClick={() => onSave(form)}>Post update</Btn>
      </div>
    </Modal>
  );
}

function DailyWorkLog({ db, update, push, user, canManage }) {
  const [showForm, setShowForm] = useState(false);
  const [internFilter, setInternFilter] = useState("All");
  const interns = db.users.filter((u) => u.role !== "Admin");

  const posts = (db.workLogs || [])
    .filter((w) => (canManage && internFilter !== "All" ? w.userId === internFilter : true))
    .slice()
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const addPost = (form) => {
    update((d) => {
      d.workLogs = d.workLogs || [];
      d.workLogs.unshift({ id: uid("wl"), userId: user.id, userName: user.name, date: todayStr(), timestamp: new Date().toISOString(), ...form });
      d.users.filter((u) => u.role === "Admin").forEach((admin) => addNotification(d, { userId: admin.id, message: `${user.name} posted a daily work update.`, type: "worklog" }));
      return d;
    });
    push("Update posted.");
    setShowForm(false);
  };

  const removePost = (post) => {
    if (!confirm("Remove this update?")) return;
    update((d) => { d.workLogs = (d.workLogs || []).filter((w) => w.id !== post.id); return d; });
    push("Update removed.");
  };

  return (
    <div>
      <PageHeader title="Daily Work Log"
        sub={canManage ? "Day-to-day work updates posted by interns — photos, description and location." : "Post what you worked on today — visible to your team and Admin."}
        right={!canManage && <Btn icon={Plus} onClick={() => setShowForm(true)}>Add Update</Btn>} />
      {canManage && (
        <Card className="p-3 mb-4 flex flex-wrap gap-2 items-center">
          <Select value={internFilter} onChange={(e) => setInternFilter(e.target.value)} className="w-56">
            <option value="All">All interns</option>
            {interns.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </Select>
        </Card>
      )}
      <div className="grid md:grid-cols-2 gap-3">
        {posts.map((w) => (
          <Card key={w.id} className="p-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="font-medium text-sm" style={{ color: COLORS.ink }}>{w.userId === user.id ? "You" : w.userName}</p>
                <p className="text-xs" style={{ color: COLORS.slateLight }}>{fmtDate(w.date)} · {new Date(w.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
              {(canManage || w.userId === user.id) && (
                <button onClick={() => removePost(w)} className="p-1.5 rounded-lg hover:bg-slate-100" title="Delete"><Trash2 size={14} color={COLORS.red} /></button>
              )}
            </div>
            <p className="text-sm mt-2 whitespace-pre-wrap" style={{ color: COLORS.slate }}>{w.description}</p>
            {w.photoDataUrl && (
              <img src={w.photoDataUrl} alt="Work update" className="mt-3 rounded-lg max-h-56 w-full object-cover border" style={{ borderColor: COLORS.border }} />
            )}
            {w.location && (
              <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: COLORS.slate }}>
                <MapPin size={13} color={COLORS.blue} /> {w.location}
              </div>
            )}
          </Card>
        ))}
      </div>
      {!posts.length && <EmptyState title="No updates yet" sub={canManage ? "Daily updates interns post will show up here." : "Post your first daily update to get started."} icon={Camera} />}
      {showForm && <WorkLogFormModal onClose={() => setShowForm(false)} onSave={addPost} />}
    </div>
  );
}

/* ============================== PROJECTS ============================== */

function ProjectFormModal({ db, onClose, onSave, initial }) {
  const interns = db.users.filter((u) => u.role !== "Admin" && u.status === "Active");
  const [form, setForm] = useState(initial || {
    name: "", title: "", description: "", domain: DOMAINS[0], startDate: todayStr(), endDate: "",
    status: "Not Started", internIds: [], teamLeadId: "", documentName: "", documentDataUrl: "",
  });
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleIntern = (id) => setForm((f) => {
    const internIds = f.internIds.includes(id) ? f.internIds.filter((x) => x !== id) : [...f.internIds, id];
    // if the team lead gets unassigned from the project, clear the team lead too
    const teamLeadId = internIds.includes(f.teamLeadId) ? f.teamLeadId : "";
    return { ...f, internIds, teamLeadId };
  });
  const canSave = form.name && form.domain && form.startDate;
  const assignedInterns = interns.filter((u) => form.internIds.includes(u.id));

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadOrEncode(file, "projects");
      setForm((f) => ({ ...f, documentName: file.name, documentDataUrl: url }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title={initial ? "Edit Project" : "Create Project"} onClose={onClose} wide>
      <Field label="Project name"><TextInput value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Customer Portal Revamp" /></Field>
      <Field label="Project title"><TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Short headline shown alongside the name" /></Field>
      <Field label="Description"><TextArea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} /></Field>
      <div className="grid md:grid-cols-2 gap-x-4">
        <Field label="Domain">
          <Select value={form.domain} onChange={(e) => set("domain", e.target.value)}>{DOMAINS.map((d) => <option key={d}>{d}</option>)}</Select>
        </Field>
        <Field label="Status">
          <Select value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option>Not Started</option><option>Active</option><option>Completed</option><option>On Hold</option>
          </Select>
        </Field>
        <Field label="Start date"><TextInput type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} /></Field>
        <Field label="End date (optional)"><TextInput type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} /></Field>
      </div>
      <Field label="Assign interns">
        <div className="max-h-40 overflow-y-auto rounded-lg border p-2 space-y-1" style={{ borderColor: COLORS.border }}>
          {interns.map((u) => (
            <label key={u.id} className="flex items-center gap-2 text-sm px-1 py-1 rounded hover:bg-slate-50 cursor-pointer">
              <input type="checkbox" checked={form.internIds.includes(u.id)} onChange={() => toggleIntern(u.id)} />
              {u.name} <span className="text-xs" style={{ color: COLORS.slateLight }}>({u.domain || "—"})</span>
            </label>
          ))}
          {!interns.length && <p className="text-xs px-1 py-1" style={{ color: COLORS.slateLight }}>No active interns yet.</p>}
        </div>
      </Field>
      <Field label="Team lead">
        <Select value={form.teamLeadId || ""} onChange={(e) => set("teamLeadId", e.target.value)} disabled={!assignedInterns.length}>
          <option value="">No team lead</option>
          {assignedInterns.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </Select>
        {!assignedInterns.length && <p className="text-xs mt-1" style={{ color: COLORS.slateLight }}>Assign interns above first, then pick their team lead.</p>}
      </Field>
      <Field label="Project document (optional)">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm" style={{ borderColor: COLORS.border, color: COLORS.slate }}>
          <FileText size={15} />
          {busy ? "Reading file…" : (form.documentName || "Attach a document (PDF, Word, etc.)")}
          <input type="file" className="hidden" onChange={onFile} accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*" />
        </label>
        {form.documentName && (
          <button type="button" className="text-xs mt-1" style={{ color: COLORS.red }}
            onClick={() => setForm((f) => ({ ...f, documentName: "", documentDataUrl: "" }))}>Remove attached document</button>
        )}
      </Field>
      <div className="flex justify-end gap-2 mt-2">
        <Btn variant="outline" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!canSave || busy} onClick={() => onSave(form)}>{initial ? "Save changes" : "Create project"}</Btn>
      </div>
    </Modal>
  );
}

function AdminProjects({ db, update, push }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState("Projects");

  const createProject = (form) => {
    update((d) => {
      const project = { id: uid("proj"), ...form };
      d.projects.push(project);
      form.internIds.forEach((internId) => addNotification(d, { userId: internId, message: `You were added to project "${project.name}".`, type: "project" }));
      addAudit(d, { actorName: "Admin", action: "PROJECT_CREATED", entityType: "Project", entityLabel: project.name });
      return d;
    });
    push("Project created.");
    setShowForm(false);
  };

  const saveEdit = (form) => {
    update((d) => {
      const idx = d.projects.findIndex((p) => p.id === editing.id);
      const prevIds = d.projects[idx].internIds || [];
      d.projects[idx] = { ...d.projects[idx], ...form };
      form.internIds.filter((id) => !prevIds.includes(id)).forEach((internId) => addNotification(d, { userId: internId, message: `You were added to project "${form.name}".`, type: "project" }));
      addAudit(d, { actorName: "Admin", action: "PROJECT_UPDATED", entityType: "Project", entityLabel: form.name });
      return d;
    });
    push("Project updated.");
    setEditing(null);
  };

  const interns = db.users.filter((u) => u.role !== "Admin");
  const analysis = interns.map((u) => {
    const myProjects = db.projects.filter((p) => (p.internIds || []).includes(u.id));
    const myTasks = db.tasks.filter((t) => t.internId === u.id);
    const approved = myTasks.filter((t) => t.status === "Approved").length;
    const inProgress = myTasks.filter((t) => t.status === "Pending" || t.status === "In Progress" || t.status === "Submitted").length;
    const changes = myTasks.filter((t) => t.status === "Changes Requested").length;
    const completion = myTasks.length ? clampPct((approved / myTasks.length) * 100) : 0;
    return { user: u, projects: myProjects, totalTasks: myTasks.length, approved, inProgress, changes, completion };
  });

  return (
    <div>
      <PageHeader title="Projects" sub="Create projects, assign interns, and review what everyone has been working on."
        right={tab === "Projects" && <Btn icon={Plus} onClick={() => setShowForm(true)}>Create Project</Btn>} />

      <div className="flex gap-1 mb-5 border-b" style={{ borderColor: COLORS.border }}>
        {["Projects", "Analysis"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className="px-3 py-2 text-sm font-medium relative -mb-px"
            style={{ color: tab === t ? COLORS.ink : COLORS.slateLight, borderBottom: tab === t ? `2px solid ${COLORS.ink}` : "2px solid transparent" }}>{t}</button>
        ))}
      </div>

      {tab === "Projects" && (
        <div className="grid md:grid-cols-2 gap-3">
          {db.projects.map((p) => {
            const teamLead = p.teamLeadId ? db.users.find((u) => u.id === p.teamLeadId) : null;
            return (
              <Card key={p.id} className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>{p.name}</p>
                    {p.title && <p className="text-xs italic" style={{ color: COLORS.slate }}>{p.title}</p>}
                    <p className="text-xs" style={{ color: COLORS.slateLight }}>{p.domain} · {fmtDate(p.startDate)}{p.endDate ? ` – ${fmtDate(p.endDate)}` : ""}</p>
                  </div>
                  <Badge tone={p.status === "Active" ? "blue" : p.status === "Completed" ? "emerald" : p.status === "On Hold" ? "amber" : "slate"}>{p.status}</Badge>
                </div>
                {p.description && <p className="text-sm mt-2" style={{ color: COLORS.slate }}>{p.description}</p>}
                {teamLead && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: COLORS.slate }}>
                    <UserCog size={13} color={COLORS.blue} /> Team lead: <span className="font-medium">{teamLead.name}</span>
                  </div>
                )}
                <p className="text-xs mt-3" style={{ color: COLORS.slateLight }}>{(p.internIds || []).length} intern{(p.internIds || []).length !== 1 ? "s" : ""} assigned</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(p.internIds || []).map((id) => db.users.find((u) => u.id === id)?.name).filter(Boolean).map((n) => <Badge key={n} tone="ink">{n}</Badge>)}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Btn variant="ghost" icon={Pencil} className="!px-2" onClick={() => setEditing(p)}>Edit</Btn>
                  {p.documentDataUrl && (
                    <a href={p.documentDataUrl} download={p.documentName}>
                      <Btn variant="ghost" icon={Download} className="!px-2">{p.documentName || "Document"}</Btn>
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
          {!db.projects.length && <EmptyState title="No projects yet" sub="Create a project and assign interns to it." icon={FolderKanban} />}
        </div>
      )}

      {tab === "Analysis" && (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b" style={{ borderColor: COLORS.border }}>
                {["Intern", "Projects", "Total Tasks", "Approved", "In Progress", "Changes Requested", "Completion"].map((h) => (
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase" style={{ color: COLORS.slateLight }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {analysis.map((row) => (
                <tr key={row.user.id} className="border-b last:border-0" style={{ borderColor: COLORS.border }}>
                  <td className="px-4 py-3 font-medium" style={{ color: COLORS.ink }}>{row.user.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5 flex-wrap max-w-xs">
                      {row.projects.map((p) => <Badge key={p.id} tone="ink">{p.name}</Badge>)}
                      {!row.projects.length && <span className="text-xs" style={{ color: COLORS.slateLight }}>No projects assigned</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.totalTasks}</td>
                  <td className="px-4 py-3"><Badge tone="emerald">{row.approved}</Badge></td>
                  <td className="px-4 py-3"><Badge tone="amber">{row.inProgress}</Badge></td>
                  <td className="px-4 py-3"><Badge tone="red">{row.changes}</Badge></td>
                  <td className="px-4 py-3 w-40">
                    <div className="flex items-center gap-2">
                      <ProgressBar pct={row.completion} tone="emerald" />
                      <span className="text-xs font-medium shrink-0" style={{ color: COLORS.ink }}>{row.completion}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              {!analysis.length && (
                <tr><td colSpan={7} className="px-4 py-6 text-center text-sm" style={{ color: COLORS.slateLight }}>No interns yet.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      )}

      {showForm && <ProjectFormModal db={db} onClose={() => setShowForm(false)} onSave={createProject} />}
      {editing && <ProjectFormModal db={db} initial={editing} onClose={() => setEditing(null)} onSave={saveEdit} />}
    </div>
  );
}

function UserProjects({ db, user }) {
  const myProjects = db.projects.filter((p) => (p.internIds || []).includes(user.id));
  return (
    <div>
      <PageHeader title="My Projects" sub="Projects you're assigned to. Only Admin can create or edit projects." />
      <div className="grid md:grid-cols-2 gap-3">
        {myProjects.map((p) => {
          const relatedTasks = db.tasks.filter((t) => t.projectId === p.id && t.internId === user.id);
          const teamLead = p.teamLeadId ? db.users.find((u) => u.id === p.teamLeadId) : null;
          return (
            <Card key={p.id} className="p-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>{p.name}</p>
                  {p.title && <p className="text-xs italic" style={{ color: COLORS.slate }}>{p.title}</p>}
                  <p className="text-xs" style={{ color: COLORS.slateLight }}>{p.domain} · {fmtDate(p.startDate)}{p.endDate ? ` – ${fmtDate(p.endDate)}` : ""}</p>
                </div>
                <Badge tone={p.status === "Active" ? "blue" : p.status === "Completed" ? "emerald" : p.status === "On Hold" ? "amber" : "slate"}>{p.status}</Badge>
              </div>
              {p.description && <p className="text-sm mt-2" style={{ color: COLORS.slate }}>{p.description}</p>}
              {teamLead && (
                <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: COLORS.slate }}>
                  <UserCog size={13} color={COLORS.blue} /> Team lead: <span className="font-medium">{teamLead.id === user.id ? "You" : teamLead.name}</span>
                </div>
              )}
              {p.documentDataUrl && (
                <a href={p.documentDataUrl} download={p.documentName} className="inline-block mt-2">
                  <Btn variant="ghost" icon={Download} className="!px-2">{p.documentName || "Project document"}</Btn>
                </a>
              )}
              <p className="text-xs mt-3 font-semibold uppercase tracking-wide" style={{ color: COLORS.slateLight }}>Your tasks on this project</p>
              <div className="mt-1 space-y-1">
                {relatedTasks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between text-sm">
                    <span style={{ color: COLORS.ink }}>{t.title}</span>
                    <Badge tone={statusTone(t.status)}>{t.status}</Badge>
                  </div>
                ))}
                {!relatedTasks.length && <p className="text-xs" style={{ color: COLORS.slateLight }}>No tasks logged for this project yet.</p>}
              </div>
            </Card>
          );
        })}
        {!myProjects.length && <EmptyState title="Not assigned to any project yet" sub="Your Admin will assign you when a project is ready." icon={FolderKanban} />}
      </div>
    </div>
  );
}

/* ============================== LEAVE ============================== */

function LeaveFormModal({ onClose, onSave }) {
  const [form, setForm] = useState({ reason: "", startDate: todayStr(), endDate: todayStr() });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSave = form.reason && form.startDate && form.endDate && form.endDate >= form.startDate;
  return (
    <Modal title="Request Leave" onClose={onClose}>
      <Field label="Reason"><TextArea rows={3} value={form.reason} onChange={(e) => set("reason", e.target.value)} placeholder="Why are you requesting leave?" /></Field>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Start date"><TextInput type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} /></Field>
        <Field label="End date"><TextInput type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} /></Field>
      </div>
      {form.endDate < form.startDate && <p className="text-xs mb-2" style={{ color: COLORS.red }}>End date can't be before the start date.</p>}
      <div className="flex justify-end gap-2 mt-2">
        <Btn variant="outline" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!canSave} onClick={() => onSave(form)}>Submit request</Btn>
      </div>
    </Modal>
  );
}

function AdminLeave({ db, update, push }) {
  const rows = (db.leaveRequests || []).slice().sort((a, b) => b.startDate.localeCompare(a.startDate));
  const decide = (req, decision) => {
    update((d) => {
      d.leaveRequests.find((x) => x.id === req.id).status = decision;
      addNotification(d, { userId: req.internId, message: `Your leave request (${fmtDate(req.startDate)} – ${fmtDate(req.endDate)}) was ${decision.toLowerCase()}.`, type: "leave" });
      addAudit(d, { actorName: "Admin", action: decision === "Approved" ? "LEAVE_APPROVED" : "LEAVE_REJECTED", entityType: "Leave", entityLabel: db.users.find(u => u.id === req.internId)?.name || "" });
      return d;
    });
    push(`Leave ${decision.toLowerCase()}.`);
  };
  return (
    <div>
      <PageHeader title="Leave Requests" sub="Review and decide on time-off requests from interns." />
      <div className="grid gap-3">
        {rows.map((r) => {
          const u = db.users.find((x) => x.id === r.internId);
          return (
            <Card key={r.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>{u?.name}</p>
                  <p className="text-xs" style={{ color: COLORS.slateLight }}>{fmtDate(r.startDate)} – {fmtDate(r.endDate)}</p>
                </div>
                <Badge tone={statusTone(r.status)}>{r.status}</Badge>
              </div>
              <p className="text-sm" style={{ color: COLORS.slate }}>{r.reason}</p>
              {r.status === "Pending" && (
                <div className="flex gap-2 mt-3">
                  <Btn variant="subtle" icon={Check} onClick={() => decide(r, "Approved")}>Approve</Btn>
                  <Btn variant="outline" icon={X} onClick={() => decide(r, "Rejected")}>Reject</Btn>
                </div>
              )}
            </Card>
          );
        })}
        {!rows.length && <EmptyState title="No leave requests" icon={CalendarX} />}
      </div>
    </div>
  );
}

function UserLeave({ db, update, push, user }) {
  const [showForm, setShowForm] = useState(false);
  const mine = (db.leaveRequests || []).filter((r) => r.internId === user.id).sort((a, b) => b.startDate.localeCompare(a.startDate));

  const submit = (form) => {
    update((d) => {
      d.leaveRequests = d.leaveRequests || [];
      d.leaveRequests.push({ id: uid("leave"), internId: user.id, ...form, status: "Pending" });
      d.users.filter((u) => u.role === "Admin").forEach((admin) => addNotification(d, { userId: admin.id, message: `${user.name} requested leave (${fmtDate(form.startDate)} – ${fmtDate(form.endDate)}).`, type: "leave" }));
      return d;
    });
    push("Leave request submitted.");
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader title="Leave" sub="Submit a leave request and track its status." right={<Btn icon={Plus} onClick={() => setShowForm(true)}>Request Leave</Btn>} />
      <div className="grid gap-3">
        {mine.map((r) => (
          <Card key={r.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium" style={{ color: COLORS.ink }}>{fmtDate(r.startDate)} – {fmtDate(r.endDate)}</p>
              <Badge tone={statusTone(r.status)}>{r.status}</Badge>
            </div>
            <p className="text-sm" style={{ color: COLORS.slate }}>{r.reason}</p>
          </Card>
        ))}
        {!mine.length && <EmptyState title="No leave requests yet" icon={CalendarX} />}
      </div>
      {showForm && <LeaveFormModal onClose={() => setShowForm(false)} onSave={submit} />}
    </div>
  );
}

/* ============================== ANNOUNCEMENTS ============================== */

function AnnouncementFormModal({ db, onClose, onSave }) {
  const [form, setForm] = useState({ title: "", body: "", targetScope: "All", targetDomain: DOMAINS[0], targetProjectId: "", mediaUrl: "", mediaType: "", mediaName: "" });
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSave = form.title && form.body && !busy;

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadOrEncode(file, "announcements");
      setForm((f) => ({ ...f, mediaUrl: url, mediaType: file.type, mediaName: file.name }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title="New Announcement" onClose={onClose}>
      <Field label="Title"><TextInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Office closed Friday" /></Field>
      <Field label="Message"><TextArea rows={4} value={form.body} onChange={(e) => set("body", e.target.value)} /></Field>
      <Field label="Media (optional)">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm" style={{ borderColor: COLORS.border, color: COLORS.slate }}>
          {form.mediaType?.startsWith("image/") ? <ImageIcon size={15} /> : <Paperclip size={15} />}
          {busy ? "Uploading…" : (form.mediaName || "Attach a photo or file")}
          <input type="file" className="hidden" onChange={onFile} accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" />
        </label>
        {form.mediaType?.startsWith("image/") && form.mediaUrl && (
          <img src={form.mediaUrl} alt="Preview" className="mt-2 rounded-lg max-h-40 object-contain border" style={{ borderColor: COLORS.border }} />
        )}
      </Field>
      <Field label="Audience">
        <Select value={form.targetScope} onChange={(e) => set("targetScope", e.target.value)}>
          <option value="All">All interns</option>
          <option value="Domain">By domain</option>
          <option value="Project">By project</option>
        </Select>
      </Field>
      {form.targetScope === "Domain" && (
        <Field label="Domain"><Select value={form.targetDomain} onChange={(e) => set("targetDomain", e.target.value)}>{DOMAINS.map((d) => <option key={d}>{d}</option>)}</Select></Field>
      )}
      {form.targetScope === "Project" && (
        <Field label="Project">
          <Select value={form.targetProjectId} onChange={(e) => set("targetProjectId", e.target.value)}>
            <option value="">— Select —</option>
            {db.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </Select>
        </Field>
      )}
      <div className="flex justify-end gap-2 mt-2">
        <Btn variant="outline" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!canSave} onClick={() => onSave(form)}>Publish</Btn>
      </div>
    </Modal>
  );
}

function AdminAnnouncements({ db, update, push }) {
  const [showForm, setShowForm] = useState(false);
  const rows = (db.announcements || []).slice().sort((a, b) => b.createdDate.localeCompare(a.createdDate));

  const publish = (form) => {
    update((d) => {
      const ann = { id: uid("ann"), ...form, createdDate: new Date().toISOString() };
      d.announcements = d.announcements || [];
      d.announcements.unshift(ann);
      const targets = d.users.filter((u) => {
        if (u.role === "Admin") return false;
        if (form.targetScope === "All") return true;
        if (form.targetScope === "Domain") return u.domain === form.targetDomain;
        if (form.targetScope === "Project") return (d.projects.find((p) => p.id === form.targetProjectId)?.internIds || []).includes(u.id);
        return false;
      });
      targets.forEach((u) => addNotification(d, { userId: u.id, message: `Announcement: ${form.title}`, type: "announcement", relatedId: ann.id }));
      addAudit(d, { actorName: "Admin", action: "ANNOUNCEMENT_PUBLISHED", entityType: "Announcement", entityLabel: form.title });
      return d;
    });
    push("Announcement published.");
    setShowForm(false);
  };

  const remove = (a) => {
    if (!confirm(`Delete announcement "${a.title}"?`)) return;
    update((d) => { d.announcements = d.announcements.filter((x) => x.id !== a.id); return d; });
    push("Announcement deleted.");
  };

  return (
    <div>
      <PageHeader title="Announcements" sub="Company-wide or targeted announcements for interns." right={<Btn icon={Plus} onClick={() => setShowForm(true)}>New Announcement</Btn>} />
      <div className="grid gap-3">
        {rows.map((a) => (
          <Card key={a.id} className="p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>{a.title}</p>
              <div className="flex items-center gap-2">
                <Badge tone="ink">{a.targetScope === "All" ? "All interns" : a.targetScope === "Domain" ? a.targetDomain : db.projects.find(p => p.id === a.targetProjectId)?.name || "Project"}</Badge>
                <button onClick={() => remove(a)} className="p-1 rounded hover:bg-slate-100"><Trash2 size={13} color={COLORS.red} /></button>
              </div>
            </div>
            <p className="text-sm" style={{ color: COLORS.slate }}>{a.body}</p>
            {a.mediaType?.startsWith("image/") && a.mediaUrl && (
              <img src={a.mediaUrl} alt={a.mediaName} className="mt-3 rounded-lg max-h-56 w-full object-cover border" style={{ borderColor: COLORS.border }} />
            )}
            {a.mediaUrl && !a.mediaType?.startsWith("image/") && (
              <a href={a.mediaUrl} download={a.mediaName} className="inline-block mt-2">
                <Btn variant="ghost" icon={Download} className="!px-2">{a.mediaName || "Attachment"}</Btn>
              </a>
            )}
            <p className="text-xs mt-2" style={{ color: COLORS.slateLight }}>{new Date(a.createdDate).toLocaleString()}</p>
          </Card>
        ))}
        {!rows.length && <EmptyState title="No announcements yet" icon={Megaphone} />}
      </div>
      {showForm && <AnnouncementFormModal db={db} onClose={() => setShowForm(false)} onSave={publish} />}
    </div>
  );
}

function UserAnnouncements({ db, update, user }) {
  const rows = (db.announcements || []).filter((a) => {
    if (a.targetScope === "All") return true;
    if (a.targetScope === "Domain") return user.domain === a.targetDomain;
    if (a.targetScope === "Project") return (db.projects.find((p) => p.id === a.targetProjectId)?.internIds || []).includes(user.id);
    return false;
  }).sort((a, b) => b.createdDate.localeCompare(a.createdDate));

  const unreadIds = new Set(
    db.notifications.filter((n) => n.userId === user.id && n.type === "announcement" && !n.read).map((n) => n.relatedId)
  );

  useEffect(() => {
    if (db.notifications.some((n) => n.userId === user.id && n.type === "announcement" && !n.read)) {
      update((d) => {
        d.notifications.filter((n) => n.userId === user.id && n.type === "announcement").forEach((n) => (n.read = true));
        return d;
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <PageHeader title="Announcements" sub="Published by Admin — including ones targeted to your project or domain." />
      <div className="grid gap-3">
        {rows.map((a) => (
          <Card key={a.id} className="p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>{a.title}</p>
              {unreadIds.has(a.id) && <Badge tone="amber">New</Badge>}
            </div>
            <p className="text-sm" style={{ color: COLORS.slate }}>{a.body}</p>
            {a.mediaType?.startsWith("image/") && a.mediaUrl && (
              <img src={a.mediaUrl} alt={a.mediaName} className="mt-3 rounded-lg max-h-56 w-full object-cover border" style={{ borderColor: COLORS.border }} />
            )}
            {a.mediaUrl && !a.mediaType?.startsWith("image/") && (
              <a href={a.mediaUrl} download={a.mediaName} className="inline-block mt-2">
                <Btn variant="ghost" icon={Download} className="!px-2">{a.mediaName || "Attachment"}</Btn>
              </a>
            )}
            <p className="text-xs mt-2" style={{ color: COLORS.slateLight }}>{new Date(a.createdDate).toLocaleString()}</p>
          </Card>
        ))}
        {!rows.length && <EmptyState title="No announcements yet" icon={Megaphone} />}
      </div>
    </div>
  );
}

/* ============================== AUDIT LOG ============================== */

function AdminAuditLog({ db }) {
  const rows = (db.auditLog || []).slice(0, 200);
  return (
    <div>
      <PageHeader title="Audit Log" sub="A record of key administrative actions, most recent first." />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b" style={{ borderColor: COLORS.border }}>{["When", "Actor", "Action", "Entity"].map(h => <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase" style={{ color: COLORS.slateLight }}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0" style={{ borderColor: COLORS.border }}>
              <td className="px-4 py-3 whitespace-nowrap">{new Date(r.timestamp).toLocaleString()}</td>
              <td className="px-4 py-3">{r.actorName}</td>
              <td className="px-4 py-3"><Badge tone="ink">{r.action}</Badge></td>
              <td className="px-4 py-3">{r.entityType}: {r.entityLabel}</td>
            </tr>
          ))}</tbody>
        </table>
        {!rows.length && <EmptyState title="No audit entries yet" icon={History} />}
      </Card>
    </div>
  );
}

/* ============================== CERTIFICATIONS ============================== */

function AdminCertifications({ db, update, push }) {
  const eligibleUsers = db.users.filter((u) => isIntern(u));
  const issue = (u) => {
    update((d) => {
      d.certIssued = d.certIssued || [];
      d.certIssued.push({ userId: u.id, issuedDate: todayStr(), certId: `CERT-${u.id.slice(-5).toUpperCase()}-${new Date().getFullYear()}`, status: "Issued" });
      addNotification(d, { userId: u.id, message: `🎉 Your certificate has been issued!`, type: "certification" });
      return d;
    });
    push("Certificate issued.");
  };
  return (
    <div>
      <PageHeader title="Internship Certifications" sub="90-day program progress and certification eligibility for interns." />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b" style={{ borderColor: COLORS.border }}>{["User", "Joining Date", "Days Completed", "Attendance %", "Status", ""].map(h => <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase" style={{ color: COLORS.slateLight }}>{h}</th>)}</tr></thead>
          <tbody>
            {eligibleUsers.map((u) => {
              const c = certProgressFor(db, u.id);
              return (
                <tr key={u.id} className="border-b last:border-0" style={{ borderColor: COLORS.border }}>
                  <td className="px-4 py-3 font-medium" style={{ color: COLORS.ink }}>{u.name}</td>
                  <td className="px-4 py-3">{fmtDate(u.joiningDate)}</td>
                  <td className="px-4 py-3">{c.daysCompleted} / {c.requiredDays}</td>
                  <td className="px-4 py-3">{c.attendancePct}%</td>
                  <td className="px-4 py-3"><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
                  <td className="px-4 py-3">
                    {c.status === "Eligible" && <Btn variant="subtle" onClick={() => issue(u)}>Mark issued</Btn>}
                    {c.status === "Completed" && <span className="text-xs" style={{ color: COLORS.slateLight }}>{c.issued?.certId}</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function CertificationDetail({ db, userId }) {
  const c = certProgressFor(db, userId);
  const settings = db.certSettings;
  if (!c) return null;
  if (c.employee) {
    return (
      <div>
        <PageHeader title="My Employment" sub={`Employment period tracked from ${fmtDate(c.joined)}${c.endDate ? ` to ${fmtDate(c.endDate)}` : "."}`} />
        <Card className="p-6 max-w-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-bold" style={{ color: COLORS.ink }}>{c.endDate ? `Day ${c.dayNumber} / ${c.requiredDays}` : "Employment active"}</p>
            <Badge tone={statusTone(c.status)}>{c.status}</Badge>
          </div>
          <ProgressBar pct={c.progressPct} tone="blue" height={10} />
          <p className="text-xs mt-1.5" style={{ color: COLORS.slateLight }}>{c.progressPct}% of the employment period elapsed</p>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="rounded-xl p-3" style={{ background: COLORS.bg }}><p className="text-xs" style={{ color: COLORS.slateLight }}>Days completed</p><p className="text-xl font-bold">{c.daysCompleted}</p></div>
            <div className="rounded-xl p-3" style={{ background: COLORS.bg }}><p className="text-xs" style={{ color: COLORS.slateLight }}>Days remaining</p><p className="text-xl font-bold">{c.daysRemaining}</p></div>
            <div className="rounded-xl p-3" style={{ background: COLORS.bg }}><p className="text-xs" style={{ color: COLORS.slateLight }}>Attendance</p><p className="text-xl font-bold">{c.attendancePct}%</p></div>
          </div>
          {!c.endDate && <p className="mt-5 text-sm" style={{ color: COLORS.slate }}>Your employment is active. Admin can set an end date when your employment term is defined.</p>}
        </Card>
      </div>
    );
  }
  return (
    <div>
      <PageHeader title="My Certification" sub={`Your 90-day certification progress, tracked from ${fmtDate(c.joined)}.`} />
      <Card className="p-6 max-w-2xl">
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold" style={{ color: COLORS.ink }}>Day {c.dayNumber} / {c.requiredDays}</p>
          <Badge tone={statusTone(c.status)}>{c.status}</Badge>
        </div>
        <ProgressBar pct={c.progressPct} tone="amber" height={10} />
        <p className="text-xs mt-1.5" style={{ color: COLORS.slateLight }}>{c.progressPct}% of the program complete</p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-xl p-3" style={{ background: COLORS.bg }}>
            <p className="text-xs" style={{ color: COLORS.slateLight }}>Days remaining</p>
            <p className="text-xl font-bold" style={{ color: COLORS.ink }}>{c.daysRemaining}</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: COLORS.bg }}>
            <p className="text-xs" style={{ color: COLORS.slateLight }}>Attendance</p>
            <p className="text-xl font-bold" style={{ color: c.attendanceOk ? COLORS.emerald : COLORS.ink }}>{c.attendancePct}%</p>
            <p className="text-[11px]" style={{ color: COLORS.slateLight }}>needs {settings.requiredAttendancePct}%+</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: COLORS.bg }}>
            <p className="text-xs" style={{ color: COLORS.slateLight }}>Tasks completed</p>
            <p className="text-xl font-bold" style={{ color: c.tasksOk ? COLORS.emerald : COLORS.ink }}>{c.tasksCompleted} / {c.requiredTasks}</p>
          </div>
        </div>

        {c.status === "Eligible" && (
          <div className="mt-6 rounded-xl p-4 text-center font-semibold" style={{ background: COLORS.emeraldBg, color: "#146B48" }}>
            🎉 Certification Requirements Completed
          </div>
        )}
        {c.status === "Completed" && (
          <div className="mt-6 rounded-xl p-4" style={{ background: COLORS.emeraldBg, color: "#146B48" }}>
            <p className="font-semibold mb-1">🎓 Certificate issued</p>
            <p className="text-xs">Certificate ID: {c.issued?.certId} · Issued {fmtDate(c.issued?.issuedDate)}</p>
          </div>
        )}
        {c.status === "Not Eligible" && (
          <p className="mt-6 text-sm" style={{ color: COLORS.slate }}>
            {!c.periodDone && "Keep going — the 90-day period isn't complete yet. "}
            {!c.attendanceOk && `Attendance needs to reach ${settings.requiredAttendancePct}%. `}
            {!c.tasksOk && `${settings.requiredTasks - c.tasksCompleted} more task(s) to complete.`}
          </p>
        )}
      </Card>
    </div>
  );
}

/* ============================== REPORTS ============================== */

function AdminReports({ db }) {
  const [tab, setTab] = useState("Attendance");
  const nonAdmin = db.users.filter((u) => u.role !== "Admin");

  const exportRows = (rows, filename, header) => {
    const csv = header + "\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  };

  return (
    <div>
      <PageHeader title="Reports" sub="Attendance, task and certification reporting across the organization." />
      <div className="flex gap-1 mb-5 border-b" style={{ borderColor: COLORS.border }}>
        {["Attendance", "Tasks", "Certification"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className="px-3 py-2 text-sm font-medium -mb-px"
            style={{ color: tab === t ? COLORS.ink : COLORS.slateLight, borderBottom: tab === t ? `2px solid ${COLORS.ink}` : "2px solid transparent" }}>{t} Report</button>
        ))}
      </div>

      {tab === "Attendance" && (() => {
        const missingCheckout = db.attendance.filter((a) => a.checkIn && !a.checkOut).length;
        const lateToday = db.attendance.filter((a) => a.date === todayStr() && a.checkIn && new Date(a.checkIn).getHours() >= 10).length;
        return (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <StatCard label="Total records" value={db.attendance.length} icon={Clock} />
              <StatCard label="Working entries" value={db.attendance.filter(a => a.status === "Working").length} icon={CheckCircle2} tone="emerald" />
              <StatCard label="Missing check-outs" value={missingCheckout} icon={AlertTriangle} tone="amber" />
              <StatCard label="Late check-ins today" value={lateToday} icon={Clock3} tone="red" />
            </div>
            <Btn variant="outline" icon={Download} onClick={() => exportRows(
              db.attendance.map(a => [db.users.find(u=>u.id===a.userId)?.name, a.date, fmtTime(a.checkIn), fmtTime(a.checkOut), a.status].join(",")),
              "attendance_report.csv", "User,Date,Check In,Check Out,Status")}>Export Attendance CSV</Btn>
          </div>
        );
      })()}

      {tab === "Tasks" && (() => {
        const total = db.tasks.length || 1;
        const completed = db.tasks.filter(t => t.status === "Approved").length;
        return (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <StatCard label="Logged" value={db.tasks.length} icon={ClipboardList} />
              <StatCard label="Approved" value={completed} tone="emerald" icon={Check} />
              <StatCard label="Pending / In progress" value={db.tasks.filter(t => t.status === "Pending" || t.status === "In Progress").length} tone="amber" icon={Clock3} />
              <StatCard label="Changes requested" value={db.tasks.filter(t => t.status === "Changes Requested").length} tone="red" icon={AlertTriangle} />
            </div>
            <p className="text-sm mb-3" style={{ color: COLORS.slate }}>Completion rate: <b>{clampPct((completed / total) * 100)}%</b></p>
            <Btn variant="outline" icon={Download} onClick={() => exportRows(
              db.tasks.map(t => [db.users.find(u=>u.id===t.internId)?.name, t.title, t.status].join(",")),
              "task_report.csv", "Intern,Task,Status")}>Export Task CSV</Btn>
          </div>
        );
      })()}

      {tab === "Certification" && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <StatCard label="In program" value={nonAdmin.length} icon={Award} />
            <StatCard label="Completed 90 days" value={nonAdmin.filter(u => certProgressFor(db, u.id).periodDone).length} icon={CheckCircle2} tone="emerald" />
            <StatCard label="Eligible" value={nonAdmin.filter(u => certProgressFor(db, u.id).status !== "Not Eligible").length} tone="emerald" icon={Award} />
            <StatCard label="Not yet eligible" value={nonAdmin.filter(u => certProgressFor(db, u.id).status === "Not Eligible").length} tone="red" icon={XCircle} />
          </div>
          <Btn variant="outline" icon={Download} onClick={() => exportRows(
            nonAdmin.map(u => { const c = certProgressFor(db, u.id); return [u.name, c.daysCompleted, c.attendancePct, c.status].join(","); }),
            "internship_completion_report.csv", "User,Days Completed,Attendance %,Status")}>Export Internship Completion CSV</Btn>
        </div>
      )}
    </div>
  );
}

/* ============================== SETTINGS ============================== */

function AdminSettings({ db, update, push }) {
  const [form, setForm] = useState(db.certSettings);
  const save = () => {
    update((d) => { d.certSettings = form; return d; });
    push("Certification requirements updated.");
  };
  return (
    <div>
      <PageHeader title="Settings" sub="Configure the requirements that decide certification eligibility." />
      <Card className="p-5 max-w-md">
        <Field label="Required program length (days)">
          <TextInput type="number" value={form.requiredDays} onChange={(e) => setForm(f => ({ ...f, requiredDays: +e.target.value }))} />
        </Field>
        <Field label="Required attendance percentage">
          <TextInput type="number" value={form.requiredAttendancePct} onChange={(e) => setForm(f => ({ ...f, requiredAttendancePct: +e.target.value }))} />
        </Field>
        <Field label="Required tasks completed">
          <TextInput type="number" value={form.requiredTasks} onChange={(e) => setForm(f => ({ ...f, requiredTasks: +e.target.value }))} />
        </Field>
        <Btn onClick={save}>Save settings</Btn>
      </Card>
    </div>
  );
}

/* ============================== USER: DASHBOARD & ATTENDANCE ============================== */

function CheckInOutCard({ db, update, push, user }) {
  const today = todayStr();
  const record = db.attendance.find((a) => a.userId === user.id && a.date === today);
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);

  const checkIn = () => {
    if (record) { push("You've already checked in today.", "error"); return; }
    update((d) => {
      d.attendance.push({ id: uid("att"), userId: user.id, date: today, checkIn: new Date().toISOString(), checkOut: null, status: "Working" });
      addNotification(d, { userId: user.id, message: `Checked in at ${fmtTime(new Date().toISOString())}`, type: "attendance" });
      return d;
    });
    push("Checked in — have a good day.");
  };
  const checkOut = () => {
    if (!record) { push("Check in before checking out.", "error"); return; }
    if (record.checkOut) { push("You've already checked out today.", "error"); return; }
    update((d) => {
      const a = d.attendance.find((x) => x.id === record.id);
      a.checkOut = new Date().toISOString();
      addNotification(d, { userId: user.id, message: `Checked out at ${fmtTime(a.checkOut)}`, type: "attendance" });
      return d;
    });
    push("Checked out — working hours saved.");
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.slateLight }}>Today's Attendance</p>
          <p className="text-lg font-bold" style={{ color: COLORS.ink }}>{fmtDate(today)}</p>
        </div>
        <p className="text-sm tabular-nums" style={{ color: COLORS.slate }}>{now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
        <div><p className="text-xs" style={{ color: COLORS.slateLight }}>Check in</p><p className="font-semibold">{fmtTime(record?.checkIn)}</p></div>
        <div><p className="text-xs" style={{ color: COLORS.slateLight }}>Check out</p><p className="font-semibold">{fmtTime(record?.checkOut)}</p></div>
        <div><p className="text-xs" style={{ color: COLORS.slateLight }}>Working hours</p><p className="font-semibold">{computeWorkingHours(record?.checkIn, record?.checkOut) || "—"}</p></div>
      </div>
      <div className="flex items-center gap-2">
        <Btn onClick={checkIn} disabled={!!record} className="flex-1 justify-center" icon={Clock}>{record ? "Checked In" : "Check In"}</Btn>
        <Btn onClick={checkOut} disabled={!record || !!record?.checkOut} variant="outline" className="flex-1 justify-center" icon={CheckCircle2}>{record?.checkOut ? "Checked Out" : "Check Out"}</Btn>
      </div>
      {record && <div className="mt-3"><Badge tone={statusTone(record.status)}>{record.status}</Badge></div>}
    </Card>
  );
}

function UserInsights({ db, user }) {
  const my = db.attendance.filter((a) => a.userId === user.id);
  const daysWorked = my.filter((a) => a.status === "Working").length;
  const presentDates = new Set(my.filter((a) => a.status === "Working").map((a) => a.date));
  const streak = computeStreak(presentDates);

  const last14 = [...Array(14)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (13 - i));
    const ds = d.toISOString().slice(0, 10);
    const rec = my.find((a) => a.date === ds);
    const hours = rec ? computeWorkingHoursDecimal(rec.checkIn, rec.checkOut) : 0;
    return { day: d.toLocaleDateString("en-US", { day: "2-digit", month: "short" }), Hours: Math.round(hours * 10) / 10 };
  });

  return (
    <div>
      <PageHeader title="My Insights" sub="Your attendance record at a glance." />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <StatCard label="Days worked" value={daysWorked} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Current streak" value={`${streak} day${streak !== 1 ? "s" : ""}`} icon={Flame} tone="amber" />
        <StatCard label="Total records" value={my.length} icon={Clock} tone="ink" />
      </div>
      <Card className="p-4">
        <p className="text-sm font-semibold mb-3" style={{ color: COLORS.ink }}>Hours worked — last 14 days</p>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last14}>
              <CartesianGrid stroke={COLORS.border} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: COLORS.slate }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: COLORS.slate }} axisLine={false} tickLine={false} unit="h" />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.border}`, fontSize: 12 }} />
              <Bar dataKey="Hours" fill={COLORS.blue} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function UserDashboard({ db, update, push, user }) {
  const cert = certProgressFor(db, user.id);
  const myTasks = db.tasks.filter((t) => t.internId === user.id);
  const myProjects = db.projects.filter((p) => (p.internIds || []).includes(user.id));
  const recent = db.notifications.filter((n) => n.userId === user.id).slice(0, 6);

  return (
    <div>
      <PageHeader title={`Welcome, ${user.name.split(" ")[0]}`} sub="Here's your day at a glance." />
      <div className="grid lg:grid-cols-3 gap-4">
        <CheckInOutCard db={db} update={update} push={push} user={user} />
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: COLORS.slateLight }}>{isEmployee(user) ? "Employment Progress" : "Internship Progress"}</p>
          <p className="text-lg font-bold mb-1" style={{ color: COLORS.ink }}>{isEmployee(user) && !cert.endDate ? "Employment active" : `Day ${cert.dayNumber} / ${cert.requiredDays}`}</p>
          <ProgressBar pct={cert.progressPct} tone="amber" />
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div><p className="text-xs" style={{ color: COLORS.slateLight }}>Days remaining</p><p className="font-semibold">{cert.daysRemaining}</p></div>
            <div><p className="text-xs" style={{ color: COLORS.slateLight }}>Attendance</p><p className="font-semibold">{cert.attendancePct}%</p></div>
          </div>
          <div className="mt-3"><Badge tone={statusTone(cert.status)}>{cert.status}</Badge></div>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: COLORS.slateLight }}>Tasks</p>
          <div className="space-y-2 text-sm mb-4">
            {["Pending", "In Progress", "Submitted", "Approved"].map((s) => (
              <div key={s} className="flex items-center justify-between">
                <span style={{ color: COLORS.slate }}>{s}</span>
                <span className="font-semibold">{myTasks.filter((t) => t.status === s).length}</span>
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: COLORS.slateLight }}>Assigned project{myProjects.length !== 1 ? "s" : ""}</p>
          <p className="text-sm" style={{ color: COLORS.ink }}>{myProjects.length ? myProjects.map((p) => p.name).join(", ") : "None yet"}</p>
        </Card>
      </div>

      <Card className="p-5 mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: COLORS.slateLight }}>Recent Activity</p>
        <div className="space-y-3">
          {recent.map((n) => (
            <div key={n.id} className="flex items-start gap-2.5 text-sm">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: COLORS.amber }} />
              <div>
                <p style={{ color: COLORS.ink }}>{n.message}</p>
                <p className="text-xs" style={{ color: COLORS.slateLight }}>{new Date(n.date).toLocaleString()}</p>
              </div>
            </div>
          ))}
          {!recent.length && <EmptyState title="No recent activity yet" icon={Bell} />}
        </div>
      </Card>
    </div>
  );
}

function CorrectionRequestModal({ record, onClose, onSave }) {
  const [requestedStatus, setRequestedStatus] = useState(record.status);
  const [reason, setReason] = useState("");
  return (
    <Modal title={`Request Correction — ${fmtDate(record.date)}`} onClose={onClose}>
      <Field label="Correct status should be">
        <Select value={requestedStatus} onChange={(e) => setRequestedStatus(e.target.value)}>
          <option>Working</option><option>Inactive</option><option>Half-day</option><option>Leave</option>
        </Select>
      </Field>
      <Field label="Reason"><TextArea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why does this record need to change?" /></Field>
      <div className="flex justify-end gap-2 mt-2">
        <Btn variant="outline" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!reason} onClick={() => onSave({ requestedStatus, reason })}>Submit request</Btn>
      </div>
    </Modal>
  );
}

function UserAttendance({ db, update, push, user }) {
  const [correctingFor, setCorrectingFor] = useState(null);
  const rows = db.attendance.filter((a) => a.userId === user.id).sort((a, b) => b.date.localeCompare(a.date));
  const pendingCorrectionDates = new Set((db.attendanceCorrections || []).filter((c) => c.userId === user.id && c.status === "Pending").map((c) => c.attendanceId));

  const submitCorrection = ({ requestedStatus, reason }) => {
    update((d) => {
      d.attendanceCorrections = d.attendanceCorrections || [];
      d.attendanceCorrections.push({ id: uid("corr"), userId: user.id, attendanceId: correctingFor.id, date: correctingFor.date, requestedStatus, reason, status: "Pending" });
      d.users.filter((u) => u.role === "Admin").forEach((admin) => addNotification(d, { userId: admin.id, message: `${user.name} requested an attendance correction for ${fmtDate(correctingFor.date)}.`, type: "attendance" }));
      return d;
    });
    push("Correction request submitted for Admin review.");
    setCorrectingFor(null);
  };

  return (
    <div>
      <PageHeader title="My Attendance" sub="Your full check-in and check-out history. Records can only be changed via a correction request." />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b" style={{ borderColor: COLORS.border }}>{["Date", "Check In", "Check Out", "Working Hours", "Status", ""].map(h => <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase" style={{ color: COLORS.slateLight }}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0" style={{ borderColor: COLORS.border }}>
              <td className="px-4 py-3">{fmtDate(r.date)}</td>
              <td className="px-4 py-3">{fmtTime(r.checkIn)}</td>
              <td className="px-4 py-3">{fmtTime(r.checkOut)}</td>
              <td className="px-4 py-3">{computeWorkingHours(r.checkIn, r.checkOut) || "—"}</td>
              <td className="px-4 py-3"><Badge tone={statusTone(r.status)}>{r.status}</Badge></td>
              <td className="px-4 py-3">
                {pendingCorrectionDates.has(r.id) ? (
                  <span className="text-xs" style={{ color: COLORS.slateLight }}>Correction pending</span>
                ) : (
                  <button onClick={() => setCorrectingFor(r)} className="text-xs font-medium" style={{ color: COLORS.blue }}>Request correction</button>
                )}
              </td>
            </tr>
          ))}</tbody>
        </table>
        {!rows.length && <EmptyState title="No attendance recorded yet" sub="Check in from your dashboard to get started." icon={Clock} />}
      </Card>
      {correctingFor && <CorrectionRequestModal record={correctingFor} onClose={() => setCorrectingFor(null)} onSave={submitCorrection} />}
    </div>
  );
}

/* ============================== USER: TASKS ============================== */

function UserTasks({ db, update, push, user }) {
  const [showForm, setShowForm] = useState(false);
  const myTasks = db.tasks.filter((t) => t.internId === user.id).sort((a, b) => b.date.localeCompare(a.date));

  const createTask = (form) => {
    update((d) => {
      d.tasks.push({ id: uid("task"), internId: user.id, ...form, status: "Pending", adminFeedback: "", createdDate: todayStr() });
      return d;
    });
    push("Task logged.");
    setShowForm(false);
  };

  const start = (t) => {
    update((d) => { d.tasks.find((x) => x.id === t.id).status = "In Progress"; return d; });
    push("Task started.");
  };

  const submitForReview = (t) => {
    update((d) => {
      d.tasks.find((x) => x.id === t.id).status = "Submitted";
      d.users.filter((u) => u.role === "Admin").forEach((admin) => addNotification(d, { userId: admin.id, message: `${user.name} submitted "${t.title}" for review.`, type: "task" }));
      return d;
    });
    push("Submitted for review.");
  };

  return (
    <div>
      <PageHeader title="My Tasks" sub="Log your daily work and submit it for Admin review." right={<Btn icon={Plus} onClick={() => setShowForm(true)}>Log Task</Btn>} />
      <div className="grid gap-3">
        {myTasks.map((t) => {
          const p = db.projects.find((x) => x.id === t.projectId);
          return (
            <Card key={t.id} className="p-4">
              <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>{t.title}</p>
                    <Badge tone={t.priority === "High" ? "red" : t.priority === "Medium" ? "amber" : "slate"}>{t.priority}</Badge>
                  </div>
                  <p className="text-xs" style={{ color: COLORS.slateLight }}>{fmtDate(t.date)}{p ? ` · ${p.name}` : ""}</p>
                </div>
                <Badge tone={statusTone(t.status)}>{t.status}</Badge>
              </div>
              {t.description && <p className="text-sm mb-1" style={{ color: COLORS.slate }}>{t.description}</p>}
              {t.repoLink && <p className="text-xs mb-1" style={{ color: COLORS.blue }}>{t.repoLink}</p>}
              {t.attachmentName && <p className="text-xs mb-2 flex items-center gap-1" style={{ color: COLORS.slateLight }}><FolderUp size={12} />{t.attachmentName}</p>}
              {t.adminFeedback && <p className="text-xs mb-2 italic" style={{ color: COLORS.red }}>Admin feedback: {t.adminFeedback}</p>}
              <div className="flex gap-2">
                {t.status === "Pending" && <Btn variant="subtle" onClick={() => start(t)}>Start Task</Btn>}
                {(t.status === "In Progress" || t.status === "Changes Requested") && <Btn variant="outline" icon={Upload} onClick={() => submitForReview(t)}>Submit for Review</Btn>}
                {t.status === "Submitted" && <span className="text-xs px-2 py-1.5" style={{ color: COLORS.slateLight }}>Waiting on Admin review…</span>}
                {t.status === "Approved" && <span className="text-xs px-2 py-1.5 flex items-center gap-1" style={{ color: COLORS.emerald }}><CheckCircle2 size={13} />Approved</span>}
              </div>
            </Card>
          );
        })}
        {!myTasks.length && <EmptyState title="No tasks logged yet" sub="Log your first task to start tracking your work." icon={ClipboardList} />}
      </div>
      {showForm && <TaskFormModal db={db} user={user} onClose={() => setShowForm(false)} onSave={createTask} />}
    </div>
  );
}

function UserNotifications({ db, update, user }) {
  const mine = db.notifications.filter((n) => n.userId === user.id);
  useEffect(() => {
    if (mine.some((n) => !n.read)) {
      update((d) => { d.notifications.filter((n) => n.userId === user.id).forEach((n) => (n.read = true)); return d; });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <PageHeader title="Notifications" sub="Task assignments, review outcomes, and certification updates." />
      <div className="grid gap-2">
        {mine.map((n) => (
          <Card key={n.id} className="p-3.5 flex items-start gap-3">
            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: COLORS.amber }} />
            <div><p className="text-sm" style={{ color: COLORS.ink }}>{n.message}</p><p className="text-xs" style={{ color: COLORS.slateLight }}>{new Date(n.date).toLocaleString()}</p></div>
          </Card>
        ))}
        {!mine.length && <EmptyState title="You're all caught up" icon={Bell} />}
      </div>
    </div>
  );
}

/* ============================== ROOT APP ============================== */

const SESSION_KEY = "skillarion_session_uid";

export default function App() {
  const { db, loading, error, update } = useDb();
  const { toasts, push } = useToasts();
  const [session, setSessionState] = useState(null);
  const [active, setActive] = useState("dashboard");
  const [triedRestore, setTriedRestore] = useState(false);

  // Restore the logged-in session after a page refresh, once the DB is ready.
  // (Calling setState during render like this, guarded so it only runs once,
  // re-renders before anything is painted — no login-screen flash.)
  if (db && !triedRestore) {
    setTriedRestore(true);
    let savedId = null;
    try { savedId = localStorage.getItem(SESSION_KEY); } catch (e) {}
    if (savedId) {
      const savedUser = db.users.find((u) => u.id === savedId);
      if (savedUser) setSessionState(savedUser);
    }
  }

  if (loading || !db || (!session && !triedRestore)) {
    return (
      <div className="min-h-full w-full flex items-center justify-center" style={{ background: COLORS.bg }}>
        <p className="text-sm" style={{ color: COLORS.slate }}>Loading portal…</p>
      </div>
    );
  }

  const login = (u) => {
    setSessionState(u);
    try { localStorage.setItem(SESSION_KEY, u.id); } catch (e) {}
    setActive("dashboard");
  };

  if (!session) {
    return <LoginScreen db={db} onLogin={login} />;
  }

  // keep session in sync with latest db (e.g. after edits)
  const user = db.users.find((u) => u.id === session.id) || session;
  const nav = user.role === "Admin"
    ? ADMIN_NAV
    : USER_NAV.filter((n) => n.id !== "bd" || user.bdAccess).map((n) =>
        n.id === "certifications" ? { ...n, label: isEmployee(user) ? "My Employment" : "My Progress" } : n
      );
  const unread = db.notifications.filter((n) => n.userId === user.id && !n.read).length;
  const unreadAnnouncements = db.notifications.filter((n) => n.userId === user.id && n.type === "announcement" && !n.read).length;

  const logout = () => {
    setSessionState(null);
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
    setActive("dashboard");
  };

  let content;
  if (user.role === "Admin") {
    content = {
      dashboard: <AdminDashboard db={db} />,
      insights: <AdminInsights db={db} />,
      users: <AdminUsers db={db} update={update} push={push} personType="Interns" />,
      employees: <AdminUsers db={db} update={update} push={push} personType="Employees" />,
      attendance: <AdminAttendance db={db} update={update} push={push} />,
      worklog: <DailyWorkLog db={db} update={update} push={push} user={user} canManage />,
      tasks: <AdminTasks db={db} update={update} push={push} />,
      projects: <AdminProjects db={db} update={update} push={push} />,
      leave: <AdminLeave db={db} update={update} push={push} />,
      announcements: <AdminAnnouncements db={db} update={update} push={push} />,
      bd: <BusinessDevelopment db={db} update={update} push={push} user={user} canManage />,
      certifications: <AdminCertifications db={db} update={update} push={push} />,
      reports: <AdminReports db={db} />,
      auditlog: <AdminAuditLog db={db} />,
      settings: <AdminSettings db={db} update={update} push={push} />,
    }[active];
  } else {
    content = {
      dashboard: <UserDashboard db={db} update={update} push={push} user={user} />,
      insights: <UserInsights db={db} user={user} />,
      attendance: <UserAttendance db={db} update={update} push={push} user={user} />,
      worklog: <DailyWorkLog db={db} update={update} push={push} user={user} canManage={false} />,
      tasks: <UserTasks db={db} update={update} push={push} user={user} />,
      projects: <UserProjects db={db} user={user} />,
      leave: <UserLeave db={db} update={update} push={push} user={user} />,
      announcements: <UserAnnouncements db={db} update={update} user={user} />,
      bd: user.bdAccess ? <BusinessDevelopment db={db} update={update} push={push} user={user} canManage={false} /> : <UserDashboard db={db} update={update} push={push} user={user} />,
      certifications: <CertificationDetail db={db} userId={user.id} />,
      notifications: <UserNotifications db={db} update={update} user={user} />,
    }[active];
  }

  return (
    <div className="h-full w-full flex" style={{ background: COLORS.bg, fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Sidebar nav={nav} active={active} setActive={setActive} user={user} onLogout={logout} unread={unread} unreadAnnouncements={unreadAnnouncements} />
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {error && <div className="mb-4 text-sm px-3 py-2 rounded-lg" style={{ background: COLORS.redBg, color: COLORS.red }}>{error}</div>}
        {content}
      </div>
      <Toast toasts={toasts} />
    </div>
  );
}
