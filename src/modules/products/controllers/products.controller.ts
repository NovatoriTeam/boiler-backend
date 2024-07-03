import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { CrudController } from '../../crud/controllers/crud.controller';
import { CrudFilter } from '../../crud/decorators/crud-filter.decorator';
import { RequestInterface } from '../../crud/types/interfaces/request.interface';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsModel } from '../models/products.model';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController extends CrudController<Product, ProductsModel> {
  constructor(private productService: ProductsService) {
    super(productService);
  }

  @CrudFilter({
    name: ['sortable'],
    shop: ['sortable', 'searchable', 'exact'],
    price: ['sortable', 'searchable'],
    user: ['relatable'],
  })
  @ApiResponse({ isArray: true, type: Product })
  @Public()
  @Get()
  async findAllController(
    @Req() req: RequestInterface,
  ): Promise<[ProductsModel[], number]> {
    return await super.findAll(req);
  }

  @Public()
  @Post()
  async createController(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductsModel> {
    return await super.create(createProductDto);
  }

  @Get(':id')
  async findOneController(@Param('id') id: string): Promise<ProductsModel> {
    return await super.findOne(id);
  }

  @Put(':id')
  async updateController(
    @Param('id') id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductsModel> {
    return await super.update(id, updateProductDto);
  }

  @Delete(':id')
  async removeController(@Param() id: string): Promise<ProductsModel> {
    return await super.remove(id);
  }
}
