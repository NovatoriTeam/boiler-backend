import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { compilerConfig } from '../config/config';

interface CompilerRequestBody {
  language: string;
  stdin: string;
  files: [{ name: string; content: string }];
}

@Injectable()
export class CompilerService {
  async compileCode(code: string): Promise<AxiosResponse> {
    const { url, apiHost, apiKey } = compilerConfig;
    const requestBody: CompilerRequestBody = {
      language: 'nodejs',
      stdin: 'Peter',
      files: [
        {
          name: 'script.js',
          content: code,
        },
      ],
    };
    const response: AxiosResponse = await axios.post(url, requestBody, {
      headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': apiHost },
    });

    return response;
  }
}
