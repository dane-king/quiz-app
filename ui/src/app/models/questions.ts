export interface Question {
    id?: number;
    question: string;
    answer: string;
    category?:string[];
    hint?: string;
  }
  