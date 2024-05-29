import { Controller } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { BaseController } from '../base/base.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController extends BaseController<
  Product,
  ProductsService,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(private productService: ProductsService) {
    super(productService);
  }
}
