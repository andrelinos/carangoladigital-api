declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NOD_ENV: 'development' | 'production';
      HOST: string;
      HOST_PORT: string;
      MONGODB_URL_LOCAL: string;
      LOCAL_PORT: string;
      MONGODB_URL: string;
      REMOTE_PORT: string;
    }
  }
}

export {};
