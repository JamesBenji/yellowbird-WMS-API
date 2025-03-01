export interface DB<T> {
    save(path: string, data: T): Promise<string>;
    findById(path: string): Promise<T | null>;
    update(path: string, partialData: Partial<T>): Promise<void>;
    delete(path: string): Promise<void>;
  }