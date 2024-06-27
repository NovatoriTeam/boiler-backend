import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { BaseController } from '../../base/controllers/base.controller';
import { CrudFilter } from '../../base/decorators/crud-filter.decorator';
import { RequestInterface } from '../../base/types/interfaces/request.interface';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController extends BaseController<Product> {
  constructor(private productService: ProductsService) {
    super(productService);
  }

  @CrudFilter(
    {
      name: ['sortable'],
      shop: ['sortable', 'searchable', 'exact'],
      price: ['sortable', 'searchable'],
      user: ['relatable'],
    },
    'product',
  )
  @ApiResponse({ isArray: true, type: Product })
  @Public()
  @Get()
  async findAll(@Req() req: RequestInterface): Promise<[Product[], number]> {
    return await super.findAll(req);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await super.create(createProductDto);
  }
}
