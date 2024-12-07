const un = "jwang268"; //Define user name as string
const pw = "wangjunjia1994"; //Define your password here as string

const credentials = {
  mongo: {
    connectionString: `mongodb+srv://${un}:${pw}@fullstackwebdev.rrx2t.mongodb.net/?retryWrites=true&w=majority&appName=fullstackwebdev`,
  },
};

export const mongo = credentials.mongo;
