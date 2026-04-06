export interface Horse {
  id: string;
  barnName: string;
  registeredName?: string;
  color: string;
  avatar?: string;
  personalRecord: number;
  totalRuns: number;
  averageTime: number;
  cleanRuns: number;
}

export interface Arena {
  id: string;
  name: string;
  city: string;
  state: string;
  recordTime?: number;
  runCount: number;
}

export interface Run {
  id: string;
  horseId: string;
  arenaId: string;
  time: number;
  isClean: boolean;
  barrelCount?: number;
  date: string;
  payout?: number;
  photos?: string[];
  videos?: string[];
}

export const horses: Horse[] = [
  {
    id: "1",
    barnName: "Blaze",
    registeredName: "Dash Ta Fame",
    color: "#F59E0B",
    personalRecord: 14.892,
    totalRuns: 24,
    averageTime: 15.1,
    cleanRuns: 18,
  },
  {
    id: "2",
    barnName: "Shadow",
    registeredName: "Six Moon Firewater",
    color: "#8B5CF6",
    personalRecord: 15.234,
    totalRuns: 19,
    averageTime: 15.6,
    cleanRuns: 14,
  },
  {
    id: "3",
    barnName: "Rocket",
    registeredName: "First Down French",
    color: "#0D9488",
    personalRecord: 14.567,
    totalRuns: 31,
    averageTime: 14.9,
    cleanRuns: 25,
  },
  {
    id: "4",
    barnName: "Luna",
    registeredName: "Frenchmans Fabulous",
    color: "#EC4899",
    personalRecord: 15.678,
    totalRuns: 16,
    averageTime: 16.2,
    cleanRuns: 11,
  },
];

export const arenas: Arena[] = [
  {
    id: "1",
    name: "Silver Spurs Arena",
    city: "Austin",
    state: "TX",
    recordTime: 14.892,
    runCount: 8,
  },
  {
    id: "2",
    name: "Cowtown Coliseum",
    city: "Fort Worth",
    state: "TX",
    recordTime: 15.234,
    runCount: 12,
  },
  {
    id: "3",
    name: "Lazy E Arena",
    city: "Guthrie",
    state: "OK",
    recordTime: 14.567,
    runCount: 15,
  },
  {
    id: "4",
    name: "Reno Livestock Events Center",
    city: "Reno",
    state: "NV",
    recordTime: 15.456,
    runCount: 6,
  },
  {
    id: "5",
    name: "Houston Rodeo Arena",
    city: "Houston",
    state: "TX",
    recordTime: 15.123,
    runCount: 9,
  },
];

export const runs: Run[] = [
  {
    id: "1",
    horseId: "1",
    arenaId: "1",
    time: 14.892,
    isClean: true,
    date: "2026-03-10",
    payout: 2500,
    photos: [
      "https://images.unsplash.com/photo-1760041870271-496f3d0d46ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMGJhcnJlbCUyMHJhY2luZyUyMGFjdGlvbnxlbnwxfHx8fDE3NzM0MzUxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1584403782333-c5281ab1f9cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2RlbyUyMGFyZW5hJTIwYmFycmVsJTIwcmFjaW5nfGVufDF8fHx8MTc3MzQzNTEzOXww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    videos: ["https://www.w3schools.com/html/mov_bbb.mp4"]
  },
  {
    id: "2",
    horseId: "2",
    arenaId: "1",
    time: 15.234,
    isClean: false,
    barrelCount: 1,
    date: "2026-03-10",
    payout: 0,
  },
  {
    id: "3",
    horseId: "3",
    arenaId: "2",
    time: 14.567,
    isClean: true,
    date: "2026-03-08",
    payout: 3200,
    photos: [
      "https://images.unsplash.com/photo-1760041870516-5ed95b64d589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dnaXJsJTIwaG9yc2UlMjByYWNpbmd8ZW58MXx8fHwxNzczNDM1MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: "4",
    horseId: "1",
    arenaId: "2",
    time: 15.456,
    isClean: true,
    date: "2026-03-07",
    payout: 1800,
  },
  {
    id: "5",
    horseId: "4",
    arenaId: "3",
    time: 15.678,
    isClean: false,
    barrelCount: 2,
    date: "2026-03-06",
    payout: 0,
  },
  {
    id: "6",
    horseId: "3",
    arenaId: "3",
    time: 14.789,
    isClean: true,
    date: "2026-03-05",
    payout: 4500,
  },
  {
    id: "7",
    horseId: "2",
    arenaId: "4",
    time: 15.901,
    isClean: true,
    date: "2026-03-04",
    payout: 1200,
  },
  {
    id: "8",
    horseId: "1",
    arenaId: "4",
    time: 15.123,
    isClean: false,
    barrelCount: 1,
    date: "2026-03-03",
    payout: 0,
  },
];

export function getHorseById(id: string): Horse | undefined {
  return horses.find((h) => h.id === id);
}

export function getArenaById(id: string): Arena | undefined {
  return arenas.find((a) => a.id === id);
}

export function getRunsByHorse(horseId: string): Run[] {
  return runs.filter((r) => r.horseId === horseId);
}

export function getRunsByArena(arenaId: string): Run[] {
  return runs.filter((r) => r.arenaId === arenaId);
}