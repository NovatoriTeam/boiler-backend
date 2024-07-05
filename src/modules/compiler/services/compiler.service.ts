import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { compilerConfig } from '../../../config/config';
import { CompilerCodeParamsInterface } from '../types/interfaces/compiler-code-params.interface';
import { CompilerCodeResponseInterface } from '../types/interfaces/compiler-code-response.interface';
import { CompilerCodeInterface } from '../types/interfaces/compiler-code.interface';
import { CompilerRequestBodyInterface } from '../types/interfaces/compiler-request-body.interface';

@Injectable()
export class CompilerService {
  async compileCode(
    data: CompilerCodeParamsInterface,
  ): Promise<CompilerCodeInterface> {
    const { url, apiHost, apiKey } = compilerConfig;
    const requestBody: CompilerRequestBodyInterface = this.getRequestBody(data);
    const response: { data: CompilerCodeResponseInterface } = await axios.post(
      url,
      requestBody,
      {
        headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': apiHost },
      },
    );

    const returnable = {
      output: JSON.parse(JSON.stringify(response.data.stdout)),
      error: response.data.exception,
    };

    return returnable;
  }

  private getRequestBody(
    data: CompilerCodeParamsInterface,
  ): CompilerRequestBodyInterface {
    const { language, fileName, extension, code } = data;
    const requestBody: CompilerRequestBodyInterface = {
      language,
      stdin: 'Peter',
      files: [
        {
          name: `${fileName}.${extension}`,
          content: code,
        },
      ],
    };

    return requestBody;
  }
}
