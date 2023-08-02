const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://192.168.0.109:3000",
  "http://192.168.50.39:3000",
  "http://192.168.1.65:3000",
  "http://192.168.1.65:3001",
  "http://172.20.10.2:3001/",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
