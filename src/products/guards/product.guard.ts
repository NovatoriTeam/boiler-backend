import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private productsRepository: ProductsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: { body: { id } } = context.switchToHttp().getRequest();
    const productId: number = request.body.id;
    const product: Product = await this.productsRepository.findOne(productId);

    if (product.userId !== 1) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
