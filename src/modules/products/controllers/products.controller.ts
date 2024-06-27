import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BaseController } from '../../base/controllers/base.controller';
import { FilterInterceptor } from '../../base/interceptors/filter.interceptor';
import { RequestInterface } from '../../base/types/interfaces/request.interface';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

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

  @UseInterceptors(
    new FilterInterceptor(
      {
        shop: ['sortable', 'searchable', 'exact'],
        price: ['sortable', 'searchable'],
        user: ['relatable'],
      },
      'product',
    ),
  )
  @ApiResponse({ isArray: true, type: Product })
  @Get()
  async findAll(@Req() req: RequestInterface): Promise<[Product[], number]> {
    return await super.findAll(req);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await super.create(createProductDto);
  }
}
