// globals.d.ts
declare module NodeJS {
    interface Module {
      hot?: {
        accept: () => void;
        dispose: (callback: () => void) => void;
      };
    }
  }