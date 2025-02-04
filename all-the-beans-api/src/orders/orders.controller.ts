import { Controller, Post, Body } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Post()
  createOrder(@Body() orderData: any) {

    // This section would handle connecting to an SMTP server or relay to send a confirmation email 
    // to the customer and notify the order fulfilment team.


    return { message: 'Order received successfully!' };
  }
}
