import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { CrudController } from '../../crud/controllers/crud.controller';
import { CrudFilter } from '../../crud/decorators/crud-filter.decorator';
import { RequestInterface } from '../../crud/types/interfaces/request.interface';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsModel } from '../models/products.model';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController extends CrudController<Product, ProductsModel> {
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
  async findAll(
    @Req() req: RequestInterface,
  ): Promise<[ProductsModel[], number]> {
    return await super.findAll(req);
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductsModel> {
    return await super.create(createProductDto);
  }
}
