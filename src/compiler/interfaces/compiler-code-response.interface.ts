export interface CompilerCodeResponseInterface {
  status: string;
  exception: string;
  stdout: string;
  executionTime: number;
  limitRemaining: number;
  stdin: string;
}
