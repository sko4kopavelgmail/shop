import { CustomerDto } from './customerDto';
import { ProductDto } from './productDto';

export class OrderDto {
    product: ProductDto;
    customer: CustomerDto;

    constructor(product: ProductDto, customer: CustomerDto) {
        this.customer = customer;
        this.product = product
    }
}