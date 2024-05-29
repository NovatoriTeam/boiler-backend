import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private productsRepository: ProductsRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const productId = request.body.id;
    const product = await this.productsRepository.findOne(productId);

    if (product.userId !== 1) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
