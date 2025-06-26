declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        npm_config_API_KEY: string;
        npm_config_DATASET_ID: string;
        npm_config_SERVER_URL?: string;
      }
    }
  }
  
export {}